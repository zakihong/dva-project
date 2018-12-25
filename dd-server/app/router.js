'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

const db = require('../db');

module.exports = app => {
  const { router, controller } = app;
  //登录
  router.post('/login', controller.login.login);
  //用户
  router.resources('user', '/user', controller.user);
  //上传头像
  router.post('/upload/user', controller.file.uploadUserHead);
  //文章
  router.resources('article', '/article', controller.article); //产品添删改查
  //上传图片
  router.post('/upload/editor', controller.file.uploadEditorImg);

  //上传图片（文章缩图）
  router.post('/upload/article/photo', controller.file.uploadArticleImg);
};
