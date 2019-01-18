const Service = require('egg').Service;

class MarkdownService extends Service {
  async add({ content, author }) {
    let article = await this.ctx.model.Markdown.create({
      id: this.ctx.helper.guid(),
      content,
      categoryId: 'de2519c7c284',
      author,
      status: 1
    });
    return { result: article };
  }

  async get(id) {
    let md = await this.ctx.model.Markdown.findById(id);
    return md;
  }
}

module.exports = MarkdownService;
