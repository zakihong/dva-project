import { routerRedux } from 'dva/router';
import { isLogin, getSen, setSen } from 'utils';
import { message } from 'antd';
import { login } from 'services/login';
export default {
  namespace: 'app',
  state: {
    login: !!isLogin(),
    user: {
      name: '',
      id: ''
    },
    loginLoading: false,
    menus: [
      {
        title: '管理平台',
        path: '/dashboard',
        key: 'dashboard',
        icon: 'home'
      },
      {
        title: '文章管理',
        path: '/article',
        key: 'article',
        icon: 'book'
      },
      {
        title: '用户管理',
        path: '/user',
        key: 'user',
        icon: 'user'
      },
      {
        title: '日志管理',
        path: '/logs',
        key: 'logs',
        icon: 'read'
      }
    ],
    currentMenu: {
      defaultSelectedKeys: ['dashboard'],
      selectedKey: ['dashboard'],
      defaultOpenKeys: []
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/login' || pathname === '/logout') {
          return;
        }
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
    *submit({ payload }, { call, put, select }) {
      const params = { username: payload.username, password: payload.password };
      const data = yield call(login, params);
      if (data.errorMsg) {
        message.error(data.errorMsg);
      } else {
        setSen('user_token', data.token);
        setSen('username', data.nikename);
        setSen('userId', data.id);
        yield put({
          type: 'loginSuccess',
          payload: { user: { name: data.nikename, id: data.id } }
        });
        yield put(routerRedux.push('/dashboard'));
      }
    }
  },
  reducers: {
    loginSuccess(state, action) {
      return { ...state, ...action.payload, login: true };
    },
    switchMenuPopver(state, action) {
      const currentMenu = {
        ...state.currentMenu,
        ...action.payload
      };
      return {
        ...state,
        currentMenu: currentMenu
      };
    },
    handleNavOpenKeys(state) {
      console.log(state);
    }
  }
};
