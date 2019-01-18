import { EditorState } from 'draft-js';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { create, createmd, query, delArticle, uploadArticleImg } from 'services/article';
import { queryCategorys } from 'services/category';

export default {
  namespace: 'article',
  state: {
    list: [],
    categorys: [],
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
        if (pathname === '/article/list') {
          dispatch({ type: 'fetch', payload: {} });
        }
        if (pathname === '/article/create') {
          dispatch({ type: 'fetchCategory', payload: {} });
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
    *fetchCategory(
      {
        payload: {}
      },
      { call, put }
    ) {
      const data = yield call(queryCategorys, {});
      yield put({
        type: 'saveCategorys',
        payload: {
          categorys: data
        }
      });
    },
    *upload({ payload, callback }, { call, put, select }) {
      const data = yield call(uploadArticleImg, payload);
      if (callback && typeof callback === 'function') {
        callback(data);
      }
    },
    *submit({ payload }, { call, put, select }) {
      const app = yield select(state => state.app);
      const article = {
        ...payload.data,
        author: app.user.id
      };
      const data = yield call(create, article);
      if (data.errorMsg) {
        message.error(data.errorMsg);
      } else {
        yield put(routerRedux.push('/article/list'));
      }
    },
    *addmd({ payload }, { call, put, select }) {
      const app = yield select(state => state.app);
      const md = {
        ...payload.data,
        author: app.user.id
      };
      const data = yield call(createmd, md);
      if (data.errorMsg) {
        message.error(data.errorMsg);
      } else {
        yield put(routerRedux.push('/article/list'));
      }
    },
    *delete({ payload }, { call, put }) {
      const data = yield call(delArticle, payload.id);
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
    saveCategorys(
      state,
      {
        payload: { categorys }
      }
    ) {
      return { ...state, categorys };
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
