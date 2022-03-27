---
title: 注册事件响应
isShowComments: false
---

## 简单说明

事件，指 Bot 在运行过程中由 QQ 操作而产生的事件。例如 `群员入群`、`群员被禁言`、`群员撤回消息` 等。

## 注册事件的响应

示例，注册一个事件的响应。

```python
from core import bot, Mirai


@bot.on_event(Mirai.MemberJoinEvent)
async def _(event: Mirai.MemberJoinEvent):
    ...
```

同时注册多个事件的响应。

```python {5,6}
from typing import Union
from core import bot, Mirai


@bot.on_event([Mirai.MemberJoinEvent, Mirai.BotJoinGroupEvent, ...])
async def _(event: Union[Mirai.MemberJoinEvent, Mirai.BotJoinGroupEvent, ...]):
    ...
```

### **bot.on_event 注册函数**

| 参数名    | 类型                    | 释义  | 默认值 |
|--------|-----------------------|-----|-----|
| events | String, List\[String] | 事件名 |     |

on_event 函数是 bot 模块内的函数装饰器，接受的参数是一个 `Mirai事件对象` 或由其组成的列表，也可以为字符串和字符串列表，因为 `Mirai事件对象` 只是一个捷径，on_event 最终会调用 `__str__`
方法返回字符串。

```python
from core import bot, Event


@bot.on_event('MemberJoinEvent')
async def _(event: Event):
    ...
```

### **响应函数**

| 参数名   | 类型    | 释义   | 默认值 |
|-------|-------|------|-----|
| event | Event | 事件对象 |     |

响应函数是一个协程，接受一个 `event` 参数。`event` 通常情况下为 `Event` 对象，但在使用 `Mirai事件对象` 捷径的情况下，接受的是 `Mirai事件对象` 的实例，其父类是 `Event` 对象。

## Mirai事件对象

AmiyaBot 内置了 37 种 Mirai 事件的数据结构，你可以直接调用 `Mirai` 对象获取。

### Bot事件

| 事件对象                   | 释义                 |
|------------------------|--------------------|
| BotOnlineEvent         | Bot登录成功            |
| BotOfflineEventActive  | Bot主动离线            |
| BotOfflineEventForce   | Bot被挤下线            |
| BotOfflineEventDropped | Bot被服务器断开或因网络问题而掉线 |
| BotReloginEvent        | Bot主动重新登录          |

### 好友事件

| 事件对象                          | 释义       |
|-------------------------------|----------|
| FriendInputStatusChangedEvent | 好友输入状态改变 |
| FriendNickChangedEvent        | 好友昵称改变   |
| FriendRecallEvent             | 好友消息撤回   |
| NewFriendRequestEvent         | 添加好友申请   |

### 群组事件

| 事件对象                                 | 释义           |
|--------------------------------------|--------------|
| BotGroupPermissionChangeEvent        | Bot在群里的权限被改变 |
| BotMuteEvent                         | Bot被禁言       |
| BotUnmuteEvent                       | Bot被取消禁言     |
| BotInvitedJoinGroupRequestEvent      | Bot被邀请入群申请   |
| BotJoinGroupEvent                    | Bot加入了一个新群   |
| BotLeaveEventActive                  | Bot主动退出一个群   |
| BotLeaveEventKick                    | Bot被踢出一个群    |
| GroupRecallEvent                     | 群消息撤回        |
| NudgeEvent                           | 戳一戳事件        |
| GroupNameChangeEvent                 | 某个群名改变       |
| GroupEntranceAnnouncementChangeEvent | 某群入群公告改变     |
| GroupMuteAllEvent                    | 全员禁言         |
| GroupAllowAnonymousChatEvent         | 匿名聊天         |
| GroupAllowConfessTalkEvent           | 坦白说          |
| GroupAllowMemberInviteEvent          | 允许群员邀请好友加群   |
| MemberJoinEvent                      | 新人入群的事件      |
| MemberLeaveEventKick                 | 成员被踢出群       |
| MemberLeaveEventQuit                 | 成员主动离群       |
| MemberCardChangeEvent                | 群名片改动        |
| MemberSpecialTitleChangeEvent        | 群头衔改动        |
| MemberPermissionChangeEvent          | 成员权限改变的事件    |
| MemberMuteEvent                      | 群成员被禁言事件     |
| MemberUnmuteEvent                    | 群成员被取消禁言事件   |
| MemberHonorChangeEvent               | 群员称号改变       |
| MemberJoinRequestEvent               | 用户入群申请       |

### 其他事件

| 事件对象                    | 释义      |
|-------------------------|---------|
| OtherClientOnlineEvent  | 其他客户端上线 |
| OtherClientOfflineEvent | 其他客户端下线 |
| CommandExecutedEvent    | 命令被执行   |
