import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
const Content = ({ children }) => {
  return <Layout.Content>{children}</Layout.Content>;
};

Content.propTypes = {
  children: PropTypes.element.isRequired
};

export default Content;
