const nav = [
    {text: '主页', link: '/', icon: 'reco-home'},
    {
        text: '文档', items: [
            {text: '通过代码部署', link: '/docs/deployByCode/', icon: 'reco-tag'},
            {text: '通过安装包部署', link: '/docs/deployByExe/', icon: 'reco-tag'},
            {text: '如何维护', link: '/docs/maintain/', icon: 'reco-tag'},
            {text: '使用 Amiya-Bot-console', link: '/docs/amiyaConsole/', icon: 'reco-tag'},
        ],
        icon: 'reco-document'
    },
    {
        text: '说明', items: [
            {text: '功能指引', link: '/blog/function/', icon: 'reco-tag'},
            {text: 'Amiya的测试工房', link: '/blog/notice/', icon: 'reco-tag'},
        ],
        icon: 'reco-faq'
    },
    {text: '公告', link: '/timeline/', icon: 'reco-tongzhi'},
    {text: '留言板', link: '/board/', icon: 'reco-suggestion'},
    {text: '查看源码', link: 'https://www.amiya.cn', icon: 'reco-github'}
]
const sidebar = 'auto'

module.exports = {
    nav,
    sidebar
}
