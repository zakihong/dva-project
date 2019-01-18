## 介绍

dva 首先是一个基于 redux 和 redux-saga 的数据流方案，然后为了简化开发体验，dva 还额外内置了 react-router
和 fetch,所以也可以理解未一个轻量式的应用框架。

## 特性

- 易学易用，仅有 6 个 api，对 redux 用户尤其友好
- elm 概念，通过 reducers, effects 和 subscriptions 组织 model
- 插件机制，比如 dva-loading 可以自动处理 loading 状态，不用一遍遍地写 showLoading 和 hideLoading
- 支持 HMR，基于 babel-plugin-dva-hmr 实现 components、routes 和 models 的 HMR

## 由来

redux：概念太多，并且 reducer,saga,action 都是分离的文件，编辑成本高，不便于组织业务模型，书写复杂

dva 是基于现有应用架构 (redux + react-router + redux-saga 等)的一层轻量封装，没有引入任何新概念，全部代码不到 100 行。

dva 是 framework，不是 library，类似 emberjs，会很明确地告诉你每个部件应该怎么写

另外，除了 react 和 react-dom 是 peerDependencies 以外，dva 封装了所有其他依赖

## 快速上手

### 安装 dva-cli

`$ npm install dva-cli -g`

`$ dva -v`

`dva-cli version 0.9.1`

### 创建新应用

安装完 dva-cli 之后，就可以在命令行里访问到 dva 命令。现在，你可以通过 dva new 创建新应用。

`$ dva new dva-quickstart`

然后我们 cd 进入 dva-quickstart 目录，并启动开发服务器：

`$ npm start`

### 使用 antd

通过 npm 安装 antd 和 babel-plugin-import
编辑 .webpackrc，使 babel-plugin-import 插件生效。

```
  {
    "extraBabelPlugins": [
      ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
    ]
  }
```

更多 .webpackrc 的配置详见 [roadhog#配置](https://github.com/sorrycc/roadhog/blob/master/README_zh-cn.md)
