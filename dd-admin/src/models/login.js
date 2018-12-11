import { routerRedux } from 'dva/router';
import { isLogin } from 'utils';
import Cookie from 'utils/cookie';
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
        console.log(1);
        Cookie.set('user_token', data.token);
        Cookie.set('user', { username: data.nikename });
        yield put(routerRedux.push('/home'));
      }
    }
  },
  reducers: {}
};
