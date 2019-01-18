import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'dva/router';
import { Layout, Breadcrumb, Icon } from 'antd';

import styles from './Layout.less';

const Content = ({ children, currentMenu, menus, location }) => {
  let breadSet = [];

  const getBread = (menuArray, path) => {
    menuArray.forEach(menu => {
      if (path === menu.key) {
        breadSet.push({ key: menu.key, path: menu.path, icon: menu.icon, title: menu.title });
      } else {
        if (menu.children) {
          getBread(menu.children, path);
        }
      }
    });
  };

  location.pathname
    .substr(1)
    .split('/')
    .forEach(item => {
      getBread(menus, item);
    });

  const breads = breadSet.map((item, key) => {
    if (item.key !== 'dashboard') {
      return (
        <Breadcrumb.Item key={item.key}>
          <span>{item.title}</span>
        </Breadcrumb.Item>
      );
    } else {
      return [];
    }
  });
  return (
    <Layout.Content className={styles.content}>
      <div className="content-header">
        <h3 className="content-title">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/dashboard">
                <Icon type="home" />
                <span>主页</span>
              </Link>
            </Breadcrumb.Item>
            {breads}
          </Breadcrumb>
        </h3>
      </div>
      <div className="content-inner">{children}</div>
    </Layout.Content>
  );
};

Content.propTypes = {
  children: PropTypes.element.isRequired
};

export default Content;
