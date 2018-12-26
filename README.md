# dva project

The Dva project base template for dva-cli

## 介绍

  该工程的客户端和后台管理系统以dva-cli构建，服务端以egg-cli构建。期望打造一套基于react，ant-design，dva，egg.js于一体的、后台管理系统和前台系统。
  
项目集成依赖

- "clasnames": "^2.2.6",
- "dva": "^2.4.0",
- "react-draft-wysiwyg": "^1.12.13",
- "redux-logger": "^3.0.6",
- "rc-queue-anim": "^1.6.6",
- "draftjs-to-html": "^0.8.4",
- "egg": "^2.2.1",
- "await-stream-ready": "^1.0.1",
- "egg-sequelize": "^4.0.7",
- "formidable": "^1.2.1",
- "mysql2": "^1.6.1",
- "stream-wormhole": "^1.1.0"
- "node-pinyin": "^0.2.3",
- "egg-jwt": "^3.1.2"

## 构建工具集成：

- vue-cli  egg-init 

- airbnb 基础上进行少许改进。

### 以上依赖均经过项目验证的稳定版本。如果后续升级会进行跟进。升级的前提是依赖是稳定版本。


## 项目开发

### 后台
cd dd-admin
npm install
npm run start

### 服务端
cd dd-service
npm install
npm run dev

### 客户端
cd dd-client
npm install
npm run start

