import { login } from 'services/login';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'login',
  state: {},
  reducers: {},
  effects: {
    *submit({ payload }, { call, put }) {
      const params = {
        username: payload.username,
        password: payload.password
      };
      const data = yield call(login, params);

      if (data) {
        yield put({
          type: 'app/loginSuccess',
          payload: params
        });

        yield put(
          routerRedux.push({
            pathname: '/'
          })
        );
      }
    },
    *signup({ payload }, { put }) {
      yield put(routerRedux.push('/register'));
    },
    *login({ payload }, { put }) {
      yield put(routerRedux.push('/login'));
    }
  }
};
