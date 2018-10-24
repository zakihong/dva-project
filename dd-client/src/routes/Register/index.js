import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'dva';
import { Spin } from 'antd';
import RegisterForm from './RegisterForm';
import styles from './RegisterForm.less';

function Register({ dispatch, loading = false }) {
  const loginProps = {
    loading,
    onOk(data) {
      console.log('dispatch login action', data);
      dispatch({ type: 'login/submit', payload: data });
    },
    onLogin() {
      console.log('dispatch login action login');
      dispatch({ type: 'login/login' });
    }
  };
  return (
    <div className={classNames(styles.spin, styles['login-box'])}>
      <Spin tip="加载用户信息..." spinning={loading} size="large">
        <RegisterForm {...loginProps} />
      </Spin>
    </div>
  );
}

Register.propTypes = {
  dispatch: PropTypes.func,
  loading: PropTypes.bool
};

function mapStateToProps({ loading }) {
  return { loading: false };
}

export default connect(mapStateToProps)(Register);
