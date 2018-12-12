import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'dva/router';
import styles from './Layout.less';
const SubMenu = Menu.SubMenu;
const Sider = ({ currentMenu, menus, handleClickMenu, changeOpenKeys }) => {
  const makeItem = item => {
    return (
      <Menu.Item key={item.key}>
        <Icon type={item.icon} />
        <Link to={`${item.path}`}>{item.title}</Link>
      </Menu.Item>
    );
  };
  return (
    <Layout.Sider className={styles.sider} width={220}>
      <Menu mode="inline" className="sider-container" defaultSelectedKeys={currentMenu.defaultSelectedKeys} defaultOpenKeys={currentMenu.defaultOpenKeys} onClick={handleClickMenu}>
        {menus.map((item, index) => {
          if (item.children && Array.isArray(item.children)) {
            return (
              <SubMenu
                key={item.key}
                title={
                  <span>
                    <Icon type={item.icon} />
                    <span>{item.title}</span>
                  </span>
                }
              >
                {item.children &&
                  item.children.map((v, i) => {
                    return makeItem(v);
                  })}
              </SubMenu>
            );
          } else {
            return makeItem(item);
          }
        })}
      </Menu>
    </Layout.Sider>
  );
};

Sider.propTypes = {
  currentMenu: PropTypes.object
};

export default Sider;
