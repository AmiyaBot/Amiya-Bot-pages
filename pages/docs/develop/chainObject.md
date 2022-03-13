---
title: Chain对象
---

## 简介

`Chain` 对象是构建你的消息体的类。任何有关回复的函数，消息接受的参数类型均为 `Chain`。

## 实例化参数

| 参数名   | 类型      | 释义           | 默认值   |
|-------|---------|--------------|-------|
| data  | Message | Message 对象   |       |
| at    | Bool    | 是否 @ 用户      | False |
| quote | Bool    | 是否回复用户（引用消息） | True  |

## 构建消息的方法（method）

| 方法名        | 参数                          | 释义       | 异步  |
|------------|-----------------------------|----------|-----|
| at         | user,enter                  | @ 一个用户   | 否   |
| text       | text,enter,auto_convert     | 添加一段文本   | 否   |
| text_image | text,images                 | 添加一段图片文本 | 否   |
| image      | target                      | 添加一张图片   | 否   |
| image      | target                      | 添加一条语音   | 否   |

未完待续...
