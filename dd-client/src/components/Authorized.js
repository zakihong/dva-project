import React from 'react';
import { Route, Redirect } from 'dva/router';
import Cookie from 'utils/cookie';

export default ({ component: Component, ...rest }) => {
  const isLogin = () => {
    return Cookie.get('user_session') && Cookie.get('user_session') > new Date().getTime();
  };
  return (
    <Route
      {...rest}
      render={props => {
        return isLogin() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        );
      }}
    />
  );
};
