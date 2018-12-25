import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Input, Button, Table } from 'antd';

import styles from './index.less';
const Search = Input.Search;
function Article({ dispatch, list, loading, total, page, title, selectedRowKeys }) {
  function deleteHandler(id) {}
  const columns = [
    {
      title: '标题',
      key: 'title',
      dataIndex: 'title'
    },
    {
      title: '作者',
      key: 'author',
      dataIndex: 'author'
    },
    {
      title: '简述',
      key: 'descption',
      dataIndex: 'descption'
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status'
    },
    {
      title: '操作',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <a href="" onClick={deleteHandler.bind(null, record.id)}>
            删除
          </a>
        </span>
      )
    }
  ];
  const publish = () => {};
  const onSelectChange = selectedRowKeys => {
    dispatch({ type: 'article/selectedChanged', payload: selectedRowKeys });
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };

  const onPageChange = page => {
    dispatch({ type: 'article/fetch', payload: { page } });
  };

  const onSearch = value => {
    dispatch({ type: 'article/fetch', payload: { title: value } });
  };

  return (
    <div className={styles['article']}>
      <div className={styles['article-header']}>
        <Search placeholder="文章名" onSearch={onSearch} style={{ width: 200, float: 'left' }} />
        <Button type="primary" style={{ float: 'right' }}>
          <Link to="/article/create">添加</Link>
        </Button>
        <Button type="primary" style={{ float: 'right', marginRight: 5 }} onClick={publish} disabled={selectedRowKeys.length <= 0} loading={loading}>
          发布
        </Button>
      </div>
      <div className={styles['article-table']}>
        <Table rowSelection={rowSelection} columns={columns} loading={loading} dataSource={list} rowKey={record => record.id} pagination={{ current: page, total: total, onChange: onPageChange }} />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { list, total, page, title, selectedRowKeys } = state.article;
  return {
    loading: state.loading.models.article,
    list,
    total,
    page,
    title,
    selectedRowKeys
  };
}

export default connect(mapStateToProps)(Article);
