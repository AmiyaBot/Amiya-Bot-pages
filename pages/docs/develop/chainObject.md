---
title: Chain对象
isShowComments: false
---

## 简介

`Chain` 对象是构建你的消息体的类。任何有关**发送消息**的函数，消息接受的参数类型均为 `Chain`。<br>
相信在之前的章节里，你已经见过它了。Chain 对象提供丰富的消息构建方式，可以让你发送多彩的文字图片，甚至是html模板。<br>
这是最简单的一条文本消息：

    Chain(data).text('你好，世界')

## 实例化参数

任何时候，Chain 对象都需要传入 `Message 对象` 以实例化。

| 参数名   | 类型      | 释义           | 默认值   |
|-------|---------|--------------|-------|
| data  | Message | Message 对象   |       |
| at    | Bool    | 是否 @ 用户      | True  |
| quote | Bool    | 是否回复用户（引用消息） | False |

::: warning 提示<br>
在之前和以后的章节里，为了达到更好的演示效果，对话示例图内的消息回复均会设置 `quote=True, at=False`
:::

## Chain 构建消息的方法

Chain 对象支持链式语法，用于构建复杂的消息结构。以下方法均返回 Chain 对象自身。

| 方法名        | 参数                                | 释义               | 异步  |
|------------|-----------------------------------|------------------|-----|
| at         | user,enter                        | 添加 @ 一个用户        | 否   |
| text       | text,enter,auto_convert           | 添加一段文字           | 否   |
| text_image | text,images,width,height          | 添加一张文字图片         | 否   |
| image      | target                            | 添加一张图片           | 否   |
| voice      | target                            | 添加一条语音           | 否   |
| html       | path,data,is_template,render_time | 使用 html 页面生成一张图片 | 否   |

### **Chain.at**

添加 @ 一个用户

| 参数名   | 类型   | 释义                         | 默认值   |
|-------|------|----------------------------|-------|
| user  | Int  | @ 的用户QQ号，默认为 Message 对象的用户 |       |
| enter | Bool | 是否 @ 用户后换行                 | False |

    Chain(data).at(12345678).text('你好，世界')

Chain 对象在实例化的时候，默认会在消息体头部添加 `@用户`。

### **Chain.text**

添加一段文字

| 参数名          | 类型     | 释义           | 默认值   |
|--------------|--------|--------------|-------|
| text         | String | 内容文本         |       |
| enter        | Bool   | 本段落是否换行      | False |
| auto_convert | Bool   | 是否超出字数后转换为图片 | True  |

    Chain(data).text('你好，世界')

当文字数量超过一定长度时（默认配置为 100），会自动将本段落转换为图片发送，设置 `auto_convert=False` 可关闭自动转换。

::: tip 插入表情<br>
在文本内使用 `[face:ID]` 模板可以插入 QQ 表情。

    Chain(data).text('你好，世界 [face:21]')

:::

### **Chain.text_image**

添加一张文字图片

| 参数名    | 类型               | 释义   | 默认值  |
|--------|------------------|------|------|
| text   | String           | 内容文本 |      |
| images | List\[ImageElem] | 插入图片 | None |
| width  | Int              | 图片宽度 | None |
| height | Int              | 图片高度 | None |

    Chain(data).text_image('你好，世界')

此方法可以将文字转换为图片发送，使用**调色模板**可以进行文字调色，亦可插入图片渲染。

#### **调色模板**

在文本内使用
<span style="color: red">\[cl</span>
<span style="color: #001eff">文字内容</span>@<span style="color: #009331">#颜色代码</span>
<span style="color: red">cle]</span>
格式的模板，即可将指定文字内容改变颜色。

简单尝试一下，再继续运用前一节示例一的内容，让 `世界` 两个字变为<span style="color: red">红色</span>

```python {6}
from core import bot, Message, Chain


@bot.on_group_message(keywords='你好')
async def _(data: Message):
    return Chain(data).text_image('你好，[cl 世界@#ff0000 cle]')
```

你可以收到如下的回复

