import dva from 'dva';
import { browserHistory } from 'dva/router';
import './index.css';

// 1. Initialize
const app = dva({
  history: browserHistory,
  onError(error) {
    console.error('app onError --', error);
  }
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/app').default);
console.log(app); // 顶部的 state 数据
// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
