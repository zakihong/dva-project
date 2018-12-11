import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';

function User(user) {
  return <div>User</div>;
}

User.propTypes = {
  user: PropTypes.object
};

export default connect(({ user }) => ({ User }))(User);
