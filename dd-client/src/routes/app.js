import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import classNames from 'classnames';
import { Link } from 'dva/router';
import NProgress from 'nprogress';
import { Layout } from 'components';

import { Layout as LayoutComponent } from 'antd';
const { layout, Header, Footer, Content } = Layout;

const App = ({ children, app, loading, dispatch, location }) => {
  const { currentNav, Navs } = app;
  if (!loading) {
    NProgress.done();
  }

  const headerProps = {
    currentNav,
    switchNavPopover() {
      dispatch({ type: 'app/switchNav' });
    },
    Navs
  };

  const contentProps = {
    children: children
  };

  return (
    <LayoutComponent className={layout.layout}>
      <LayoutComponent.Header>
        <Header {...headerProps} />
      </LayoutComponent.Header>
      <LayoutComponent.Content>
        <Content {...contentProps} />
      </LayoutComponent.Content>
      <LayoutComponent.Footer>
        <Footer />
      </LayoutComponent.Footer>
    </LayoutComponent>
  );
};

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.bool
};

export default connect(({ app, loading }) => ({ app, loading: loading.global }))(App);
