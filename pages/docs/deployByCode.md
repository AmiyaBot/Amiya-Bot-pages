---
title: 通过代码部署 Amiya
isShowComments: false
---

::: danger <span style="font-size: 20px">环境以及操作系统支持</span> <br>

- 仅支持 <span style="color: red">Windows 7</span> 以上系统
- 仅支持 <span style="color: red">MacOS 10.14 Mojave</span> 以上系统
- Linux 系统仅支持 <span style="color: red">Ubuntu 18.04</span> 以及 <span style="color: red">Ubuntu 20.04</span>

运行环境仅支持 `Python 3.7 ~ 3.8`
:::

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
cd Amiya-Bot/
```

## 开始部署

### 安装依赖

#### Windows or MacOS

```bash
pip install -r requirements.txt
playwright install chromium
```

#### Ubuntu

```bash
pip3 install -r requirements.txt
playwright install-deps chromium
```

#### 可选依赖：PaddleOCR

PaddleOCR 是在你**没有配置百度智能云**或**百度智能云无法使用**时的备选 OCR 应用

```bash
pip install paddleocr
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

### 离线交互式测试

运行测试脚本可启动离线测试，输入对话内容即可调试，功能的返回将会在控制台内输出

```bash
python amiyaTest.py
```

在需要调试模板时，可以加入 `debug` 参数取消 chromium 无头模式

```bash
python amiyaTest.py --debug
```

### 封闭测试

配置封闭测试相关项后启动 Amiya，之后，Amiya 仅会回应封闭测试指定的群

```yaml
test:
    enable: true
    group:
        - <测试群号1>
        - <测试群号2>
        - ...
```
