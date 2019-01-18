const Controller = require('egg').Controller;

class MarkdownController extends Controller {
  async create() {
    const { result, msg = '参数不正确！' } = await this.ctx.service.markdown.add(this.ctx.request.body);
    if (result) {
      this.ctx.success({ id: result.id });
    } else {
      this.ctx.fail(msg);
    }
  }

  async show() {
    const { result, msg = '产品不存在！' } = await this.ctx.service.markdown.get(this.ctx.params.id);
    if (result) {
      this.ctx.success({ result });
    } else {
      this.ctx.fail(msg);
    }
  }
}

module.exports = MarkdownController;
