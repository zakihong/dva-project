export default {
  namespace: 'home',

  state: {
    silderNews: [],
    silderIndex: null
  },

  subscriptions: {
    setup({ dispatch, history }) {
      dispatch({ type: 'getSilderNews', payload: {} });
    }
  },

  effects: {},

  reducers: {
    getSilderNews(state, action) {
      let silderNews = [
        {
          title: 'Dream is dieing',
          url: '#ss',
          src: require('assets/news/m1.jpg')
        },
        {
          title: '后悔无期',
          url: '#ss',
          src: require('assets/news/m2.jpg')
        },
        {
          title: '你是唯一',
          url: '#ss',
          src: require('assets/news/m3.jpg')
        },
        {
          title: '一代宗师',
          url: '#ss',
          src: require('assets/news/m4.jpeg')
        },
        {
          title: '大护法',
          url: '#ss',
          src: require('assets/news/m5.jpg')
        }
      ];
      return {
        ...state,
        silderNews
      };
    },
    showSilder(state, action) {
      return { ...state, silderIndex: action.payload };
    }
  }
};
