const Controller = require('egg').Controller;

class PackageController extends Controller {
  //查询所有数据 get
  async index() {
    const list = await this.ctx.service.package.getPackages(this.ctx.request.query);
    this.ctx.success(list);
  }

  //新增数据 post
  async addPackage() {
    const { result, msg = '参数不正确！' } = await this.ctx.service.package.addPackage(this.ctx.request.body);
    if (result) {
      this.ctx.success({ id: result.id });
    } else {
      this.ctx.fail(msg);
    }
  }

  //更新数据 put
  async update() {
    const len = await this.ctx.service.package.updatePackage(this.ctx.params.id, this.ctx.request.body);
    if (len) {
      this.ctx.success({ status: 1 });
    } else {
      this.ctx.fail('Package不存在！');
    }
  }

  //删除数据 delete
  async destroy() {
    const len = await this.ctx.service.package.delPackage(this.ctx.params.id);
    if (len) {
      this.ctx.success({ status: 1 });
    } else {
      this.ctx.fail('Package不存在！');
    }
  }
}

module.exports = PackageController;
