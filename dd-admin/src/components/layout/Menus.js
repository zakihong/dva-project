import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';
import styles from './layout.less';
const SubMenu = Menu.SubMenu;

function Menus() {
  return (
    <div className={styles.menus}>
      <Menu mode="inline">
        <Menu.Item key="1">
          <Link to={'/'}>
            <Icon type="pie-chart" />
            <span>管理平台</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="desktop" />
          <span>用户管理</span>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to={'/articles'}>
            <Icon type="inbox" />
            <span>文章管理</span>
          </Link>
        </Menu.Item>
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="mail" />
              <span>扩展菜单</span>
            </span>
          }
        >
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <Menu.Item key="7">Option 7</Menu.Item>
          <Menu.Item key="8">Option 8</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <Icon type="appstore" />
              <span>Navigation Two</span>
            </span>
          }
        >
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu>
        </SubMenu>
      </Menu>
    </div>
  );
}

Menus.propTypes = {};

export default Menus;
