const Subscription = require('egg').Subscription;

class ClearUpload extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: '1d', // 一天执行一次
      type: 'all' // 指定所有的 worker 都需要执行
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    this.ctx.service.file.emptyDir('temp');
  }
}

module.exports = ClearUpload;
