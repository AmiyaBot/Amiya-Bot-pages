---
title: Message对象
---

## 简介

`Message` 对象是接收到对话之后预处理化的一个消息数据对象。内含这则消息相关的各项属性，以及针对这则消息的一些操作API。<br>
从 [上一节](/docs/develop/funcsRegister) 示例七可以知道，`Message` 对象应用在功能函数以及校验函数内。

## 属性与方法

### Message 属性

| 属性              | 类型            | 释义                        |
|-----------------|---------------|---------------------------|
| face            | List\[String] | 消息包含的表情                   |
| image           | List\[String] | 消息包含的图片                   |
| text            | String        | 消息文本（去字符处理、中间件处理）         |
| text_digits     | String        | 消息文本（去字符处理、中间件处理、中文转数字处理） |
| text_origin     | String        | 消息文本（中间件处理）               |
| text_initial    | String        | 消息文本（无处理）                 |
| text_cut        | List\[String] | 消息文本分词                    |
| text_cut_pinyin | List\[String] | 消息文本拼音分词                  |
| at_target       | List\[Int]    | 消息内 @ 的对象列表               |
| is_at           | Bool          | 是否 @ Bot                  |
| is_call         | Bool          | 是否呼叫 Bot                  |
| is_admin        | Bool          | 是否为 Bot 管理员               |
| is_group_admin  | Bool          | 是否为群管理员                   |
| is_new_user     | Bool          | 是否首次使用 Bot                |
| user_id         | Int           | 用户 QQ 号                   |
| group_id        | Int           | 用户群号                      |
| nickname        | String        | 用户昵称                      |
| raw_chain       | String        | 原始消息链                     |
| time            | String        | 消息时间                      |
| verify          | String        | Verify 对象                 |
| user            | String        | User 对象                   |

`Verify` 对象在本文档结尾说明。<br>
`User` 对象是数据库 `user` 表的 ORM 对象，其属性如下。

| 属性          | 类型     | 释义                 |
|-------------|--------|--------------------|
| user_id     | String | 用户 QQ 号            |
| nickname    | String | 用户昵称               |
| message_num | Int    | 累计互动数量             |
| black       | Int    | 是否为黑名单，0 - 否，1 - 是 |

### Message 方法

| 方法名     | 参数                          | 释义            | 异步  |
|---------|-----------------------------|---------------|-----|
| send    | reply                       | 发送一条消息        | 是   |
| waiting | reply,max_time,force,target | 中断业务逻辑，等待用户回复 | 是   |

## Message.send

在上一节里，发送消息通常是使用返回 `Chain` 对象的方式。如果一个功能需要发送多条消息。则需要使用 `Message.send` 方法。<br>

::: warning 什么是 Chain 对象？<br>
这个疑问，你可能已经在上一节就已经产生了。<br>
但是别着急，我们希望你在知道 `如何发送消息` 之后，在去了解 `如何发送内容丰富的消息`
:::

### 参数列表

| 参数名   | 类型    | 释义       | 默认值 |
|-------|-------|----------|-----|
| reply | Chain | Chain 对象 |     |

再继续运用上一节示例一的内容，把返回的 `你好，世界` 分开两次发送。

```python {4}
@bot.on_group_message(keywords='你好')
async def _(data: Message):

    await data.send(Chain(data).text('你好'))

    return Chain(data).text('世界')
```

回复将会呈现下图的效果：

<img style="width: 400px" :src="$withBase('/doc_images/hello_world_3.png')" alt="hello_world_3">

## Message.waiting

**连续对话**，是很多机器人司空见惯的功能，`Message.waiting` 方法就是实现连续对话的基础。

### 参数列表

| 参数名      | 类型     | 释义         | 默认值   |
|----------|--------|------------|-------|
| reply    | Chain  | Chain 对象   |       |
| max_time | Int    | 最长等待时间（秒数） | 30    |
| force    | Bool   | 使用强制等待     | False |
| target   | String | 等待目标       | user  |

使用 `waiting` 实现一个简单的连续对话

```python {4}
@bot.on_group_message(keywords='你好')
async def _(data: Message):

    reply = await data.waiting(Chain(data).text('博士，请告诉我您的名字'))

    if reply:
        return Chain(data).text(f'你好，{reply.text}')
    else:
        return Chain(data).text('你好，博士')
```

<img style="width: 400px" :src="$withBase('/doc_images/hello_world_4.png')" alt="hello_world_4">

### force 强制等待

等待通常不会影响消息分配器运作，也就是说仅在不能触发任何其他功能（也包括本功能的初始触发方式）的时候，消息才会返回到当前等待处。<br>
如果你不希望如此，使用 `waiting(force=True)`，可以忽略分配器让消息强制返回到等待。

### target 等待目标

等待目标默认是该消息的用户（`user`），`waiting(target='group')` 可以让消息等待目标更改为群聊，此时任何群员的回复都将可能返回到当前等待处

### 关于 waiting 你需要知道的事

- 若用户超过指定时间未回复，waiting 会返回 `None`
- 同一个用户（目标）只能存在一个等待，当一个新的等待创建后，上一个未使用的等待会被注销并引发 `WaitEventCancel` 异常，进行中的业务将会被**终止**，通常这个异常会被全局异常捕捉器过滤。
- 在等待时间内使用其他功能，等待也会被注销。

## Verify 对象

Verify 对象是消息分配器校验功能可行性后产生的校验结果。储存在 Message 对象内为功能函数提供帮助。

**对象属性**

| 属性       | 类型            | 释义                                  |
|----------|---------------|-------------------------------------|
| result   | Bool          | 校验结果                                |
| keywords | List\[String] | 校验成功匹配出来的关键字列表                      |
| weight   | Int, Float    | 权重（优先级），用于当同时存在多个检验结果时，可根据权值匹配优先的结果 |

虽然 Message 对象作用于校验函数和功能函数，但 Verify 仅在功能函数内可以调用。

```python {5,10}
from core import bot, Message, Chain


async def my_verify(data: Message):
    data.verify // 此时 verify 属性为 None


@bot.on_group_message(verify=my_verify)
async def _(data: Message):
    data.verify // 此时 verify 属性为 Verify 的实例
```

Verify 对象的 `result` 与 `weight` 属性是供消息分配器使用的。一般情况下只有 `keywords` 属性能产生作用。<br>
`keywords` 属性是消息分配器检验完毕后，将校验成功的关键内容，储存在该属性内。

```python
@bot.on_group_message(keywords=[...])
async def _(data: Message):
    data.verify.keywords // 当触发关键字存在很多个时，此处的结果就是触发函数时选中的那一个
```

```python
@bot.on_group_message(verify=my_verify)
async def _(data: Message):
    data.verify.keywords // 此处的结果是 my_verify 校验函数返回的元祖的第三个值
```

## 结语

通过这一节，你已经可以构建稍微复杂的功能了。但还远远不够，下一节，我们去了解最重要的 [Chain](/docs/develop/chainObject) 对象。
