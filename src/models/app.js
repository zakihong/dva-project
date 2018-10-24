export default {
  namespace: 'app',
  state: {
    login: false
  },
  subscriptions: {},
  effects: {},
  reducers: {
    loginSuccess(state, action) {
      return { ...state, ...action.payload, login: true };
    }
  }
};
