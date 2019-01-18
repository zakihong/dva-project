import { routerRedux } from 'dva/router';
import { isLogin, getSen, setSen } from 'utils';
import { message } from 'antd';
import { login } from 'services/login';
export default {
  namespace: 'app',
  state: {
    login: false,
    Navs: [{ title: '首页', path: '/home', key: 'home' }, { title: '问答', path: '/qa', key: 'qa' }, { title: '专栏', path: '/column', key: 'column' }, { title: '软件下载', path: '/download', key: 'download' }, { title: '趣事杂文', path: '/article', key: 'article' }, { title: '关于知否', path: '/about', key: 'about' }],
    currentNav: {
      key: 'home'
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/login' || pathname === '/register') {
          return;
        }
        let paths = pathname.split('/').filter(e => {
          return e !== '';
        });
        let lastPath = paths.filter((e, i) => {
          return i === paths.length - 1;
        });
        if (paths.length) {
          paths.pop();
        }
        dispatch({
          type: 'switchNav',
          payload: {
            key: lastPath[0]
          }
        });
        dispatch({ type: 'loggedIn' });
      });
    }
  },
  effects: {
    *loggedIn({ payload }, { put, select }) {
      const token = getSen('user_token');
      if (!token) {
        yield put(routerRedux.push({ pathname: '/login' }));
      }

      yield put({
        type: 'loginSuccess',
        payload: { user: { name: getSen('username'), id: getSen('userId') } }
      });
    },
    *submit({ payload }, { call, put }) {
      const params = { username: payload.username, password: payload.password };
      const data = yield call(login, params);
      if (data.errorMsg) {
        message.error(data.errorMsg);
      } else {
        setSen('user_token', data.token);
        yield put({
          type: 'loginSuccess',
          payload: { user: { name: data.nikename, id: data.id } }
        });
        yield put(routerRedux.push('/home'));
      }
    }
  },
  reducers: {
    loginSuccess(state, action) {
      return { ...state, ...action.payload, login: true };
    },
    switchNav(state, action) {
      return {
        ...state,
        currentNav: action.payload
      };
    }
  }
};
