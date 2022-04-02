---
title: 使用后台管理系统
isShowComments: false
---

后台管理系统，即 [Amiya-Bot console](https://github.com/AmiyaBot/Amiya-Bot-console)

::: tip <br>
Amiya-Bot console 会在启动时自动下载并按照配置在本地部署，可直接通过浏览器访问
:::

## 配置

检查 config.yaml 的配置项。Amiya 默认配置了全局 IP `127.0.0.1` 以及 `5000` 端口。修改后重启 Amiya 生效

```yaml
httpServer:
    host: 127.0.0.1
    port: 5000
    https: false
```

:::tip 提示<br>
如果你的部署设备有公网 IP，配置 `0.0.0.0` 可让你的 console 通过公网 IP 在外网访问，但这可能有一些安全风险。
:::

1. 注册初始管理员。在 Amiya 私聊里用 `注册管理员` + `QQ号` 可以增加管理员账号
    - 如果账号是 config.yaml 里配置的 `admin.accounts` 的配置值，则为超级管理员
    - 超级管理员拥有更高的操作权限，权限等敏感操作仅超级管理员可用
      :::warning 注意<br>
      你必须先注册管理员才能使用 Amiya-Bot console，账号的初始密码将在注册时发送给你。
      :::

2. 用浏览器打开配置的 url，如果是默认配置，则直接访问 `127.0.0.1:5000`
3. 登录账号并开始管理你的 Amiya

## 操作指南

> 敬请期待...
