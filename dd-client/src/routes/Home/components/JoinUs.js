import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './HomeContainer.less';
function JoinUs() {
  return (
    <div className={styles['join-us']}>
      <div className={styles['us-info']}>
        <h2>漂亮的人都在这里</h2>
        <p>在这里，你可以记录个人心得，生活点滴，分享你的skip,和众多草根精英学习交流。</p>
      </div>
      <div className={styles.join}>Join US</div>
    </div>
  );
}

JoinUs.propTypes = {};

export default JoinUs;
