const Service = require('egg').Service;

class PackageService extends Service {
  /**
   *  查询
   * @param {pageSize} 每页显示条数
   * @param {pageNum} 页码
   * @param {productId} 产品Id
   * @param {version} 版本号
   * @param {status} 版本状态
   * @param {stage} 版本阶段
   * @param {publishState} 发布状态
   * @param {updatedAt} 更新时间
   */
  async getPackages({ pageSize = this.app.config.pageSize, pageNum = 1, productId, version, status, stage, publishState, updatedStart, updatedEnd } = {}) {
    pageSize = Number.parseInt(pageSize);
    pageNum = Number.parseInt(pageNum);
    status = Number.parseInt(status || 1);
    let packages = await this.ctx.model.ProductPackage.findAndCountAll({
      offset: pageSize * (pageNum - 1),
      order: [['updatedBy', 'ASC']],
      limit: pageSize,
      where: {
        status,
        updatedAt: { ...this.ctx.helper.whereDate({ start: updatedStart, end: updatedEnd }) },
        ...this.ctx.helper.whereFilter({ productId, version, status, stage, publishState })
      },
      include: [{ model: this.ctx.app.model.Product, as: 'product' }, { model: this.ctx.app.model.User, as: 'uuser' }, { model: this.ctx.app.model.User, as: 'cuser' }],
      distinct: true
    });
    let rows = [];
    packages.rows.forEach(_package => {
      rows.push({
        createdAt: _package.createdAt,
        updatedAt: _package.updatedAt,
        id: _package.id,
        version: _package.version,
        url: _package.url,
        versionLog: _package.versionLog,
        stage: this.app.dict[_package.stage],
        publishState: this.app.dict[_package.publishState],
        size: _package.size,
        status: _package.status,
        productName: _package.product.name,
        updateUser: _package.uuser.name,
        createdUser: _package.cuser.name
      });
    });
    packages.rows = rows;
    return packages;
  }
  /**
   * 新增版本
   * @param {version} 版本
   * @param {productId} 产品Id
   * @param {versionLog} 版本日志
   * @param {stage} 阶段：软件--1开发版 2beta版 3正式版 | 硬件--11原型机 12研发样机 13试产 14销售样机 15量产 16停产
   * @param {publishState} 发布状态：1未发布 | 2已试用 | 3已发布 | 4已下架
   * @param {url} 存放路径
   * @param {size} 版本文件大小
   */
  async addPackage({ version, productId, versionLog, stage, publishState, url, size }) {
    if (await this.ctx.model.ProductPackage.findOne({ where: { version: version, productId: productId, status: { $in: [0, 1] } } })) {
      return { msg: 'version重复' };
    }
    let _package = await this.ctx.model.ProductPackage.create({
      version,
      productId,
      versionLog,
      stage,
      size,
      publishState,
      createdBy: this.ctx.userId,
      updatedBy: this.ctx.userId,
      url
    });

    return { result: _package };
  }
  /**
   * 修改版本包
   * @param {id} id
   * @param {version} 版本
   * @param {productId} 产品Id
   * @param {versionLog} 版本日志
   * @param {stage} 阶段：软件--1开发版 2beta版 3正式版 | 硬件--11原型机 12研发样机 13试产 14销售样机 15量产 16停产
   * @param {publishState} 发布状态：1未发布 | 2已试用 | 3已发布 | 4已下架
   * @param {url} 存放路径
   * @param {size} 版本文件大小
   */
  async updatePackage(id, { version, productId, versionLog, stage, publishState, url, size }) {
    if (await this.ctx.model.ProductPackage.findById(id)) {
      let result = await this.ctx.model.ProductPackage.update({ version, productId, versionLog, stage, publishState, url, size, updatedBy: this.ctx.userId }, { where: { id } });
      return result.length;
    }

    return { msg: '没有此数据' };
  }

  /**
   * 删除版本包
   * @param {id} id
   */
  async delPackage(id) {
    if (await this.ctx.model.ProductPackage.findById(id)) {
      let result = await this.ctx.model.ProductPackage.update({ status: 2 }, { where: { id } });
      return result.length;
    }

    return { msg: '没有此数据' };
  }
}

module.exports = PackageService;
