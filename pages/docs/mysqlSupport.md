---
title: MySQL支持
isShowComments: false
---

AmiyaBot 默认使用 sqlite 作为数据库，也支持 MySQL，你仅需要修改 `config/private/database.yaml` 的配置即可。

```yaml {2}
mysql:
    enabled: true
    config:
        host: localhost
        port: 3306
        user: root
        password:
    databases:
        bot: amiya_bot
        group: amiya_group
        message: amiya_message
        user: amiya_user

sqlite:
    bot: database/bot.db
    group: database/group.db
    message: database/message.db
    user: database/user.db
```

`mysql.enabled` 为 `true` 时，AmiyaBot 将使用 MySQL 作为数据库。

::: warning 注意<br>
MySQL 下 AmiyaBot 无法自动创建数据库，请先创建数据库后启动。<br>
需要创建的数据库：

- amiya_bot
- amiya_group
- amiya_message
- amiya_user

:::
