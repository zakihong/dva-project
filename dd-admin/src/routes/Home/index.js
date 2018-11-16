import React from 'react';
import PropTypes from 'prop-types';
import styles from './home.less';

import Silder from 'components/layout/Silder';
import Container from 'components/layout/Container';
function App() {
  return (
    <div className={styles['rs-box']}>
      {Silder()}
      {Container()}
    </div>
  );
}

App.propTypes = {
  app: PropTypes.object
};

export default App;
