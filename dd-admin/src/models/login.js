import { routerRedux } from 'dva/router';
import { setSen, isLogin } from 'utils';
import { login } from 'services/login';
export default {
  namespace: 'login',
  state: {
    login: !!isLogin(),
    user: {
      name: ''
    }
  },
  subscriptions: {},
  effects: {
    *submit({ payload }, { call, put, select }) {
      const params = { username: payload.username, password: payload.password };
      const data = yield call(login, params);
      if (data) {
        setSen('user_token', data.token);
        setSen('user', { username: data.nikename });
        yield put(routerRedux.push('/dashboard'));
      }
    }
  },
  reducers: {}
};
