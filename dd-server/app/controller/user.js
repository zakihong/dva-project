const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    const list = await this.ctx.service.user.getUsers(this.ctx.request.query);
    this.ctx.success(list);
  }

  async create() {
    const { result, msg = '参数不正确！' } = await this.ctx.service.user.addUser(this.ctx.request.body);
    if (result) {
      this.ctx.success({ id: result.id });
    } else {
      this.ctx.fail(msg);
    }
  }
}

module.exports = UserController;
