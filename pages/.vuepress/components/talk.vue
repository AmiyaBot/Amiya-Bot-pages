<template>
    <div class="talk">
        <i style="font-size: 18px">「{{ desc[Math.floor(Math.random() * desc.length)] }}」</i>
        <div style="width: 100%;text-align: right">—— 阿米娅</div>
    </div>
</template>

<script>
import desc from '../desc'

export default {
    name: "talk",
    data() {
        return {
            desc: desc
        }
    }
}
</script>

<style scoped>
.talk {
    background: rgb(246 246 246 / 50%);
    padding: 15px 20px;
    border-radius: 6px;
}
</style>
