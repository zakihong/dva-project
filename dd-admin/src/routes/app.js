import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
// import { Link } from 'dva/router';
import NProgress from 'nprogress';

import { Layout } from 'components';

import { Layout as LayoutComponent } from 'antd';
import 'styles/skin.less';
const { styles, Header, Sider, Content } = Layout;

const { Footer } = LayoutComponent;

const App = ({ children, app, loading, dispatch, location }) => {
  const { user, currentMenu, menus } = app;

  if (!loading) {
    NProgress.done();
  }

  const headerProps = {
    user: user,
    logout() {
      dispatch({ type: 'app/logout' });
    }
  };

  const siderProps = {
    currentMenu: currentMenu,
    menus: menus,
    handleClickMenu(menu) {
      dispatch({
        type: 'app/switchMenuPopver',
        payload: {
          defaultSelectedKeys: [menu.key],
          selectedKey: [menu.key],
          defaultOpenKeys: menu.keyPath.length > 1 ? menu.keyPath[1] : []
        }
      });
    },
    changeOpenKeys(openKeys) {
      dispatch({ type: 'handleNavOpenKeys', openKeys });
    }
  };

  const contentProps = {
    children: children,
    currentMenu: currentMenu,
    menus: menus
  };

  return (
    <LayoutComponent className={styles.layout}>
      <Header {...headerProps} />
      <LayoutComponent.Content className={styles.content}>
        <LayoutComponent className="ant-layout-has-sider">
          <Sider {...siderProps} />
          <Content {...contentProps} />
        </LayoutComponent>
      </LayoutComponent.Content>
      <Footer className="text-center">DDRRS &copy; {new Date().getFullYear()}</Footer>
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
