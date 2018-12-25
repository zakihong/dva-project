const fs = require('fs');
const path = require('path');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const formidable = require('formidable');
const Service = require('egg').Service;

class FileService extends Service {
  async parse(req) {
    const form = new formidable.IncomingForm();
    form.uploadDir = './app/public/temp'; //设置临时文件存放目录
    form.maxFileSize = 2 * 1024 * 1024 * 1024; //最大2GB
    return new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        resolve({ fields, files });
      });
    });
  }

  async uploadEditorImg() {
    let result = '';
    let extarParams = await this.parse(this.ctx.req);
    let file = extarParams.files.img;

    if (file) {
      const rs = fs.createReadStream(file.path);
      const fileName = Date.now() + '' + Number.parseInt(Math.random() * 10000) + path.extname(file.name);
      // 创建文件夹;
      const folderPath = path.join(this.config.baseDir, 'app/public/upload', 'editor');
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
      }

      // 生成写入路径
      const target = path.join(this.config.baseDir, 'app/public/upload/editor', fileName);

      // 写入流
      const ws = fs.createWriteStream(target);
      try {
        // 写入文件
        await awaitWriteStream(rs.pipe(ws));
        result = this.config.apihost + '/upload/editor/' + fileName;
      } catch (err) {
        // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
        await sendToWormhole(rs);
        throw err;
      }
    }
    return result;
  }

  async uploadArticleImg() {
    let result = '';
    let extarParams = await this.parse(this.ctx.req);
    let file = extarParams.files.file;

    if (file) {
      const rs = fs.createReadStream(file.path);
      const fileName = Date.now() + '' + Number.parseInt(Math.random() * 10000) + path.extname(file.name);
      // 创建文件夹;
      const folderPath = path.join(this.config.baseDir, 'app/public/upload', 'article');
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
      }

      // 生成写入路径
      const target = path.join(this.config.baseDir, 'app/public/upload/article', fileName);

      // 写入流
      const ws = fs.createWriteStream(target);
      try {
        // 写入文件
        await awaitWriteStream(rs.pipe(ws));
        result = this.config.apihost + '/upload/article/' + fileName;
      } catch (err) {
        // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
        await sendToWormhole(rs);
        throw err;
      }
    }
    return result;
  }

  async uploadUserHead() {
    let result = '';
    let extarParams = await this.parse(this.ctx.req);
    let file = extarParams.files.file;

    if (file) {
      const rs = fs.createReadStream(file.path);
      const fileName = Date.now() + '' + Number.parseInt(Math.random() * 10000) + path.extname(file.name);
      // 创建文件夹;
      const folderPath = path.join(this.config.baseDir, 'app/public/upload', 'user');
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
      }

      // 生成写入路径
      const target = path.join(this.config.baseDir, 'app/public/upload/user', fileName);

      // 写入流
      const ws = fs.createWriteStream(target);
      try {
        // 写入文件
        await awaitWriteStream(rs.pipe(ws));
        result = this.config.apihost + '/upload/user/' + fileName;
      } catch (err) {
        // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
        await sendToWormhole(rs);
        throw err;
      }
    }
    return result;
  }
}

module.exports = FileService;
