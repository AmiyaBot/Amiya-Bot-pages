---
title: 通过代码部署 Amiya
---

::: tip <br>
简单三步，启动你的 Amiya
:::

## 开始部署

### 安装 python 依赖

```bash
pip install -r requirements.txt
```

### 配置`config.yaml`

```yaml
# 账号设置
account:
    # bot 账号
    bot: 1515361402
    # 管理员账号
    admin: 826197021
    # 主群设置
    group:
        # 主群群号
        groupId: 362165038
        # 封闭测试开关
        closeBeta: false

# mirai-api-http 配置
miraiApi:
    # IP 地址
    host: 127.0.0.1
    # 端口
    port:
        # http 服务端口
        http: 8080
        # websocket 服务端口
        ws: 8060
    # authkey
    authKey: AmiyaBot
    # mirai-console 的根目录路径，可为空，用于通过 path 参数发送静态文件。不配置的情况下，默认通过上传的方式发送
    folder:

# Amiya-Bot console IP 和端口配置
console:
    host: 0.0.0.0
    port: 80

# 百度智能云配置
baiduCloud:
    enable: false
    appId:
    apiKey:
    secretKey:

# 消息设置
message:
    # 消息限制
    limit:
        seconds: 10
        maxCount: 3
    # 文字自动转化为图片的长度
    transToImageLength: 100

# 常规设置
setting:
    # 离线模式
    offline: false
```

### 启动 Amiya 入口程序
    - 在你的 Python 环境内运行主程序文件 `amiya.py` 即可启动 Amiya
    - 若你尚未部署 mirai 套件，也可运行测试程序 `quickTest.py` 进行预部署

```bash
python amiya.py
```

## 功能测试方式

- 离线测试
    - 离线测试不需要启动 mirai 套件
    - 配置 `offline: true` 后直接运行脚本 `quickTest.py`
    - 可在脚本内选择测试方式。注意，测试方式只能使用一种

```python
if __name__ == '__main__':
    s = QuickTest()

    # console 测试
    # s.bot.console.start()

    # 对话式测试
    s.start()

    # 快速测试单句指令
    # s.unit_test('兔兔功能')
```

```bash
python quickTest.py
```

- 实际环境的封闭测试
    - 实际环境属于正式部署 Amiya
    - 配置封闭测试相关项后启动 Amiya，之后，Amiya 仅会回应封闭测试指定的群

```yaml
account:
    group:
        # 封闭测试群号
        groupId: 362165038
        # 封闭测试：开
        closeBeta: true
setting:
    # 离线模式：开
    offline: true
```
