/**
 * this is the home container component
 */
import React from 'react';
import { connect } from 'dva';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import { Layout } from 'components';
import styles from './HomeContainer.less';
import SilderNews from './SilderNews';
import NewsList from './NewsList';
import HotBlogs from './HotBlogs';
import JoinUs from './JoinUs';
import Circles from './Circles';
import WeekChosen from './WeekChosen';
const { layout } = Layout;

function HomeContainer({ dispatch, silderNews, silderIndex, loading }) {
  const silderNewsProps = {
    silderNews,
    silderIndex,
    showNewsDetail(silderIndex) {
      dispatch({ type: 'home/showSilder', payload: silderIndex });
    }
  };
  return (
    <div className={styles['home-container']}>
      <div className={classNames(layout['container'])}>
        <div className={styles.banner}>
          <div className={styles['banner-container']}>
            <h3>学无先后，达者为师</h3>
            <div className={styles.title}>欢迎来到人人师，分享你的城市生活。</div>
          </div>
        </div>
        <div className={classNames(styles['home-warp'])}>
          <Row>
            <Col sm={24} md={24} lg={18}>
              <Row>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                  <SilderNews {...silderNewsProps} />
                </Col>
                <Col xs={24} sm={16} md={16} lg={16} xl={16}>
                  <NewsList />
                </Col>
              </Row>
              <Row>
                <Col>
                  <HotBlogs />
                </Col>
              </Row>
            </Col>
            <Col sm={24} md={24} lg={6}>
              <JoinUs />
              <WeekChosen />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

HomeContainer.propTypes = {};

function mapStateToProps(state) {
  const { silderNews, silderIndex } = state.home;
  return {
    loading: state.loading.models.home,
    silderNews,
    silderIndex
  };
}

export default connect(mapStateToProps)(HomeContainer);
