'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

const db = require('../db');

module.exports = app => {
  const { router, controller } = app;
  //登录
  router.post('/login', controller.login.login);
  //文章
  router.resources('article', '/article', controller.article); //产品添删改查
};
