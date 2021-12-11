const nav = [
    {text: '主页', link: '/'},
    {
        text: '文档', items: [
            {text: '通过代码部署', link: '/docs/deployByCode/'},
            {text: '通过安装包部署', link: '/docs/deployByExe/'},
            {text: '如何维护', link: '/docs/maintain/'},
            {text: '使用 Amiya-Bot-console', link: '/docs/amiyaConsole/'},
        ]
    },
    {
        text: '说明', items: [
            {text: '功能指引', link: '/blog/function/'},
            {text: 'Amiya的测试工房', link: '/blog/notice/'},
        ]
    },
]
const sidebar = 'auto'

module.exports = {
    nav,
    sidebar
}
