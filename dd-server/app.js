const db = require('./db');

module.exports = app => {
  app.on('error', (err, ctx) => {
    let errMsg = '';
    if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
      errMsg = err.errors.map(item => item.message);
    } else {
      errMsg = err.message;
    }
    ctx.fail(errMsg);
  });

  app.on('request', ctx => {
    console.log(`--------------${ctx.request.method}请求${ctx.request.url}--------------`);
  });

  app.on('server', server => {
    app.beforeStart(async () => {
      await app.model.sync();
    });
  });
};
