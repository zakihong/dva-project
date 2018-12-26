import React from 'react';
import PropTypes from 'prop-types';
import { Input, Form, Modal } from 'antd';
const FormItem = Form.Item;

function Create({ visible, confirmLoading, onOk, onCancel, form: { getFieldDecorator, validateFields } }) {
  function handleOk(e) {
    e.preventDefault();
    validateFields((errors, values) => {
      if (errors) {
        return;
      }
      onOk(values);
    });
  }

  function handleCancel() {
    onCancel();
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 }
    }
  };

  return (
    <Modal title="创建类别" visible={visible} onOk={handleOk} destroyOnClose={true} confirmLoading={confirmLoading} onCancel={handleCancel}>
      <form>
        <FormItem {...formItemLayout} label="类别名称" validateStatus="error">
          {getFieldDecorator('name', { rules: [{ required: true, message: '请输入账号' }], initialValue: '' })(<Input />)}
        </FormItem>
      </form>
    </Modal>
  );
}

Create.propTypes = {
  form: PropTypes.object.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  confirmLoading: PropTypes.bool.isRequired
};

export default Form.create()(Create);
