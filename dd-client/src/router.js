import React from 'react';
import { Router, Route } from 'dva/router';
import dynamic from 'dva/dynamic';
import Authorized from 'components/Authorized';
function RouterConfig({ history, app }) {
  const Home = dynamic({
    app,
    models: () => [import('./models/index')],
    component: () => import('./routes/Home')
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
        <Route path="/" component={Home} />
        <Authorized name="home" path="/home" component={Home} />
      </div>
    </Router>
  );
}

export default RouterConfig;
