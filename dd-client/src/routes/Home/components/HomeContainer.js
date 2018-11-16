/**
 * this is the home container component
 */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './HomeContainer.less';

import SilderNews from './SilderNews';
import NewsList from './NewsList';
import JoinUs from './JoinUs';
import Circles from './Circles';
import HotBlogs from './HotBlogs';
import WeekChosen from './WeekChosen';
function HomeContainer() {
  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <div className={styles.container}>
          <h3>学无先后，达者为师</h3>
          <div className={styles.title}>欢迎来到人人师，分享你的城市生活。</div>
        </div>
      </div>
      <div className={styles['container-warp']}>
        <div className={styles['articles']}>
          <div className={styles['section']}>
            <div className={styles['silder-box']}>
              <SilderNews />
            </div>
            {NewsList()}
          </div>
          {HotBlogs()}
        </div>
        <div className={styles['silder']}>
          <JoinUs />
          <Circles />
          <WeekChosen />
        </div>
      </div>
    </div>
  );
}

HomeContainer.propTypes = {
  showNewsDetail: PropTypes.func
};

export default HomeContainer;
