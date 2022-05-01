<template>
    <a @click="download">点击下载最新可执行文件</a>
</template>

<script>
import axios from 'axios'

const cos = 'https://cos.amiyabot.com/package'

export default {
    name: "downloadPack",
    methods: {
        download: function () {
            axios.get(`${cos}/version6.txt`).then(response => {
                window.open(`${cos}/AmiyaBot-${response.data}.zip`)
            })
        }
    }
}
</script>

<style scoped>
a {
    cursor: pointer;
}
</style>
