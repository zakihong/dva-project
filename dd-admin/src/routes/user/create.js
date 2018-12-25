import React from 'react';
import PropTypes from 'prop-types';
import { Input, Form, Icon, Upload, Modal } from 'antd';
const FormItem = Form.Item;

function Create({ imageUrl, visible, confirmLoading, onOk, onCancel, onheadPortraitChange, form: { getFieldDecorator, validateFields } }) {
  function handleOk(e) {
    e.preventDefault();
    validateFields((errors, values) => {
      if (errors) {
        return;
      }
      values.photo = imageUrl;
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

  const handleChange = info => {
    if (info.file.status === 'done') {
      onheadPortraitChange(info.file.response.data);
    }
  };

  const getUploadButtton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  return (
    <Modal title="创建用户" visible={visible} onOk={handleOk} destroyOnClose={true} confirmLoading={confirmLoading} onCancel={handleCancel}>
      <form>
        <FormItem {...formItemLayout} label="账号" validateStatus="error">
          {getFieldDecorator('username', { rules: [{ required: true, message: '请输入账号' }], initialValue: '' })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="昵称">
          {getFieldDecorator('nikename', { rules: [{ required: true, message: '请输入昵称' }], initialValue: '' })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="密码">
          {getFieldDecorator('password', { rules: [{ required: true, message: '请输入密码' }], initialValue: '' })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="头像" hasFeedback>
          <div className="clearfix">
            <Upload multiple={false} listType="picture-card" className="avatar-uploader" showUploadList={false} action="/api/upload/user" onChange={handleChange}>
              {imageUrl ? <img src={imageUrl} alt="avatar" /> : getUploadButtton}
            </Upload>
          </div>
        </FormItem>
      </form>
    </Modal>
  );
}

Create.propTypes = {
  form: PropTypes.object.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onheadPortraitChange: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  confirmLoading: PropTypes.bool.isRequired
};

export default Form.create()(Create);
