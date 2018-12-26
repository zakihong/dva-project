const Controller = require('egg').Controller;

class CategoryController extends Controller {
  async getCategorys() {
    const list = await this.ctx.service.category.getAllCategorys();
    this.ctx.success(list);
  }

  async index() {
    const list = await this.ctx.service.category.getCategorys(this.ctx.request.query);
    this.ctx.success(list);
  }

  async create() {
    const { result, msg = '参数不正确！' } = await this.ctx.service.category.addCategory(this.ctx.request.body);
    if (result) {
      this.ctx.success({ id: result.id });
    } else {
      this.ctx.fail(msg);
    }
  }

  //删除数据 delete
  async destroy() {
    const { length = 0, msg = '类别不存在！' } = await this.ctx.service.category.delCategory(this.ctx.params.id);
    if (length) {
      this.ctx.success({ status: 1 });
    } else {
      this.ctx.fail(msg);
    }
  }
}

module.exports = CategoryController;
