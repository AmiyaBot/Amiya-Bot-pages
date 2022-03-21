---
title: Chain对象
---

## 简介

`Chain` 对象是构建你的消息体的类。任何有关**发送消息**的函数，消息接受的参数类型均为 `Chain`。<br>
相信在之前的章节里，你已经见过它了。<br>
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

| 方法名        | 参数                       | 释义        | 异步  |
|------------|--------------------------|-----------|-----|
| at         | user,enter               | 添加 @ 一个用户 | 否   |
| text       | text,enter,auto_convert  | 添加一段文字    | 否   |
| text_image | text,images,width,height | 添加一张文字图片  | 否   |
| image      | target                   | 添加一张图片    | 否   |
| voice      | target                   | 添加一条语音    | 否   |

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

## 消息链

Chain 对象支持链式语法，你只需要按顺序以链式使用上述方法，即可拼接出内容丰富的消息。

    Chain(data).text(...).image(...).text(...).voice(...)

其中，voice 方法并不参与构建消息体，因为 QQ 无法在发送的文字消息中间镶嵌语音，语音将会单独发送。

## 结语

完成这一节，你已经完全了解 AmiyaBot 开发功能时的主要内容了。AmiyaBot 内置了很多工具函数，但即使没有它们，依然不影响你独立完成功能开发。<br>
工具函数以及其他细节的介绍可以返回文档首页查看索引。
