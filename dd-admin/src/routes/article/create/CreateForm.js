import React from 'react';
import fetch from 'dva/fetch';
import PropTypes from 'prop-types';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { Form, Input, Select, Icon, Upload, Modal, Button } from 'antd';

import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styles from './index.less';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

const CreateForm = ({ onOk, onEditorChange, onUploadChange, categorys, imageUrl, previewVisible, previewImage, editorState, form: { getFieldDecorator, validateFields } }) => {
  const formItemMax = {
    labelCol: { xs: { span: 2 }, sm: { span: 2 } },
    wrapperCol: { xs: { span: 16 }, sm: { span: 16 } }
  };

  const formItemLarge = {
    labelCol: { xs: { span: 2 }, sm: { span: 2 } },
    wrapperCol: { xs: { span: 10 }, sm: { span: 10 } }
  };

  const formSelectMiddle = {
    labelCol: { xs: { span: 2 }, sm: { span: 2 } },
    wrapperCol: { xs: { span: 6 }, sm: { span: 6 } }
  };

  const formSelectSmall = {
    labelCol: { xs: { span: 2 }, sm: { span: 2 } },
    wrapperCol: { xs: { span: 4 }, sm: { span: 4 } }
  };

  const tailFormItemLayout = {
    wrapperCol: { xs: { span: 2, offset: 2 }, sm: { span: 2, offset: 2 } }
  };

  // const getText = () => {
  //   console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  // };

  const uploadImageCallBack = file => {
    return new Promise(
      function(resolve, reject) {
        let formData = new FormData();
        formData.append('img', file);
        fetch('/api/upload/editor', {
          method: 'POST',
          body: formData
        }).then(res => {
          res.json().then(result => {
            resolve({ data: { link: result.data } });
          });
        });
      },
      err => {
        console.log(err);
      }
    );
  };

  const toolbar = {
    options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'image'],
    inline: {
      options: ['bold', 'italic', 'underline', 'monospace']
    },
    fontFamily: {
      options: ['宋体', '仿宋', '微软雅黑', '黑体', 'Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana']
    },
    list: {
      options: ['unordered', 'ordered']
    },
    image: {
      uploadCallback: uploadImageCallBack,
      alt: { present: true, mandatory: true },
      className: undefined,
      component: undefined,
      popupClassName: 'rrs-upload',
      urlEnabled: false,
      uploadEnabled: true,
      alignmentEnabled: false,
      previewImage: true,
      inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg'
    }
  };

  function handleOk(e) {
    e.preventDefault();
    validateFields((errors, values) => {
      // console.log(typeof draftToHtml(convertToRaw(editorState.getCurrentContent())));
      if (errors) {
        return;
      }
      values.content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
      values.pic = imageUrl;
      onOk(values);
    });
  }
  const getUploadButtton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  const handleChange = info => {
    if (info.file.status === 'done') {
      onUploadChange(info.file.response.data);
    }
  };

  const handleCancel = () => {};

  const onEditorStateChange = e => {
    onEditorChange(e);
  };

  return (
    <form onSubmit={handleOk} className={styles['create-form']}>
      <FormItem {...formSelectMiddle} label="文章标题">
        {getFieldDecorator('title', { rules: [{ required: true, message: '请填写文章标题' }], initialValue: '' })(<Input />)}
      </FormItem>
      <FormItem {...formSelectSmall} label="文章类别" hasFeedback>
        {getFieldDecorator('categoryId', { rules: [{ required: true, message: '请选择文章类型' }] })(
          <Select>
            {categorys.map(category => {
              return (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              );
            })}
          </Select>
        )}
      </FormItem>
      <FormItem {...formSelectMiddle} label="文章缩略图" hasFeedback>
        {getFieldDecorator('pic', { rules: [{ required: false, message: '请上传展示图片' }] })(
          <div className="clearfix">
            <Upload multiple={false} listType="picture-card" className="avatar-uploader" showUploadList={false} action="/api/upload/article/photo" onChange={handleChange}>
              {imageUrl ? <img src={imageUrl} alt="avatar" /> : getUploadButtton}
            </Upload>
          </div>
        )}
      </FormItem>
      <FormItem {...formItemLarge} label="描述">
        {getFieldDecorator('descption', { rules: [{ required: false, message: '文章描述' }] })(<TextArea rows={3} />)}
      </FormItem>
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
  onUploadChange: PropTypes.func.isRequired,
  onPreviewChange: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
  categorys: PropTypes.array.isRequired,
  editorState: PropTypes.object.isRequired
};

export default Form.create()(CreateForm);
