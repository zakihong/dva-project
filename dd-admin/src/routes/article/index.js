import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Input, Button, Table, Popconfirm, Row, Col } from 'antd';

import styles from './index.less';
const Search = Input.Search;
function Article({ dispatch, list, loading, total, page, title, selectedRowKeys }) {
  function deleteHandler(id) {
    dispatch({ type: 'article/delete', payload: { id } });
  }
  const columns = [
    {
      title: '标题',
      key: 'title',
      dataIndex: 'title'
    },
    {
      title: '作者',
      key: 'user',
      dataIndex: 'user.nikename'
    },
    {
      title: '类别',
      key: 'category.name',
      dataIndex: 'category.name'
    },
    {
      title: '操作',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <Popconfirm title="Confirm to delete?" onConfirm={deleteHandler.bind(null, record.id)}>
            <a href="">删除</a>
          </Popconfirm>
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
    <Row>
      <Col span={12}>
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
      </Col>
      <Col span={12}>
        <div className={styles['article']}>
          <div className={styles['article-header']}>
            <Search placeholder="文章名" onSearch={onSearch} style={{ width: 200, float: 'left' }} />

            <Button type="primary" style={{ float: 'right', marginRight: 5 }}>
              <Link to="/article/markdown">添加markdown</Link>
            </Button>
            <Button type="primary" style={{ float: 'right', marginRight: 5 }} onClick={publish} disabled={selectedRowKeys.length <= 0} loading={loading}>
              发布
            </Button>
          </div>
          <div className={styles['article-table']}>
            <Table rowSelection={rowSelection} columns={columns} loading={loading} dataSource={list} rowKey={record => record.id} pagination={{ current: page, total: total, onChange: onPageChange }} />
          </div>
        </div>
      </Col>
    </Row>
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
