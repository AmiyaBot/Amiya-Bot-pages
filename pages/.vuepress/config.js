const {nav, sidebar} = require('../nav')

module.exports = {
    title: 'Amiya-Bot',
    description: '极简易部署的《明日方舟》机器人',
    dest: 'dist',
    base: '/Amiya-Bot/',
    plugins: [
        '@vuepress/back-to-top',
        '@vuepress/plugin-blog'
    ],
    markdown: {
        lineNumbers: true
    },
    themeConfig: {
        nav,
        sidebar,

        logo: '/logo.png',

        smoothScroll: true,
        displayAllHeaders: true,

        lastUpdated: '上次更新',

        repo: 'AmiyaBot/Amiya-Bot',
        repoLabel: '查看源码'
    },
    extend: '@vuepress/theme-default'
}
