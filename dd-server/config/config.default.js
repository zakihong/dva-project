'use strict';

const path = require('path');

module.exports = appInfo => {
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1531883447101_6558';
  config.adminPassword = 'admin';

  // add your config here
  config.middleware = ['checktoken'];
  config.checktoken = {
    ignore: ['/login']
  };

  config.security = {
    csrf: false
  };

  config.pageSize = 10;

  config.sequelize = {
    dialect: 'mysql',
    host: '172.16.6.188',
    password: 'root',
    port: 3306,
    database: 'software-upgrade',
    username: 'root',
    timezone: '+08:00' //东八时区
    // define: { raw: true }
  };

  config.onerror = {
    all(err, ctx) {}
  };

  config.jwt = {
    secret: 'nova-eus-token',
    exp: 360000 //秒
  };

  return config;
};
