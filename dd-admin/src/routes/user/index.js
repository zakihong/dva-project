import React from 'react';
import { connect } from 'dva';
import { Input, Table, Pagination, Popconfirm, Button, Avatar } from 'antd';
import styles from './index.less';
import Create from './create';
const Search = Input.Search;
function User({ dispatch, list, loading, total, page, visible, confirmLoading, imageUrl, title }) {
  const CreateProps = {
    imageUrl,
    visible,
    confirmLoading,
    onOk(data) {
      dispatch({ type: 'user/create', payload: { data } });
    },
    onCancel() {
      dispatch({ type: 'user/show', payload: { visible: false } });
    },
    onheadPortraitChange(imageUrl) {
      dispatch({ type: 'user/headPortrait', payload: { imageUrl } });
    }
  };

  function deleteHandler(id) {
    dispatch({ type: 'user/delete', payload: { id } });
  }

  function pageChangeHandler(page) {
    dispatch({ type: 'user/fetch', payload: { page, username: title } });
  }

  function showModal() {
    dispatch({ type: 'user/show', payload: { visible: true } });
  }

  function onSearchHandler(value) {
    dispatch({ type: 'user/fetch', payload: { username: value } });
  }

  const columns = [
    {
      title: '头像',
      dataIndex: 'photo',
      key: 'photo',
      render: text => <Avatar src={text} />
    },
    {
      title: '账号',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="">{text}</a>
    },
    {
      title: '昵称',
      dataIndex: 'nikename',
      key: 'nikename'
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

  return (
    <div className={styles.user}>
      <div className={styles['user-header']}>
        <Search placeholder="用户名" onSearch={onSearchHandler} style={{ width: 200, float: 'left' }} />
        <Button type="primary" style={{ float: 'right' }} onClick={showModal}>
          添加
        </Button>
      </div>
      <div className={styles['user-content']}>
        <Table columns={columns} dataSource={list} loading={loading} rowKey={record => record.id} pagination={false} />
        <Pagination className="ant-table-pagination" total={total} current={page} pageSize={10} onChange={pageChangeHandler} />
      </div>
      <Create {...CreateProps} />
    </div>
  );
}

function mapStateToProps(state) {
  const { list, total, page, visible, confirmLoading, imageUrl, title } = state.user;
  return {
    loading: state.loading.models.user,
    list,
    total,
    page,
    visible,
    confirmLoading,
    imageUrl,
    title
  };
}

export default connect(mapStateToProps)(User);
