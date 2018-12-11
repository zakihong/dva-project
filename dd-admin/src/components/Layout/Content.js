import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

import styles from './Layout.less';

const Content = ({ children }) => {
  return (
    <Layout.Content className={styles.content}>
      <div className="content-header">头部</div>
      <div className="content-inner">{children}</div>
    </Layout.Content>
  );
};

Content.propTypes = {
  children: PropTypes.element.isRequired
};

export default Content;
