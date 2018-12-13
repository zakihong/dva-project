import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Input, Row, Col } from 'antd';
import styles from './index.less';
const Search = Input.Search;
function User(user) {
  return (
    <div className={styles.user}>
      <div className={styles['user-header']}>
        <Search placeholder="用户名" onSearch={value => console.log(value)} style={{ width: 200 }} />
      </div>
      <div className={styles['user-content']}>
        <div className={styles['list']}>
          <div className={styles['list-header']}>
            <Row className={styles['row-height']}>
              <Col className={styles['row-height']} span={3}>
                用户名
              </Col>
              <Col className={styles['row-height']} span={4}>
                邮箱地址
              </Col>
              <Col className={styles['row-height']} span={5}>
                最后一次登录时间
              </Col>
              <Col className={styles['row-height']} span={6}>
                登录次数
              </Col>
              <Col className={styles['row-height']} span={6}>
                操作
              </Col>
            </Row>
          </div>
          <div className={styles['list-container']} />
          <div className={styles['list-footer']} />
        </div>
      </div>
    </div>
  );
}

User.propTypes = {
  user: PropTypes.object
};

export default connect(({ user }) => ({ User }))(User);
