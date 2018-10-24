'use strict';

// had enabled by egg
// exports.static = true;
// exports.nunjucks = {
//   enable: true,
//   package: 'egg-view-nunjucks'
// };

exports.validate = {
  enable: true,
  package: 'egg-validate'
};

exports.sequelize = {
  enable: true,
  package: 'egg-sequelize'
};

// exports.assets = {
//   enable: true,
//   package: 'egg-view-assets'
// };

// exports.nunjucks = {
//   enable: true,
//   package: 'egg-view-nunjucks'
// };

exports.jwt = {
  enable: true,
  package: 'egg-jwt'
};
