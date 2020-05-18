<template>
  <div class="nav_bar_por">
    <div class="nav_bar" :class="transparent?'transparent_nav_bar':''">
      <i class="iconfont icon-zuo" @click="routerBack" v-show="left"></i>

      {{title}}
      <div class="right">
        <van-icon name="wap-home-o" @click="onClickUc" slot="right" />
      </div>
    </div>
  </div>
</template>

<script src="./navBar.js">
</script>

<style lang="less" src="./navBar.less" scoped>
</style>