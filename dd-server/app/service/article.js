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
      },
      include: [
        {
          model: this.ctx.app.model.User,
          as: 'user'
        },
        {
          model: this.ctx.app.model.Category,
          as: 'category'
        }
      ]
    });

    return articles;
  }

  async addArticle({ title, descption, content, pic, categoryId, author }) {
    let article = await this.ctx.model.Article.create({
      id: this.ctx.helper.guid(),
      title,
      descption,
      content,
      pic,
      categoryId,
      author,
      status: 1
    });
    return { result: article };
  }

  async delArticle(id) {
    let result = await this.ctx.model.Article.update({ status: 2 }, { where: { id } });
    return { length: result[0] };
  }
}

module.exports = ArticleService;
