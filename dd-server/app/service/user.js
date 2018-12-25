const Service = require('egg').Service;

class UserService extends Service {
  async getUsers({ pageSize = this.app.config.pageSize, page = 1, userId, username = '' } = {}) {
    let result = { count: 0, rows: [] };
    pageSize = Number.parseInt(pageSize);
    page = Number.parseInt(page);
    let users = await this.ctx.model.User.findAndCountAll({
      offset: pageSize * (page - 1),
      limit: pageSize,
      order: [['createdAt', 'DESC']],
      where: {
        ...this.ctx.helper.whereAndLike({ nikename: username }),
        id: {
          $notIn: [userId]
        }
      }
    });

    users.rows.forEach(user => {
      result.rows.push({
        name: user.username,
        id: user.id,
        nikename: user.nikename,
        photo: user.photo
      });
    });
    result.count = users.count;

    return result;
  }

  async addUser({ username, password, photo, nikename }) {
    let user = await this.ctx.model.User.create({
      id: this.ctx.helper.guid(),
      username,
      password,
      photo,
      nikename
    });
    return { result: user };
  }
}

module.exports = UserService;
