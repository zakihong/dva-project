import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';

function Dashboard({ dashboard }) {
  return <div>Dashboard</div>;
}

Dashboard.propTypes = {
  dashboard: PropTypes.object
};

export default connect(({ dashboard }) => ({ dashboard }))(Dashboard);
