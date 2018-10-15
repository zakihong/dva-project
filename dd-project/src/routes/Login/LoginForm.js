import React from 'react';
import PropTypes from 'prop-types';

import { Button, Form, Input, Icon } from 'antd';
import QueueAnim from 'rc-queue-anim';
import config from 'config';
import styles from './LoginForm.less';

const FormItem = Form.Item;

const Login = ({
  loading,
  onOk,
  onSignup,
  form: { getFieldDecorator, validateFieldsAndScroll }
}) => {
  function handleOk(e) {
    e.preventDefault();
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return;
      }
      onOk(values);
    });
  }
  function handleSignup() {
    onSignup();
  }
  return (
    <div className={styles.form}>
      <QueueAnim delay={200} type="top">
        <div className={styles.logo} key="1">
          <img src={config.logoSrc} alt={config.logoSrc} />
          <span>Login</span>
        </div>
      </QueueAnim>
      <QueueAnim delay={200} type="top">
        <div className={styles.text}>Enter your login details below to access</div>
      </QueueAnim>
      <QueueAnim delay={200} type="top">
        <Form onSubmit={handleOk}>
          <QueueAnim delay={200} type="top">
            <FormItem hasFeedback key="1">
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                    message: '请填写用户名'
                  }
                ]
              })(
                <Input
                  size="large"
                  placeholder="用户名"
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                />
              )}
            </FormItem>
            <FormItem hasFeedback key="2">
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: '请填写密码'
                  }
                ]
              })(
                <Input
                  size="large"
                  type="password"
                  placeholder="密码"
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                />
              )}
            </FormItem>
            <FormItem key="3">
              <div className={styles.signup}>
                You don’t have an account? <a onClick={handleSignup}>Signup</a>
              </div>
              <Button type="primary" htmlType="submit" size="large" loading={loading}>
                登录
              </Button>
            </FormItem>
          </QueueAnim>
        </Form>
      </QueueAnim>
    </div>
  );
};

Login.propTypes = {
  form: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onSignup: PropTypes.func.isRequired
};

export default Form.create()(Login);
