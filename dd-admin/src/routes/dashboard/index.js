import React from 'react';
import PropTypes from 'prop-types';
import Reflv from 'reflv';
import { connect } from 'dva';

function Dashboard({ dashboard }) {
  return (
    <div>
      <Reflv url={`http://172.16.6.200:1935/rtmp1/test.flv`} type="flv" isLive cors />
    </div>
  );
}

Dashboard.propTypes = {
  dashboard: PropTypes.object
};

export default connect(({ dashboard }) => ({ dashboard }))(Dashboard);