<img style="width: 400px" :src="$withBase('/doc_images/hello_world_5.png')" alt="hello_world_5">

::: danger text_image 无法插入表情<br>
如果 `Chain.text` 的文本内使用了**调色模板**，将会强制转换为图片。同时 `[face:ID]` 模板也会失效。
:::

#### **渲染图片**

在 images 参数内传入一个包含 ImageElem 对象的列表，即可在文字图片内渲染图片。<br>

**ImageElem**

| 参数名  | 类型         | 释义            | 默认值 |
|------|------------|---------------|-----|
| path | String     | 图片路径          |     |
| size | Int        | 图片大小          |     |
| pos  | (Int, Int) | 图片渲染位置 (x, y) |     |

简单尝试一下，发送一张 `你好，世界` 的文字图片，并在里面插入一张图片。<br>
值得注意的是，因为 `你好，世界` 文字只有一行，所以需要指定一下**图片高度**。否则插入的图片可能会显示不全。<br>
你可以一次插入很多张图片，所以任何时候，都请把握好你的**文字图片宽高**与插入的图片的**大小、坐标**之间的影响。

```python {2,8,11,12}
from core import bot, Message, Chain
from core.builtin.imageCreator import ImageElem


@bot.on_group_message(keywords='你好')
async def _(data: Message):

    image = ImageElem(path='resource/images/face/face1.png', size=80, pos=(0, 20))

    return Chain(data).text_image('你好，世界',
                                  images=[image],
                                  height=100)
```

你可以收到如下的回复

<img style="width: 400px" :src="$withBase('/doc_images/hello_world_6.png')" alt="hello_world_6">

### **Chain.image**

添加一张图片

| 参数名    | 类型            | 释义              | 默认值 |
|--------|---------------|-----------------|-----|
| target | String, Bytes | 图片文件路径或图片 bytes |     |

    Chain(data).image(target)

图片路径示例

```python {6}
from core import bot, Message, Chain


@bot.on_group_message(keywords='你好')
async def _(data: Message):
    return Chain(data).image('resource/images/face/face1.png')
```

你可以收到如下的回复

<img style="width: 400px" :src="$withBase('/doc_images/hello_world_7.png')" alt="hello_world_7">

Chain.image 也可以传入图片的 bytes 对象。<br>
实时生成的图片或网络图片可以直接把 bytes 结果传入 Chain.image 以节省 IO 消耗。

```python {2,8}
from core import bot, Message, Chain
from core.network.download import download_async


@bot.on_group_message(keywords='你好')
async def _(data: Message):

    web_image = await download_async('https://....')

    return Chain(data).image(web_image)
```

### **Chain.voice**

添加一条语音

| 参数名    | 类型     | 释义          | 默认值 |
|--------|--------|-------------|-----|
| target | String | 语音 wav 文件路径 |     |

    Chain(data).voice(target)

::: danger 注意<br>
仅支持 wav 格式的语音文件
:::

```python {6}
from core import bot, Message, Chain


@bot.on_group_message(keywords='你好')
async def _(data: Message):
    return Chain(data, at=False).voice('resource/voice/阿米娅/阿米娅_问候.wav')
```

<img style="width: 400px" :src="$withBase('/doc_images/hello_world_8.png')" alt="hello_world_8">

### **Chain.html**

使用 html 页面生成一张图片

| 参数名         | 类型         | 释义           | 默认值  |
|-------------|------------|--------------|------|
| path        | String     | 模板文件路径或网站URL |      |
| data        | Dict, List | 模板文件数据       |      |
| is_template | Bool       | 是否为模板文件      | True |
| render_time | Int        | 渲染时间（毫秒）     | 200  |

    Chain(data).html('template.html', {...})

#### **创建html模板文件**

html模板文件存放在 `template` 目录下，参数 `path` 默认以该文件夹作为根目录。<br>
在 `template` 目录内创建一个 `hello.html`

``` {3}
.
└── template
    └── hello.html
```

编写如下**标准模板**内容

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <!-- 引入字体样式 -->
    <link type="text/css" rel="styleSheet" href="../font.css"/>
    <title>template</title>
