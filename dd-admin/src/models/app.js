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
        path: '',
        key: 'article',
        icon: 'switcher',
        children: [
          {
            title: '文章列表',
            path: '/article/list',
            key: 'list',
            icon: 'book'
          },
          {
            title: '类别管理',
            path: '/article/category',
            key: 'category',
            icon: 'heart'
          }
        ]
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
          type: 'initCurrentMenu',
          payload: {
            defaultSelectedKeys: lastPath,
            selectedKey: lastPath,
            defaultOpenKeys: paths
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
    initCurrentMenu(state, action) {
      return {
        ...state,
        currentMenu: action.payload
      };
    },
    handleNavOpenKeys(state) {
      console.log(state);
    }
  }
};
