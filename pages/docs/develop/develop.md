---
title: 开发文档
isShowComments: false
---

::: danger 敬请留意
Amiya-Bot 的 6.0 版本正在开发中，全新的 6.0 版本与现有架构和逻辑有较大差异，从 v5 版本的框架和功能近乎一体改为框架部分独立存在，而现有功能通过插件实现。若想了解更多信息，请留意 [V6-dev](https://github.com/AmiyaBot/Amiya-Bot/tree/V6-dev) 分支及框架仓库 [Amiya-Bot-core](https://github.com/AmiyaBot/Amiya-Bot-core)。<br>
有任何疑问可以加入项目的 [官方频道](https://www.amiya.cn/blog/official.html) 或致信 `support@amiya.cn`。
:::

## 前言

AmiyaBot 的核心是由 Python 编写的自主研发的框架，旨在让开发人员无需顾虑通讯和消息的互相转换，从而更专注于业务逻辑的开发。<br>
在开始之前，你应该先完成 [代码部署](/docs/deployByCode) 以便继续操作。

    一切就绪的话，无需多言，马上开始。

## 文档索引

- 基础开发文档
    - [功能函数的注册](/docs/develop/funcsRegister)
    - [接收消息：Message对象](/docs/develop/messageObject)
    - [发送消息：Chain对象](/docs/develop/chainObject)
    - [注册事件响应](/docs/develop/eventsRegister)
    - [注册定时事件](/docs/develop/tasksRegister)
- 工具函数文档

## 主要目录结构

以下是主要的目录和文件，对于功能开发来说，你无需关心更深的实现。**专注于业务逻辑**是 AmiyaBot 的主旨。

``` {12,16}
.
├── config
│   ├── private
│   └── config.yaml (运行时自动生成)
│
├── core
│   ├── database
│   ├── network
│   ├── resource
│   │   ├── arknightsGameData
│   │   └── botResource.py
│   ├── bot.py
│   ├── log.py
│   └── util.py
│
├── functions
│   └── __init__.py
│
└── amiya.py
```

- `amiya.py`：入口启动文件
- `core/bot.py`：所有功能实现基础模块
- `core/log.py`：日志模块
- `core/util.py`：辅助函数工具库
- `core/resource`：资源调用模块
- `core/network`：网络调用模块
- `core/database`：数据库调用模块
- `config`：配置文件目录

## 系统设计图

<img style="width: 100%" :src="$withBase('/AmiyaBotDesign.svg')" alt="AmiyaBotDesign">
