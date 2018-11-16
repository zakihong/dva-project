/**
 * this is the header component
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Row, Col } from 'antd';
import { Link } from 'dva/router';
import styles from './layout.less';
import logo from 'assets/rrs.png';

function Header({ app, switchNavPopover }) {
  const { index } = app;
  const getNavs = () => {
    return [
      {
        title: '首页',
        path: '/'
      },
      {
        title: '问答',
        path: '/'
      },
      {
        title: '专栏',
        path: '/'
      },
      {
        title: '软件下载',
        path: '/'
      },
      {
        title: '趣事杂文',
        path: '/'
      },
      {
        title: '关于人师',
        path: '/'
      }
    ];
  };

  function handleClick(i) {
    switchNavPopover(i);
  }

  return (
    <div className={styles['header-warp']}>
      <Row className={styles.header}>
        <Col span={4}>
          <a className={styles['logo-box']} href="">
            <img className={styles.logo} src={logo} alt={logo} />
          </a>
        </Col>
        <Col span={16}>
          <ul className={styles.nav}>
            {getNavs().map((item, i) => {
              return (
                <li className={styles['nav-item']} key={i} onClick={handleClick.bind(this, i)}>
                  <a className={classNames({ [styles.active]: index.active === i })}>{item.title}</a>
                </li>
              );
            })}
          </ul>
        </Col>
        <Col span={4}>
          <div className={styles['right-nav']}>
            <a href="">登录</a>
            <a href="">注册</a>
          </div>
        </Col>
      </Row>
    </div>
  );
}

Header.propTypes = {
  app: PropTypes.object
};

export default Header;
