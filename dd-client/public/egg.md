## Egg.js 是什么？

egg.js 是阿里推出的基于 koa 的 node 开发框架。
egg 使用 async function 语法糖，在 Promise 的基础上，结合 Generator 提供的切换上下文能力，方便我们用同步写法编写异步代码。

## Egg 的特性

- 提供基于 Egg 定制上层框架的能力
- 高度可扩展的插件机制
- 内置多进程管理
- 基于 Koa 开发，性能优异
- 框架稳定，测试覆盖率高
- 渐进式开发

## 快速入门

```
$ npm i egg-init -g
$ egg-init egg-example --type=simple
$ cd egg-example
$ npm i
```

启动项目

```
$ npm run dev
$ open localhost:7001
```

### 项目结构

    │─app
    │  └─controller
    |  |    └─example.js
    |  |
    |  └─extend
    │  |    └─context.js
    |  |    └─helper.js
    |  |
    |  └─middleware
    │  |    └─context.js
    |  |    └─helper.js
    |  |
    |  └─model
    │  |    └─example.js
    |  |
    |  └─public
    │  |    └─images
    |  |
    |  └─schedule
    │  |    └─example.js
    |  |
    |  └─service
    |  |    └─example.js
    |  |
    |  ─router.js
    |
    ├─config
    │      config.default.js
    │      plugin.js
    ├─logs
    │
    ├─app.js
    |
    ├─db.js
    |─package.json

### 编写 controller

```
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const list = await this.ctx.service.user.getUser(this.ctx.request.query);
    this.ctx.success(list);
  }
}

module.exports = HomeController;
```

按照类的方式编写 Controller，不仅可以让我们更好的对 Controller 层代码进行抽象（例如将一些统一的处理抽象成一些私有方法），还可以通过自定义 Controller 基类的方式封装应用中常用的方法。每一个 Controller 都是一个 async function，它的入参为请求的上下文 Context 对象的实例，通过它我们可以拿到框架封装好的各种便捷属性和方法

### 编写服务

```
const Service = require('egg').Service;

class UserService extends Service {
  async find(uid) {
    const user = await this.ctx.db.query('select * from user where uid = ?', uid);
    return user;
  }
}

module.exports = UserService;
```

### 编写路由

```
module.exports = app => {
  const { router, controller } = app;
  //登录
  router.post('/login', controller.login.login);
  //用户
  router.resources('user', '/user', controller.user);
  router.get('user', '/users', controller.user.getUsers);
};
```

### 定时任务

```
const Subscription = require('egg').Subscription;

class ClearUpload extends Subscription {
  static get schedule() {
    return {
      interval: '1d', // 一天执行一次
      type: 'all' // 指定所有的 worker 都需要执行
    };
  }

  async subscribe() {
    this.ctx.service.file.emptyDir('temp');
  }
}

module.exports = ClearUpload;
```

### 插件机制

- mysql2
- egg-sequelize

## 相关资料

- [Egg.js 官方文档](https://eggjs.org/zh-cn/intro/index.html)
- [sequelize 教程](https://itbilu.com/nodejs/npm/VkYIaRPz-.html)
- [KOA 教程](https://koa.bootcss.com/#introduction)
- [EGG 案例](https://github.com/zakihong/dva-project/tree/master/dd-server)
