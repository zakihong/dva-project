import React from 'react';
import PropTypes from 'prop-types';
import QueueAnim from 'rc-queue-anim';
import { connect } from 'dva';
import styles from './home.less';
import Header from 'components/layout/header';
import HomeContainer from './components/HomeContainer';
import Footer from 'components/layout/footer';
function App({ app, dispatch }) {
  const headProps = {
    app,
    switchNavPopover(active) {
      dispatch({ type: 'index/switchNav', payload: { active } });
    }
  };

  return (
    <div className={styles['yz-box']}>
      <QueueAnim delay={200} type="top">
        <Header {...headProps} />
      </QueueAnim>
      <QueueAnim delay={200} type="top">
        <HomeContainer />
      </QueueAnim>
      <QueueAnim delay={200} type="bottom">
        <Footer />
      </QueueAnim>
    </div>
  );
}

App.propTypes = {
  app: PropTypes.object
};

export default connect(app => ({ app }))(App);
