/**
 * this is the header component
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Row, Col, Icon, Avatar } from 'antd';
import { Link } from 'dva/router';
import styles from './Header.less';
import layout from './Layout.less';

function Header({ currentNav, switchNavPopover, Navs }) {
  function handleClick(i) {
    switchNavPopover(i);
  }
  return (
    <div className={classNames(styles['zf-header'])}>
      <div className={classNames(layout['visible-xs'], layout['visible-sm'], styles['bottom-nav'])}>
        <div className={classNames(styles['opts'])}>
          <a className={classNames(styles['opts-group'])} href="/">
            <span>首页</span>
          </a>
          <a className={classNames(styles['opts-group'])} href="/">
            <span>问答</span>
          </a>
          <a className={classNames(styles['opts-group'])} href="/">
            <span>专栏</span>
          </a>
          <a className={classNames(styles['opts-group'])} href="/">
            <span>杂文</span>
          </a>
          <a className={classNames(styles['opts-group'])} href="/">
            <span>关于</span>
          </a>
        </div>
      </div>
      <nav className={classNames(layout['container'], styles['nav'])}>
        <div className={classNames(layout['visible-xs'], layout['visible-sm'], styles['header-response'])}>
          <a href="" className={styles['zf-search']}>
            <Icon type="search" style={{ fontSize: '20px', color: '#757575' }} />
          </a>
          <div className={classNames(styles['zf-header__logo'], styles['zf-header__logo--response'])}>
            <h1>
              <a href="/" style={{ height: '24px', backgroundSize: 'auto 24px' }} />
            </h1>
          </div>
          <div className={classNames(styles['opts'])}>
            <li className={classNames(styles['opts-item'])}>
              <a href="/mail">
                <Icon type="mail" />
              </a>
            </li>
            <li className={classNames(styles['opts-item'])}>
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            </li>
          </div>
        </div>
        {/* PC端导航 */}
        <div className={classNames(layout['hidden-xs'], layout['hidden-sm'])}>
          <Row>
            <Col sm={16} md={18} lg={18}>
              <div className={classNames(styles['zf-header__logo'])}>
                <h1>
                  <a href="/home">知否</a>
                </h1>
              </div>
              <div>
                <ul className={classNames(styles['menu'], layout['list-inline'], layout['pull-left'], layout['hidden-xs'])}>
                  {Navs.map(item => {
                    return (
                      <li key={item.key} className={classNames(styles['menu__item'])}>
                        <Link to={item.path} className={classNames({ [styles['active-nav']]: currentNav.key === item.key })}>
                          {item.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Col>
            <Col xs={8} sm={6} md={6} lg={6}>
              <ul className={classNames(styles['opts'], layout['list-inline'], layout['hidden-xs'],layout['fl-right'])}>
                <li className={classNames(styles['opts-item'])}>
                  <a href="/mail">
                    <Icon type="question" />
                  </a>
                </li>
                <li className={classNames(styles['opts-item'])}>
                  <a href="/mail">
                    <Icon type="mail" />
                  </a>
                </li>
                <li className={classNames(styles['opts-item'])}>
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                </li>
              </ul>
            </Col>
          </Row>
        </div>
      </nav>
    </div>
  );
}

Header.propTypes = {
  currentNav: PropTypes.object,
  switchNavPopover: PropTypes.func,
  Navs: PropTypes.array
};

export default Header;
