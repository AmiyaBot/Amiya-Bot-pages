const nav = [
    {text: '主页', link: '/'},
    {
        text: '文档', items: [
            {
                text: '部署文档', items: [
                    {text: '通过代码部署', link: '/docs/deployByCode'},
                    {text: '通过可执行文件部署', link: '/docs/deployByExe'},
                ]
            },
            {
                text: '开发文档', items: [
                    {text: '首页', link: '/docs/develop/develop'},
                    {text: '功能函数的注册', link: '/docs/develop/funcsRegister'},
                    {text: 'Message对象', link: '/docs/develop/messageObject'},
                    {text: 'Chain对象', link: '/docs/develop/chainObject'},
                    {text: '注册事件响应', link: '/docs/develop/eventsRegister'},
                    {text: '注册定时任务', link: '/docs/develop/tasksRegister'},
                ]
            },
            {
                text: '维护文档', items: [
                    {text: '日常维护', link: '/docs/maintain'},
                    {text: '使用后台管理系统', link: '/docs/amiyaConsole'},
                ]
            }
        ]
    },
    {
        text: '说明', items: [
            {text: '功能指引', link: '/blog/function'},
            {text: 'Amiya的测试工房', link: '/blog/notice'},
        ]
    },
    {text: '时间线', link: '/timeline/'},
    {text: '留言板', link: '/board/'},
    {text: '查看源码', link: 'https://github.com/AmiyaBot/Amiya-Bot', icon: 'reco-github'}
]
const sidebar = 'auto'
const displayAllHeaders = true

module.exports = {
    nav,
    sidebar,
    displayAllHeaders
}
