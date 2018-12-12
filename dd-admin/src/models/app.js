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
            path: 'category',
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
      defaultSelectedKeys: ['category'],
      selectedKey: ['category'],
      defaultOpenKeys: ['article']
    }
  },
  subscriptions: {},
  effects: {},
  reducers: {
    switchMenuPopver(state, action) {
      console.log(111111);
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
