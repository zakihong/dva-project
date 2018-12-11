import dva from 'dva';
import createLoading from 'dva-loading';
import { message } from 'antd';
import { createLogger } from 'redux-logger';
import { Logger } from 'utils';
import { createBrowserHistory } from 'history';
// message全局配置
message.config({
  duration: 5
});

// 1. Initialize
const app = dva({
  ...createLoading({ effects: true }),
  history: createBrowserHistory(),
  onError(error) {
    /*全局错误处理，需要使用的地方throw new Error()才能catch到*/
    message.error(error.message, 10);
    Logger.error(error);
  },
  onAction: createLogger()
});

// 2. Plugins

// 2. 注册路由表中不包含的Model,全局生效
app.model(require('./models/app').default);

// 3. Router
app.router(require('./router').default);

// 4. Start
app.start('#root');
