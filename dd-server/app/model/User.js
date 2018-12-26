'use strict';

var moment = require('moment');

module.exports = app => {
  const Sequelize = app.Sequelize;
  const { STRING, INTEGER, DATE } = Sequelize;
  const User = app.model.define(
    'user',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: STRING(30),
        validate: {
          notEmpty: {
            msg: '账号不能为空！'
          }
        },
        allowNull: false,
        comment: '账号'
      },
      password: {
        type: STRING(32),
        validate: {
          notEmpty: true
        },
        allowNull: false,
        comment: '密码'
      },
      photo: {
        field: 'photo',
        type: STRING,
        comment: '产品示意图'
      },
      nikename: {
        type: STRING(30),
        allowNull: true,
        comment: '昵称'
      },
      status: {
        type: INTEGER,
        defaultValue: '1',
        comment: ''
      },
      createdAt: {
        field: 'created_at',
        type: DATE,
        get(val) {
          let time = this.getDataValue(val);
          if (time) {
            time = moment(time).format('YYYY-MM-DD HH:mm:ss');
          }
          return time || '';
        },
        set(val) {
          return this.setDataValue(val, Sequelize.NOW);
        }
      },
      updatedAt: {
        field: 'updated_at',
        type: DATE,
        get(val) {
          let time = this.getDataValue(val);
          if (time) {
            time = moment(time).format('YYYY-MM-DD HH:mm:ss');
          }
          return time || '';
        },
        set(val) {
          return this.setDataValue(val, Sequelize.NOW);
        }
      }
    },
    {
      freezeTableName: true
    }
  );
  User.sync().then(function(result) {
    console.log('同步User表成功');
  });

  return User;
};
