const Controller = require('egg').Controller;

class ArticleController extends Controller {
  /**
   * 查询文章列表
   */
  async index() {
    const list = await this.ctx.service.article.getArticles(this.ctx.request.query);
    this.ctx.success(list);
  }
}

module.exports = ArticleController;
