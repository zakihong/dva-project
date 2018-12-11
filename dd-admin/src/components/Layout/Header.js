import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon, Avatar } from 'antd';
import { Link } from 'dva/router';
import config from 'config';
import styles from './Layout.less';

const Header = ({ topMenus, user, logout }) => {
  const topMenu =
    topMenus &&
    topMenus.map(v => {
      return (
        <Menu.Item key={v.key}>
          <Link to={`${v.path}`}>{v.name}</Link>
        </Menu.Item>
      );
    });

  const userName = () => {
    if (user.name) {
      if (/( |^)[a-z]/g.test(user.name)) {
        return user.name.ucfirst()[0]; // 字母开头取大写首字母
      } else {
        return String(user['name'])[0]; // 数字开头取数字
      }
    } else {
      return '';
    }
  };
  return (
    <Layout.Header className={styles.header}>
      <div className={styles.logo} id="logo">
        <Link to="/">
          <img src={config.logoSrc} alt={config.logoSrc} />
        </Link>
      </div>
      <Menu theme="dark" mode="horizontal" className={styles.menu}>
        {topMenu}
      </Menu>
      <Menu theme="dark" mode="horizontal" className={styles.profile}>
        <Menu.SubMenu
          className={styles['profile-item']}
          title={
            <a className="item-link">
              <Avatar className="avatar">{userName()}</Avatar>
              <Icon type="down" />
            </a>
          }
        >
          <Menu.Item key="setting">
            <span>账户设置</span>
          </Menu.Item>
          <Menu.Item key="logout">
            <span>注销</span>
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </Layout.Header>
  );
};

Header.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func,
  topMenus: PropTypes.array
};

export default Header;
