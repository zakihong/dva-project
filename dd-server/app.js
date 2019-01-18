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
    const Article = app.model.Article;
    const Category = app.model.Category;
    const User = app.model.User;
    const Markdown = app.model.Markdown;
    app.beforeStart(async () => {
      Article.belongsTo(User, { as: 'user', foreignKey: 'author' });
      Article.belongsTo(Category, { as: 'category', foreignKey: 'categoryId' });
      await app.model.sync();
    });
    app.beforeStart(async () => {
      Markdown.belongsTo(Category, { as: 'category', foreignKey: 'categoryId' });
      await app.model.sync();
    });
  });
};
