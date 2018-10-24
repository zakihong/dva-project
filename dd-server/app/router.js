'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

const db = require('../db');

module.exports = app => {
  const { router, controller } = app;

  //登录
  router.post('/login', controller.login.login);

  //版本
  router.resources('productPackage', '/packages', controller.package);
  router.post('/addPackage', controller.package.addPackage);

  // app.model.User.bulkCreate(db.user);
  // app.model.Role.bulkCreate(db.role);
  // app.model.Dict.bulkCreate(db.dict);
  // app.model.Config.bulkCreate(db.config);
  // app.model.Acl.bulkCreate(db.acl);
};
