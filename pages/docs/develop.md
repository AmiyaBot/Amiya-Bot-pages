### 前言

AmiyaBot 的核心是由 Python 编写的自主研发的框架，旨在让开发人员无需顾虑通讯和消息的互相转换，从而更专注于业务逻辑的开发。<br>
在开始之前，想必你已经完成 [代码部署]() 了吧。

    一切就绪的话，无需多言，马上开始。

### 目录结构

### 注册功能函数

AmiyaBot 功能开发的关键模块一共有三个，分别是 `core` 模块下的 `bot`、`Message`、`Chain`。<br>

- `bot` 为主要入口，包含了消息和事件的注册器，以及一些注册工具函数。
- `Message` 为接收的消息主体，内含预解析的消息内容，以及一些相关操作函数。Message 类在此仅用于装饰器，供编辑器智能提示使用，任何时候，你都不需要实例化 Message 类。
- `Chain` 为 Mirai 消息链的创建工具。所有需要发送的消息，都必须由 Chain 类创建。核心会调用 Chain 类的 build 方法生成 Mirai 消息链。

了解了以上内容，下面让我们注册一个简单的群聊功能。

#### 示例一

当对话内容带有 `你好` 关键字时，回复 `你好，世界`

```python
from core import bot, Message, Chain


@bot.on_group_message(keywords='你好')
async def _(data: Message):
    return Chain(data).text('你好，世界')
```

现在，在你的群聊里发送 `阿米娅你好`，不出意外的话，你将会收到如下的回复。

<img style="width: 400px" :src="$withBase('/doc_images/hello_world_1.png')" alt="hello_world_1">

    「这是个人迈出的一小步，但却是人类迈出的一大步。」———— 阿姆斯特朗

接下来，我们了解一下上述代码的构成。

### 功能函数装饰器

功能函数装饰器作用于你的业务逻辑主体函数，其选择监听接收消息的目标。目前装饰器分为 `私聊(on_private_message)`，`群聊(on_group_message)` 和 `临时聊天(on_temp_message)`

```python {5,11,17}
from core import bot


# 私聊
@bot.on_private_message(...)
async def _(data):
    ...


# 群聊
@bot.on_group_message(...)
async def _(data):
    ...


# 临时聊天
@bot.on_temp_message(...)
async def _(data):
    ...
```

#### 参数列表

| 参数名          | 释义                                 |
|--------------|------------------------------------|
| function_id  | 功能ID，不唯一，仅用于记录该功能的使用数量             |
| keywords     | 触发关键字，支持字符串、正则、全等句（equal）或由它们构成的列表 |
| verify       | 自定义校验方法，当该参数被赋值时，keywords 将会失效     |
| check_prefix | 是否校验前缀或指定需要校验的前缀                   |
| level        | 关键字校验成功后函数的候选默认等级                  |

### 接收不包含前缀或指定前缀的消息

AmiyaBot 默认需要对话中包含指定前缀才能进入消息分配器，我们认为机器人都应该遵守这一约定。但有时候，人性化一点也未必是一件坏事。<br>
让我们回到 [示例一](#示例一) ，要触发示例一的功能，必须要求对话内容的前缀为 `阿米娅` （指定的前缀之一），我们稍加修改，即可在对话没有携带指定前缀时，也能触发功能。<br>

#### 示例二

```python {5,11}
from core import bot, Message, Chain


# 在原来的基础上添加参数 check_prefix=False 可忽略前缀检查
@bot.on_group_message(keywords='你好', check_prefix=False)
async def _(data: Message):
    return Chain(data).text('你好，世界')


# 也可以让前缀检查临时改为你指定的单词
@bot.on_group_message(keywords='你好', check_prefix=['兔兔', '🐰'])
async def _(data: Message):
    return Chain(data).text('你好，世界')
```

<img style="width: 400px" :src="$withBase('/doc_images/hello_world_2.png')" alt="hello_world_2">

::: warning 注意<br>
除特定用法之外，任何时候都是需要检查指定前缀！
:::

### 接收全等句式

全等句式指对话的内容完全为设定的句子，并非通过关键词触发，使用工具 `bot.equal` 即可达到效果。

#### 示例三

```python {4}
from core import bot, Message, Chain


@bot.on_group_message(keywords=bot.equal('你好'))
async def _(data: Message):
    return Chain(data).text('你好，世界')
```

::: tip 小技巧<br>
示例三同样也能达到示例二的接收不包含前缀的消息的效果，因为全等句式不会检查前缀。
:::

### 接收符合正则检查的句式

关键词传入 `re.compile` 对象，即可使用正则检查。

#### 示例四

```python {1,6}
import re

from core import bot, Message, Chain


@bot.on_group_message(keywords=re.compile(r'你好，\d+'))
async def _(data: Message):
    return Chain(data).text('你好，世界')
```

### 组合多个和多种关键词

关键字支持由 `字符串、正则、全等句` 构成的列表，组合中包含全等句时，全等句依然会无视前缀检查。

#### 示例五

```python {6}
import re

from core import bot, Message, Chain


@bot.on_group_message(keywords=['你好', '您好', bot.equal('你好'), re.compile(r'你好，(\d+)')])
async def _(data: Message):
    return Chain(data).text('你好，世界')
```

### 优先级

当关键词校验存在冲突时，可以通过指定优先级供消息分配器选择。<br>
分配器的工作原理，是在完成检查之后，将通过校验的候选函数列表按优先级倒序排序，然后选取第一个执行。<br>
所有函数的默认优先级都为 `1`，如果不指定优先级，分配器会按照加载的先后顺序选择。

#### 示例六

```python {7,12}
from core import bot, Message, Chain


# 如果不指定优先级，当对话内容为 "世界你好" 时，第一个函数会优先通过校验并输出。
# 因为在模块加载阶段，第一个函数更早注册完毕。

@bot.on_group_message(keywords='你好', level=1)
async def _(data: Message):
    return Chain(data).text('你好，世界')


@bot.on_group_message(keywords='世界你好', level=2)
async def _(data: Message):
    return Chain(data).text('世界，你好')
```

### 自定义检查

> 内置的检查终究存在上限，如果需要制作复杂的功能，自定义检查必不可少。

自定义检查是一个协程函数，参数为 Message 对象，返回一个布尔值（必选）、优先级（可选）、关键词（可选）的元祖。

```python
async def my_verify(data: Message):
    if ...:
        return True
    return False
```

在自定义检查里，你可以动态输出优先级的值。

```python {3,5}
async def my_verify(data: Message):
    if ...:
        return True, 2
    elif ...:
        return True, 1
    return False
```

输出关键词将对 Verify 对象产生影响，Verify 对象我们会在后续详细说明。

```python
async def my_verify(data: Message):
    return True, 1, ['关键词', ...]
```

#### 示例七

```python {10}
from core import bot, Message, Chain


async def my_verify(data: Message):
    if '你好' in data.text:
        return True
    return False


@bot.on_group_message(verify=my_verify)
async def _(data: Message):
    return Chain(data).text('你好，世界')
```

> 未完待续
