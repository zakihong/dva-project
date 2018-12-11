const Service = require('egg').Service;
const md5 = require('md5');

class LoginService extends Service {
  async login({ username, password }) {
    let result = await this.ctx.model.User.findOne({
      where: { username, password: password }
    });
    return result;
  }
}

module.exports = LoginService;
