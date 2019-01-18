import React from 'react';
import PropTypes from 'prop-types';
import NProgress from 'nprogress';
import { routerRedux, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';
import App from './routes/app';
const { ConnectedRouter } = routerRedux;

const Routers = function({ history, app }) {
  NProgress.start();

  const Login = dynamic({
    app,
    component: () => require('./routes/Login')
  });

  const Register = dynamic({
    app,
    component: () => require('./routes/Register')
  });

  const routes = [
    {
      path: '/home',
      models: () => [require('./models/home')],
      component: () => require('./routes/Home')
    }
  ];
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <App>
          <Switch>
            {routes.map(({ path, ...dynamics }, key) => (
              <Route
                key={key}
                exact
                path={path}
                component={dynamic({
                  app,
                  ...dynamics
                })}
              />
            ))}
          </Switch>
        </App>
      </Switch>
    </ConnectedRouter>
  );
};

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object
};

export default Routers;
