const Service = require('egg').Service;

class CategoryService extends Service {
  async getAllCategorys() {
    let category = await this.ctx.model.Category.findAll({ where: { status: 1 } });
    return category;
  }

  async getCategorys({ pageSize = this.app.config.pageSize, page = 1, name = '' } = {}) {
    pageSize = Number.parseInt(pageSize);
    page = Number.parseInt(page);
    let categorys = await this.ctx.model.Category.findAndCountAll({
      offset: pageSize * (page - 1),
      limit: pageSize,
      where: {
        ...this.ctx.helper.whereAndLike({ name }),
        status: 1
      }
    });

    return categorys;
  }

  async addCategory({ name }) {
    let category = await this.ctx.model.Category.create({
      id: this.ctx.helper.guid(),
      name,
      status: 1
    });
    return { result: category };
  }

  async delCategory(id) {
    let result = await this.ctx.model.Category.update({ status: 2 }, { where: { id } });
    return { length: result[0] };
  }
}

module.exports = CategoryService;
