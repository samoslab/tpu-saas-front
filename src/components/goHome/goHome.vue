<template>
    <div 
        :style="{
            top:`${top}px`,
            left:`${left}px`,
        }"
        class="go_home" 
        @click="goHome"
        @touchmove.prevent="move($event)"
        >
        <i class="iconfont icon-fanhui"></i>
    </div>
</template>

<script src="./goHome.js">
</script>

<style lang="less" src="./goHome.less" scoped>
    
</style>