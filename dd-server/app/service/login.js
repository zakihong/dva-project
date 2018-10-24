const Service = require('egg').Service;
const md5 = require('md5');

class LoginService extends Service {
  async login({ username, password }) {
    let result = await this.ctx.model.User.findOne({
      attributes: {
        exclude: ['created_at', 'createdAt', 'updated_at', 'updatedAt', 'password', 'remark', 'status', 'created_by', 'createdBy', 'updated_by', 'updatedBy']
      },
      where: { username, password: md5(password), status: 1 }
    });
    return result;
  }
}

module.exports = LoginService;
