import React from 'react';
import { Router, Route } from 'dva/router';
import dynamic from 'dva/dynamic';
import Authorized from 'components/Authorized';
function RouterConfig({ history, app }) {
  const IndexPage = dynamic({
    app,
    models: () => [import('./models/example')],
    component: () => import('./routes/IndexPage')
  });
  const Login = dynamic({
    app,
    models: () => [import('./models/login')],
    component: () => import('./routes/Login')
  });

  const Register = dynamic({
    app,
    models: () => [import('./models/login')],
    component: () => import('./routes/Register')
  });

  return (
    <Router history={history}>
      <div>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Authorized name="home" path="/home" component={IndexPage} />
      </div>
    </Router>
  );
}

export default RouterConfig;
