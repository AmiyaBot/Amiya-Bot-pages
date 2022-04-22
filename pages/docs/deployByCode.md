---
title: 通过代码部署 Amiya
isShowComments: false
---

## 准备好你的 mirai-api-http

::: tip <br>
若你能自行部署 mirai-console 以及 mirai-api-http，可以跳过本节
:::

[mirai-api-http](https://github.com/project-mirai/mirai-api-http) 是运行 AmiyaBot 的基础，它是 mirai-console 的一个插件。<br>
若你从未了解过 mirai 生态，或者你对编程并不熟悉。短时间内可能难以理解其运作方式。<br>
AmiyaBot 项目提供了简便的部署方法 **mirai-console-setup**，这是 AmiyaBot 为了你能更好地体验本项目而提供的使用方法。本质是 mirai-console-loader
的绿色启动包，不承担使用过程中产生的一切问题，请勿在本项目的任何相关反馈处提出疑问，最终解释权归 [mirai-console-loader](https://github.com/iTXTech/mirai-console-loader)
所有。

- [下载 mirai-console-setup](https://cos.amiyabot.com/tools/mirai-console-setup.zip)
- 解压至任意目录，运行 `start.bat` 初始化
    - 当日志输出 `mirai-console started successfully.` 时即成功初始化。请关闭控制台接着操作。
- 根据文件内的提示修改 `config/Console/AutoLogin.yml` 以下两处

```yaml
account: 你的机器人QQ号
password:
    value: 密码
```

- 检查 mirai-api-http 的配置 `config/net.mamoe.mirai-api-http/setting.yml`，如果你是使用 mirai-console-setup，可以忽略这一步。

```yaml {6,11,12,15,16}
adapters:
    - http
    - ws
debug: false
enableVerify: true
verifyKey: AmiyaBot
singleMode: false
cacheSize: 4096
adapterSettings:
    http:
        host: 0.0.0.0
        port: 8080
        cors: [ * ]
    ws:
        host: 0.0.0.0
        port: 8060
        reservedSyncId: -1
```

- 再次运行 `start.bat`

## 克隆仓库

```bash
git clone https://github.com/AmiyaBot/Amiya-Bot.git
```

## 开始部署

::: danger 注意<br>
运行环境为 `Python 3.7 ~ 3.8`
:::

### 安装 python 依赖

```bash
pip install -r requirements.txt
```

### 首次运行 `amiya.py` 初始化

```bash
python amiya.py
```

初始化会下载资源并生成配置文件 config/config.yaml

### 配置 `config.yaml`

config.yaml 在初始化时已经生成了部分常规配置，若你的 mah 配置与其无差，可不用修改<br>
只需要配置 `管理员QQ号` 和 `机器人QQ号` 即可

```yaml {2,13}
admin:
    accounts: [ 管理员QQ号 ]
baiduCloud:
    apiKey:
    appId:
    enable: false
    secretKey:
httpServer:
    host: 127.0.0.1
    https: false
    port: 5000
miraiApiHttp:
    account: 机器人QQ号
    authKey: AmiyaBot
    host: 127.0.0.1
    port:
        http: 8080
        ws: 8060
test:
    enable: false
    group: [ ]
```

### 再次运行 `amiya.py` 启动

```bash
python amiya.py
```

## 功能测试方式

- 5.0 版本暂不支持离线测试
- 封闭测试
    - 配置封闭测试相关项后启动 Amiya，之后，Amiya 仅会回应封闭测试指定的群

```yaml
test:
    enable: true
    group:
        - <测试群号1>
        - <测试群号2>
        - ...
```