</head>
<body>
<div id="template">

</div>
</body>
<!-- 引入 vue.js -->
<script src="../vue.min.js"></script>
<script>
    const template = new Vue({
        el: '#template',
        methods: {
            init(data) {
                this.$set(this, 'data', data)
            }
        },
        data() {
            return {
                data: {}
            }
        },
        mounted() {
            // 暴露 init 方法供核心调用
            window.init = this.init
        }
    })
</script>
</html>
```

#### **Vue.js**

模板文件建议使用 [Vue.js](https://cn.vuejs.org/) （以下简称 `vue`） 编写，vue 将有效提高模板渲染速度以及代码可读性，**以下文档将使用 vue 进行讲解，并默认你熟悉使用 vue 开发**。

编写模板，在模板内加入渲染代码

```html
<!-- hello.html -->
<div id="template">
    <div>你好，{{ data.username }}</div>
</div>
```

将需要渲染的数据传入模板

```python {9}
from core import bot, Message, Chain


@bot.on_group_message(keywords='你好')
async def _(data: Message):
    init_data = {
        'username': data.nickname
    }
    return Chain(data).html('hello.html', init_data)
```

即可在触发会话时，渲染 `hello.html` 制作图片发送回复。

::: tip 关于 <br>
html 制图旨在不使用 PIL 也能制作出美观的图片，但不希望你滥用。在仅渲染文字和少量图案时，PIL 的效率会比 html 快得多。
:::

#### **通过网站URL制图**

支持直接使用网站URL生成图片

::: danger 注意 <br>
在页面加载完毕后，默认预留200ms的渲染时间。如果页面有部分元素是异步渲染的，将有可能不显示在图片内。可通过参数 `render_time` 设置需要的时间。
:::

```python {6}
from core import bot, Message, Chain


@bot.on_group_message(keywords='百度')
async def _(data: Message):
    return Chain(data).html('https://www.baidu.com/', is_template=False, render_time=1000)
```

## 消息链

Chain 对象支持链式语法，你只需要按顺序以链式使用上述方法，即可拼接出内容丰富的消息。

    Chain(data).text(...).image(...).text(...).voice(...).html(...)

其中，voice 方法并不参与构建消息体，因为 QQ 无法在发送的文字消息中间镶嵌语音，语音将会单独发送。

## 自定义的消息对象

Chain 对象所接受的参数 data 是函数接收的 Message 对象，实例化一个自定义的 Message 对象可以让消息发送到预期的位置。messageChain 模块提供了工具函数实现这一效果。

**custom_chain**

custom_chain 函数返回 Chain 对象。你可以按照 Chain 对象的操作方式对 custom_chain 的返回值做操作。

| 参数名      | 类型     | 释义         | 默认值   |
|----------|--------|------------|-------|
| user_id  | Int    | 模拟的用户 QQ 号 |       |
| group_id | Int    | 模拟的群号      |       |
| msg_type | String | 消息类型       | group |

::: danger 注意<br>
以下的示例将展示使用 custom_chain 实现跨群发送消息的效果，仅用于演示。实际情况请谨慎使用。
:::

```python {2,7}
from core import bot, Message, Chain
from core.builtin.messageChain import custom_chain


@bot.on_group_message(keywords='你好')
async def _(data: Message):
    return custom_chain(user_id=目标用户, group_id=目标群号).text('你好，世界')
```

## 向管理员们发送消息

**上下文管理函数 send_to_admin**

向所有配置中授权的管理员发送私聊消息，该操作不限定使用的位置，可以在任何地方使用。

```python {1,5}
from core import websocket


async def _():
    async with websocket.send_to_admin() as chain:
        chain.text(...)
```

## 结语

完成这一节，你已经完全了解 AmiyaBot 开发功能时的主要内容了。AmiyaBot 内置了很多工具函数，但即使没有它们，依然不影响你独立完成功能开发。<br>
工具函数以及其他细节的介绍可以返回文档首页查看索引。
