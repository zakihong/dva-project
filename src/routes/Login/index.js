import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'dva';
import { Spin } from 'antd';
import LoginForm from './LoginForm';
import styles from './LoginForm.less';

function Login({ dispatch, loading = false }) {
  const loginProps = {
    loading,
    onOk(data) {
      console.log('dispatch login action', data);
      dispatch({ type: 'login/submit', payload: data });
    },
    onSignup() {
      console.log('dispatch login action signup');
      dispatch({ type: 'login/signup' });
    }
  };
  return (
    <div className={classNames(styles.spin, styles['login-box'])}>
      <Spin tip="加载用户信息..." spinning={loading} size="large">
        <LoginForm {...loginProps} />
      </Spin>
    </div>
  );
}

Login.propTypes = {
  dispatch: PropTypes.func,
  loading: PropTypes.bool
};

function mapStateToProps({ loading }) {
  return { loading: false };
}

export default connect(mapStateToProps)(Login);
