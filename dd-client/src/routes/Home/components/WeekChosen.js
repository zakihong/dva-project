import React from 'react';
// import PropTypes from 'prop-types';
// import classNames from 'classnames';
import styles from './HomeContainer.less';
import iconmonstr from 'assets/iconmonstr.svg';
import gameover from 'assets/gameover.jpg';
import aikeji from 'assets/aikeji.png';
import { Row } from 'antd';
function WeekChosen() {
  return (
    <div className={styles['week-choose']}>
      <div className={styles.header}>
        <img src={iconmonstr} alt="" />
        站长推荐
      </div>
      <div className={styles.list}>
        <div className={styles.item}>
          <img src={aikeji} alt="" />
          <p>腾讯发布 AI 辅助翻译产品：采用人机交互式机器翻译技术</p>
        </div>
        <div className={styles.item}>
          <img src={gameover} alt="" />
          <p>暗黑微信群，窃听无线键盘，我在保密大会上进入的神秘体验区</p>
        </div>
        <div className={styles.item}>
          <img src={aikeji} alt="" />
          <p>腾讯发布 AI 辅助翻译产品：采用人机交互式机器翻译技术</p>
        </div>
        <div className={styles.item}>
          <img src={gameover} alt="" />
          <p>暗黑微信群，窃听无线键盘，我在保密大会上进入的神秘体验区</p>
        </div>
      </div>
    </div>
  );
}

WeekChosen.propTypes = {};

export default WeekChosen;
