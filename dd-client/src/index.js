import dva from 'dva';
import createLoading from 'dva-loading';
import { message } from 'antd';
import { createLogger } from 'redux-logger';
import { createBrowserHistory } from 'history';
import './index.css';

// 1. Initialize
// message全局配置
message.config({
  duration: 5
});

const app = dva({
  ...createLoading({ effects: true }),
  history: createBrowserHistory(),
  onError(error) {
    /*全局错误处理，需要使用的地方throw new Error()才能catch到*/
    message.error(error.message, 10);
  }
  // onAction: createLogger()
});

// 2. Plugins

app.model(require('./models/app').default);

// 3. Router
app.router(require('./router').default);

// 4. Start
app.start('#root');
