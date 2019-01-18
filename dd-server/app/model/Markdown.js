'use strict';

/**
 * 文章表
 */

var moment = require('moment');

module.exports = app => {
  const Sequelize = app.Sequelize;
  const { STRING, INTEGER, DATE, TEXT, BLOB } = Sequelize;

  const Markdown = app.model.define(
    'markdown',
    {
      id: {
        type: STRING(16),
        primaryKey: true
      },
      content: {
        type: TEXT,
        validate: {
          notEmpty: true
        },
        allowNull: false,
        comment: '文章内容'
      },
      author: {
        type: STRING,
        validate: {
          notEmpty: true
        },
        allowNull: false,
        comment: '文章作者'
      },
      status: {
        type: INTEGER,
        defaultValue: '1',
        comment: '发布状态：1未发布 | 2已试用 | 3已发布 | 4已下架'
      },
      categoryId: {
        type: INTEGER,
        validate: {
          notEmpty: true
        },
        allowNull: false,
        comment: '文章类别'
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );

  Markdown.sync().then(function(result) {
    console.log('同步Markdown表成功');
  });

  return Markdown;
};
