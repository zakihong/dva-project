'use strict';

const path = require('path');

module.exports = appInfo => {
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1531883447101_6558';
  config.adminPassword = 'admin';

  config.security = {
    csrf: false
  };

  config.pageSize = 10;

  config.sequelize = {
    dialect: 'mysql',
    host: '172.16.42.206',
    password: 'root',
    port: 3306,
    database: 'rrs',
    username: 'root',
    timezone: '+08:00', //东八时区
    logging: true
  };

  config.static = {
    prefix: '/',
    dir: path.join(appInfo.baseDir, 'app/public')
  };

  config.onerror = {
    all(err, ctx) {}
  };

  config.apihost = 'http://172.16.42.206:7001';

  config.cluster = {
    listen: {
      path: '',
      port: 7001,
      hostname: '0.0.0.0'
    }
  };

  return config;
};
