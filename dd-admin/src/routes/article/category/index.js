import React from 'react';
import styles from './index.less';
import { connect } from 'dva';
import { Input, Table, Pagination, Popconfirm, Button } from 'antd';
import Create from './create';
const Search = Input.Search;

function Category({ dispatch, list, loading, total, page, visible, confirmLoading, title }) {
  const CreateProps = {
    visible,
    confirmLoading,
    onOk(data) {
      dispatch({ type: 'category/create', payload: { data } });
    },
    onCancel() {
      dispatch({ type: 'category/show', payload: { visible: false } });
    }
  };

  function deleteHandler(id) {
    dispatch({ type: 'category/delete', payload: { id } });
  }

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name'
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

  function pageChangeHandler(page) {
    dispatch({ type: 'category/fetch', payload: { page, username: title } });
  }

  function showModal() {
    dispatch({ type: 'category/show', payload: { visible: true } });
  }

  function onSearchHandler(value) {
    dispatch({ type: 'category/fetch', payload: { username: value } });
  }

  return (
    <div className={styles.category}>
      <div className={styles['category-header']}>
        <Search placeholder="类别名称" onSearch={onSearchHandler} style={{ width: 200, float: 'left' }} />
        <Button type="primary" style={{ float: 'right' }} onClick={showModal}>
          添加
        </Button>
      </div>
      <div className={styles['category-content']}>
        <Table columns={columns} dataSource={list} loading={loading} rowKey={record => record.id} pagination={false} />
        {list.length ? <Pagination className="ant-table-pagination" total={total} current={page} pageSize={10} onChange={pageChangeHandler} /> : ''}
      </div>
      <Create {...CreateProps} />
    </div>
  );
}
function mapStateToProps(state) {
  const { list, total, page, visible, confirmLoading, title } = state.category;
  return {
    loading: state.loading.models.category,
    list,
    total,
    page,
    visible,
    confirmLoading,
    title
  };
}

export default connect(mapStateToProps)(Category);
