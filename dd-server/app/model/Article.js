'use strict';

/**
 * 文章表
 */

var moment = require('moment');

module.exports = app => {
  const Sequelize = app.Sequelize;
  const { STRING, INTEGER, DATE, TEXT, BLOB } = Sequelize;

  const Article = app.model.define(
    'article',
    {
      id: {
        type: STRING(16),
        primaryKey: true
      },
      title: {
        type: STRING(50),
        validate: {
          notEmpty: true
        },
        allowNull: false,
        comment: '文章标题'
      },
      descption: {
        type: STRING(200),
        validate: {
          notEmpty: true
        },
        allowNull: false,
        comment: '文章描述'
      },
      content: {
        type: TEXT,
        validate: {
          notEmpty: true
        },
        allowNull: false,
        comment: '文章内容'
      },
      pic: {
        type: STRING,
        validate: {
          notEmpty: true
        },
        allowNull: false,
        comment: '文章图片'
      },
      author: {
        type: STRING,
        validate: {
          notEmpty: true
        },
        allowNull: false,
        comment: '文章作者'
      },
      viewCount: {
        field: 'view-count',
        type: INTEGER,
        comment: '文章查看次数'
      },
      status: {
        type: INTEGER,
        defaultValue: '1',
        comment: '发布状态：1未发布 | 2已试用 | 3已发布 | 4已下架'
      },
      categoryId: {
        field: 'category-id',
        type: INTEGER,
        validate: {
          notEmpty: true
        },
        allowNull: false,
        comment: '文章类别'
      },
      publishTime: {
        field: 'publish-time',
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
        },
        comment: '发布时间'
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );

  Article.sync().then(function(result) {
    console.log('同步Article表成功');
  });

  return Article;
};
