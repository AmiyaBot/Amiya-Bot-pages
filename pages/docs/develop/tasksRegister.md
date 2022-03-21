---
title: 注册定时循环任务
---

## 简单说明

在 AmiyaBot 运行期间，定时执行的循环任务。

## 注册任务

示例，注册一个每 10 秒执行一次的任务

```python
from core import bot

@bot.timed_task(each=10)
async def _():
    print('过了 10 秒')
```

### **bot.timed_task 注册函数**

timed_task 函数是 bot 模块内的函数装饰器，接受 `each` 或 `custom` 两个参数。

| 参数名    | 类型       | 释义             | 默认值 |
|--------|----------|----------------|-----|
| each   | Int      | 循环执行间隔时间，单位（秒） |     |
| custom | Callable | 自定义循环规则        |     |

::: danger 注意<br>
此定时事件为非严格定时，因为执行协程会产生切换的耗时。所以此注册器定义的循环时间为"约等于"。
:::

**custom 自定义循环规则**

custom 函数是一个协程，**每秒会被调用一次**，接受一个 int 参数，参数为 AmiyaBot 的运行时间总秒数。<br>
如果传入了自定义循环规则，`each` 将会失效。

```python
from core import bot


async def my_check(t: int):
    ...
    return True


@bot.timed_task(custom=my_check)
async def _():
    ...
```
