import React from 'react';
import PropTypes from 'prop-types';
import NProgress from 'nprogress';
import { routerRedux, Route, Switch, Redirect } from 'dva/router';
import dynamic from 'dva/dynamic';
import App from './routes/app';
const { ConnectedRouter } = routerRedux;

const Routers = function({ history, app }) {
  NProgress.start();

  const Login = dynamic({
    app,
    component: () => require('./routes/login')
  });

  const routes = [
    {
      path: '/dashboard',
      models: () => [require('./models/dashboard')],
      component: () => require('./routes/dashboard')
    },
    {
      path: '/logs',
      models: () => [require('./models/logs')],
      component: () => require('./routes/logs')
    },
    {
      path: '/user',
      models: () => [require('./models/user')],
      component: () => require('./routes/user')
    }
  ];
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/login" component={Login} />
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

            <Route exact path="*" render={() => <Redirect to="/dashboard" />} />
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
