import React from 'react';
// import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { Icon } from 'antd';
import styles from './HomeContainer.less';
import persons from 'assets/persons.png';
import weixin from 'assets/weixin.png';
function Circles() {
  return (
    <div className={styles['circles']}>
      <div className={styles['header']}>
        <span>
          <img src={persons} />
          圈子
        </span>
      </div>
      <div className={styles.content}>
        <ul>
          <li>
            产品经理群
            <span>
              <Icon type="plus" style={{ fontSize: '14px', color: '#08c' }} />
              加入
            </span>
          </li>
          <li>
            产品经理群
            <span>
              <Icon type="plus" style={{ fontSize: '14px', color: '#08c' }} />
              加入
            </span>
          </li>
          <li>
            产品经理群
            <span>
              <Icon type="plus" style={{ fontSize: '14px', color: '#08c' }} />
              加入
            </span>
          </li>
          <li>
            产品经理群
            <span>
              <Icon type="plus" style={{ fontSize: '14px', color: '#08c' }} />
              加入
            </span>
          </li>
          <li>
            产品经理群
            <span>
              <Icon type="plus" style={{ fontSize: '14px', color: '#08c' }} />
              加入
            </span>
          </li>
        </ul>
        <div className={styles.weixin}>
          <img src={weixin} />
        </div>
      </div>
    </div>
  );
}

Circles.propTypes = {};

export default Circles;
