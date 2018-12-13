import { routerRedux } from 'dva/router';
import { getSen } from 'utils';
export default {
  namespace: 'app',
  state: {
    loggedIn: false,
    user: {
      name: 'User',
      email: '',
      uid: ''
    },
    loginLoading: false,
    menus: [
      {
        title: '管理平台',
        path: 'dashboard',
        key: 'dashboard',
        icon: 'home'
      },
      {
        title: '文章管理',
        path: 'article',
        key: 'article',
        icon: 'book',
        children: [
          {
            title: '类别管理',
            path: 'article/category',
            key: 'category',
            icon: 'switcher'
          }
        ]
      },
      {
        title: '用户管理',
        path: 'user',
        key: 'user',
        icon: 'user'
      },
      {
        title: '日志管理',
        path: 'logs',
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
      const token = getSen('token');
      if (!token) {
        yield put(routerRedux.push({ pathname: '/login' }));
      }

      yield put({
        type: 'loginSuccess',
        payload: { user: { name: getSen('username'), uid: getSen('uid'), email: getSen('email') } }
      });
    }
  },
  reducers: {
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
