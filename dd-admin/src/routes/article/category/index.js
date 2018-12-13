import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';

function Category({ category }) {
  return <div>category</div>;
}

Category.propTypes = {
  category: PropTypes.object
};

export default connect(({ category }) => ({ category }))(Category);
