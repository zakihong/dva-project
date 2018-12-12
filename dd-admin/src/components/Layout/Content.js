import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'dva/router';
import { Layout, Breadcrumb, Icon } from 'antd';

import styles from './Layout.less';

const Content = ({ children, currentMenu, menus }) => {
  let breadSet = [];
  const getBread = (menus, openKey, current) => {
    menus.forEach(menu => {
      if (openKey) {
        if (menu.key === openKey[0]) {
          breadSet.push(menu);
          if (menu.children) {
            getBread(menu.children, false, current);
          }
        }
      } else {
        if (menu.key === current) {
          breadSet.push(menu);
        }
      }
    });
  };

  getBread(menus, currentMenu.defaultOpenKeys, currentMenu.selectedKey[0]);
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
              <Link to="/">
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
