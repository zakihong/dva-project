import { query, create, delcategory } from 'services/category';
import { message } from 'antd';
export default {
  namespace: 'category',
  state: {
    list: [],
    total: null,
    page: null,
    visible: false,
    confirmLoading: false,
    title: ''
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/article/category') {
          dispatch({ type: 'fetch', payload: {} });
        }
      });
    }
  },
  effects: {
    *fetch(
      {
        payload: { page = 1, name = '' }
      },
      { call, put }
    ) {
      const data = yield call(query, { page, name });
      yield put({
        type: 'save',
        payload: {
          list: data.rows,
          total: data.count,
          page: parseInt(page, 10)
        }
      });
      yield put({ type: 'search', payload: { title: name } });
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
    },
    *delete({ payload }, { call, put }) {
      const data = yield call(delcategory, payload.id);
      if (data.errorMsg) {
        message.error(data.errorMsg);
      } else {
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
    }
  }
};
