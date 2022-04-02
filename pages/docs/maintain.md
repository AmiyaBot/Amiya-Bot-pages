---
title: 日常维护
isShowComments: false
---

## 维护数据

::: tip <br>
推荐使用 [Amiya-Bot-console](https://github.com/AmiyaBot/Amiya-Bot-console) 获得更好的可视化维护界面，否则部分数据维护需要手动编辑数据库<br>
使用方法请阅读 [说明文档](/docs/amiyaConsole)
:::

### 用户数据

Amiya 带有 `自动维护` 功能，会在每天凌晨4点执行以下操作

- 重置所有用户的签到状态和心情值
- 清空一定时间前的历史消息

::: warning <br>
如果你的 Amiya 因为某些原因错过了维护时间，你可能需要进行手动维护。<br>
方法是：私聊 Amiya 发送 `维护`
:::

### 卡池数据

卡池数据推荐到 Amiya-Bot-console 进行维护。也可以通过私聊命令 `同步卡池` 获取 Demo 的卡池数据。

### 明日方舟更新

Amiya 在每次启动时都会执行 `更新检查`。如需更新则会下载新数据和图片资源，请保持良好的网络环境下启动。

## 百度云 API

自然语言处理方法和公招图像识别需要调用 [百度智能云](https://cloud.baidu.com/) 的接口，如需使用请自行申请并配置 `config.yaml`

```yaml
baiduCloud:
    enable: true
    appId: 21*****7
    apiKey: MM************GnL5
    secretKey: XR*********************U7UM
```
