import { EditorState } from 'draft-js';
import { routerRedux } from 'dva/router';
import { uploadArticleImg } from 'services/article';
import { message } from 'antd';
import { create, query } from 'services/article';

export default {
  namespace: 'article',
  state: {
    list: [],
    total: null,
    page: null,
    title: '',
    loading: false,
    selectedRowKeys: [],
    editorState: EditorState.createEmpty(),
    imageUrl: '',
    previewVisible: false,
    previewImage: ''
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/article') {
          dispatch({ type: 'fetch', payload: {} });
        }
      });
    }
  },
  effects: {
    *fetch(
      {
        payload: { page = 1, title = '' }
      },
      { call, put }
    ) {
      yield put({
        type: 'search',
        payload: {
          title
        }
      });
      const data = yield call(query, { page, title });

      yield put({
        type: 'save',
        payload: {
          list: data.rows,
          total: data.count,
          page: parseInt(page, 10)
        }
      });
    },
    *upload({ payload, callback }, { call, put, select }) {
      const data = yield call(uploadArticleImg, payload);
      if (callback && typeof callback === 'function') {
        callback(data);
      }
    },
    *submit({ payload }, { call, put }) {
      const data = yield call(create, payload.data);
      if (data.errorMsg) {
        message.error(data.errorMsg);
      } else {
        yield put(routerRedux.push('/article'));
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
    search(state, { payload: title }) {
      return { ...state, title };
    },
    selectedChanged(state, { payload: selectedRowKeys }) {
      return { ...state, selectedRowKeys };
    },
    change(
      state,
      {
        payload: { editorState }
      }
    ) {
      return { ...state, editorState };
    },
    photochange(
      state,
      {
        payload: { imageUrl }
      }
    ) {
      return { ...state, imageUrl };
    },
    preview(
      state,
      {
        payload: { data }
      }
    ) {
      return { ...state, data };
    }
  }
};
