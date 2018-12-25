import { query, create } from 'services/user';
import { message } from 'antd';
export default {
  namespace: 'user',
  state: {
    list: [],
    total: null,
    page: null,
    visible: false,
    confirmLoading: false,
    imageUrl: '',
    title: ''
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/user') {
          dispatch({ type: 'fetch', payload: {} });
        }
      });
    }
  },
  effects: {
    *fetch(
      {
        payload: { page = 1, username = '' }
      },
      { call, put, select }
    ) {
      const app = yield select(state => state.app);
      const data = yield call(query, { page, userId: app.user.id, username });
      yield put({
        type: 'save',
        payload: {
          list: data.rows,
          total: data.count,
          page: parseInt(page, 10)
        }
      });
      yield put({ type: 'search', payload: { title: username } });
      yield put({ type: 'save', payload: { list: data.rows, total: data.count, page: parseInt(page, 10) } });
    },
    *create({ payload }, { call, put }) {
      const data = yield call(create, payload.data);
      if (data.errorMsg) {
        message.error(data.errorMsg);
      } else {
        yield put({ type: 'show', payload: { visible: false } });
        yield put({ type: 'fetch', payload: {} });
      }
    }
  },
  reducers: {
    save(
      state,
      {
        payload: { list, total, page }
      }
    ) {
      return { ...state, list, total, page };
    },
    search(
      state,
      {
        payload: { title }
      }
    ) {
      return { ...state, title };
    },
    show(
      state,
      {
        payload: { visible }
      }
    ) {
      return { ...state, visible };
    },
    headPortrait(
      state,
      {
        payload: { imageUrl }
      }
    ) {
      return { ...state, imageUrl };
    }
  }
};
