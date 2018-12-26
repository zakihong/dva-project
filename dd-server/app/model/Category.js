'use strict';

/**
 * 文章类别表
 */

module.exports = app => {
  const Sequelize = app.Sequelize;
  const { STRING, INTEGER } = Sequelize;

  const Category = app.model.define(
    'category',
    {
      id: {
        type: STRING(16),
        primaryKey: true
      },
      name: {
        type: STRING(50),
        validate: {
          notEmpty: true
        },
        allowNull: false,
        comment: '文章标题'
      },
      status: {
        type: INTEGER,
        defaultValue: '1',
        comment: ''
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );

  Category.sync().then(function(result) {
    console.log('同步Category表成功');
  });

  return Category;
};
