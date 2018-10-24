import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'dva/router';
import QueueAnim from 'rc-queue-anim';
import { connect } from 'dva';
import classNames from 'classnames';
import styles from './IndexPage.less';
import logo from '../assets/rrs.png';
function IndexPage({ app, dispatch }) {
  const { index } = app;
  const getNavs = () => {
    return [
      {
        title: '首页',
        path: '/'
      },
      {
        title: '服务与支持',
        path: '/'
      },
      {
        title: '解决方案',
        path: '/'
      },
      {
        title: '产品中心',
        path: '/'
      },
      {
        title: '企业动态',
        path: '/'
      }
    ];
  };
  function handleClick(i) {
    dispatch({ type: 'index/switchNav', payload: { active: i } });
  }
  return (
    <div className={styles['yz-box']}>
      <QueueAnim delay={200} type="top">
        <div className={styles.header}>
          <div className={styles.wrapper}>
            <a className={styles['logo-box']} href="">
              <img className={styles.logo} src={logo} alt={logo} />
            </a>

            <ul className={styles.nav}>
              {getNavs().map((item, i) => {
                return (
                  <li className={styles['nav-item']} key={i} onClick={handleClick.bind(this, i)}>
                    <a className={classNames({ [styles.active]: index.active === i })}>
                      {item.title}
                    </a>
                  </li>
                );
              })}
              <li className={classNames(styles['nav-item'], 'mr-20')}>
                <Link to="/login">登录</Link>
              </li>
              <li className={classNames(styles['nav-item'], 'mr-30')}>
                <Link to="/register">注册</Link>
              </li>
            </ul>
          </div>
        </div>
      </QueueAnim>
    </div>
  );
}

IndexPage.propTypes = {
  app: PropTypes.object
};

export default connect(app => ({ app }))(IndexPage);
