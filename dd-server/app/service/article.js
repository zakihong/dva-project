const Service = require('egg').Service;

class ArticleService extends Service {
  async getArticles({ pageSize = this.app.config.pageSize, pageNum = 1, status } = {}) {
    let result = { count: 0, rows: [] };
    pageSize = Number.parseInt(pageSize);
    pageNum = Number.parseInt(pageNum);

    let articles = await this.ctx.model.Article.findAndCountAll({
      offset: pageSize * (pageNum - 1),
      limit: pageSize,
      where: {
        status: 1
      }
    });
    result.count = articles.count;

    return result;
  }
}

module.exports = ArticleService;
