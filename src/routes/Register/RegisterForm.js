import React from 'react';
import PropTypes from 'prop-types';

import { Button, Form, Select, Input, Icon } from 'antd';
import QueueAnim from 'rc-queue-anim';
import config from 'config';
import styles from './RegisterForm.less';

const FormItem = Form.Item;
const Option = Select.Option;
const Register = ({
  loading,
  onOk,
  onLogin,
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
    onLogin();
  }
  return (
    <div className={styles.form}>
      <QueueAnim delay={200} type="top">
        <div className={styles.logo} key="1">
          <img src={config.logoSrc} alt={config.logoSrc} />
          <span>Sign In</span>
        </div>
      </QueueAnim>
      <QueueAnim delay={200} type="top">
        <Form onSubmit={handleOk}>
          <QueueAnim delay={200} type="top">
            <FormItem key="1">
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
            <FormItem key="2">
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
              {getFieldDecorator('rpassword', {
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
                  placeholder="请确认密码"
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                />
              )}
            </FormItem>
            <FormItem key="4">
              {getFieldDecorator('gender', {
                rules: [{ required: true, message: '请选择性别' }]
              })(
                <Select className={styles.select} size="large" placeholder="请选择性别">
                  <Option value="male">male</Option>
                  <Option value="female">female</Option>
                </Select>
              )}
            </FormItem>
            <FormItem key="5">
              <div className={styles.signup}>
                You have an account? <a onClick={handleSignup}>Login</a>
              </div>
              <Button type="primary" htmlType="submit" size="large" loading={loading}>
                注册
              </Button>
            </FormItem>
          </QueueAnim>
        </Form>
      </QueueAnim>
    </div>
  );
};

Register.propTypes = {
  form: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired
};

export default Form.create()(Register);
