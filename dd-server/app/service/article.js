const Service = require('egg').Service;

class ArticleService extends Service {
  async getArticles({ pageSize = this.app.config.pageSize, page = 1, title } = {}) {
    pageSize = Number.parseInt(pageSize);
    page = Number.parseInt(page);

    let articles = await this.ctx.model.Article.findAndCountAll({
      offset: pageSize * (page - 1),
      limit: pageSize,
      where: {
        ...this.ctx.helper.whereAndLike({ title }),
        status: 1
      }
    });

    return articles;
  }

  async addArticle({ title, descption, content, pic, categoryId }) {
    let article = await this.ctx.model.Article.create({
      id: this.ctx.helper.guid(),
      title,
      descption,
      content,
      pic,
      categoryId,
      author: '可乐三块五',
      status: 1
    });
    return { result: article };
  }
}

module.exports = ArticleService;
