import React from 'react';
import PropTypes from 'prop-types';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { Form, Modal, Button } from 'antd';

import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styles from './index.less';

const FormItem = Form.Item;

const CreateForm = ({ onOk, onEditorChange, onUploadChange, categorys, imageUrl, previewVisible, previewImage, editorState, form: { getFieldDecorator, validateFields } }) => {
  const formItemMax = {
    labelCol: { xs: { span: 2 }, sm: { span: 2 } },
    wrapperCol: { xs: { span: 16 }, sm: { span: 16 } }
  };

  const tailFormItemLayout = {
    wrapperCol: { xs: { span: 2, offset: 2 }, sm: { span: 2, offset: 2 } }
  };

  // const getText = () => {
  //   console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  // };

  const toolbar = {
    options: ['inline']
  };

  function handleOk(e) {
    e.preventDefault();
    validateFields((errors, values) => {
      // console.log(typeof draftToHtml(convertToRaw(editorState.getCurrentContent())));
      if (errors) {
        return;
      }
      values.content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
      onOk(values);
    });
  }

  const handleCancel = () => {};

  const onEditorStateChange = e => {
    onEditorChange(e);
  };

  return (
    <form onSubmit={handleOk} className={styles['create-form']}>
      <FormItem {...formItemMax} label="文章正文">
        {getFieldDecorator('content', { rules: [{ required: false, message: '文章正文' }] })(<Editor wrapperClassName={styles['wrapper-class']} editorClassName={styles['editor-class']} toolbarClassName={styles['toolbar-class']} toolbar={toolbar} localization={{ locale: 'zh' }} onEditorStateChange={onEditorStateChange} />)}
      </FormItem>
      <FormItem {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </FormItem>
      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </form>
  );
};

CreateForm.propTypes = {
  form: PropTypes.object.isRequired,
  onOk: PropTypes.func.isRequired,
  onEditorChange: PropTypes.func.isRequired,
  editorState: PropTypes.object.isRequired
};

export default Form.create()(CreateForm);
