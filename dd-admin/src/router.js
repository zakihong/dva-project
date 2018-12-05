import React from 'react';
import { Router, Route } from 'dva/router';
import dynamic from 'dva/dynamic';
function RouterConfig({ history, app }) {
  const Home = dynamic({
    app,
    models: () => [import('./models/index')],
    component: () => import('./routes/Home')
  });
  const Articles = dynamic({
    app,
    models: () => [import('./models/article')],
    component: () => import('./routes/Article')
  });
  return (
    <Router history={history}>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/articles" component={Articles} />
      </div>
    </Router>
  );
}

export default RouterConfig;
