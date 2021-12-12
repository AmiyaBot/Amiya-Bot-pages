const {nav, sidebar} = require('../nav')
const {themeConfig, blogConfig} = require('./reco')

module.exports = {
    title: 'Amiya-Bot',
    description: '功能强大，简单易用的《明日方舟》机器人',
    head: [
        [
            'meta',
            {
                name: 'viewport',
                content: 'width=device-width,initial-scale=1,user-scalable=no'
            }
        ]
    ],
    dest: 'dist',
    markdown: {
        lineNumbers: true
    },
    theme: 'reco',
    themeConfig: {
        nav,
        sidebar,

        logo: '/logo.png',
        bgImage: '/bg.svg',

        lastUpdated: '上次更新',

        ...themeConfig
    },
    blogConfig: blogConfig
}
