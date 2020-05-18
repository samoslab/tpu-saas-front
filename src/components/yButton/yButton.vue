<template>
    <div class="y_button" @click="click">
        <div 
            class="btn"
            :class="{blue:blue}"
            >
            <slot name="content">
                按钮默认文字
            </slot>
        </div>
    </div>
</template>

<script src="./yButton.js">
</script>

<style lang="less" src="./yButton.less" scoped>
    
</style>