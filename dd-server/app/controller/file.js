const Controller = require('egg').Controller;

class FileController extends Controller {
  async uploadEditorImg() {
    const { ctx, app } = this;
    const result = await ctx.service.file.uploadEditorImg();
    ctx.success(result);
  }

  async uploadArticleImg() {
    const { ctx, app } = this;
    const result = await ctx.service.file.uploadArticleImg();
    ctx.success(result);
  }

  async uploadUserHead() {
    const { ctx, app } = this;
    const result = await ctx.service.file.uploadUserHead();
    ctx.success(result);
  }
}

module.exports = FileController;
