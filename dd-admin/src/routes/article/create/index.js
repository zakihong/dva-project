import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Spin } from 'antd';
import CreateForm from './CreateForm';
import styles from './index.less';

function CreateArticle({ dispatch, editorState, imageUrl, previewVisible, previewImage }) {
  const createArticleProps = {
    editorState,
    imageUrl,
    onOk(data) {
      dispatch({ type: 'article/submit', payload: { data } });
    },
    onEditorChange(data) {
      dispatch({ type: 'article/change', payload: { editorState: data } });
    },
    onUploadChange(imageUrl) {
      dispatch({ type: 'article/photochange', payload: { imageUrl } });
    },
    onPreviewChange(data) {
      dispatch({ type: 'article/preview', payload: { data } });
    }
  };
  return (
    <div className={styles['create-article-wrapper']}>
      <CreateForm {...createArticleProps} />
    </div>
  );
}

CreateArticle.propTypes = {
  dispatch: PropTypes.func,
  editorState: PropTypes.object
};

function mapStateToProps(state) {
  const { editorState, imageUrl, previewVisible, previewImage } = state.article;
  return {
    editorState,
    imageUrl,
    previewVisible,
    previewImage
  };
}

export default connect(mapStateToProps)(CreateArticle);
