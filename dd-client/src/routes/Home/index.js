import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import HomeContainer from './components/HomeContainer'
import styles from './home.less';

function App({ app, dispatch }) {
 
    return (
        <div className={styles['yz-box']}>
            <HomeContainer />
        </div>
    );
}

App.propTypes = {
  app: PropTypes.object
};

export default connect(app => ({ app }))(App);
