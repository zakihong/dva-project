import React from 'react';
import { Router, Route } from 'dva/router';
import dynamic from 'dva/dynamic';
function RouterConfig({ history, app }) {
  const Home = dynamic({
    app,
    models: () => [import('./models/index')],
    component: () => import('./routes/Home')
  });

  return (
    <Router history={history}>
      <div>
        <Route path="/" component={Home} />
      </div>
    </Router>
  );
}

export default RouterConfig;
