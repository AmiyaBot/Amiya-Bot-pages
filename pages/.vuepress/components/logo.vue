<template>
    <div class="logo">
        <img alt="AmiyaBot" :src="url">
    </div>
</template>

<script>
export default {
    name: "logo",
    data() {
        return {
            url: 'https://cos.amiyabot.com/resource/logo.png'
        }
    }
}
</script>

<style scoped>
.logo {
    text-align: center;
}

img {
    width: 240px;
    height: 240px;
}
</style>
