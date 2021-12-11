const nav = [
    {text: '主页', link: '/'},
    {
        text: '文档', items: [
            {text: '功能指引', link: '/docs/function/'},
        ]
    },
    {
        text: '说明', items: [
            {text: 'Amiya的测试工房', link: '/blog/notice/'},
        ]
    },
]
const sidebar = 'auto'

module.exports = {
    nav,
    sidebar
}
