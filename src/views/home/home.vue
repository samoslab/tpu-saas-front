<template>
  <div class="home">
    <!-- 扫一扫 付钱 收钱 财富 (蓝色区域) -->

    <div class="title">
      <!-- <router-link to="/test">
        <i class="iconfont icon-saoma"></i>
        <span>扫一扫</span>
      </router-link>-->
      <!-- <router-link to="/fuqian">
        <i class="iconfont icon-fukuan"></i>
        <span>付钱</span>
      </router-link>
      <router-link to="/shouqian">
        <i class="iconfont icon-shoukuan"></i>
        <span>收钱</span>
      </router-link>-->
      <router-link to="/coffer">
        <i class="iconfont icon-caifu"></i>
        <span>财富</span>
      </router-link>
    </div>
    <!-- <div class="tip">
        <h3>给</h3>
    </div>-->

    <!-- 红包... 12个选项 -->
    <div class="nav">
      <router-link v-for="(item,index) in navList" :to="item.to" :key="index">
        <i class="iconfont" :class="'icon-'+item.icon"></i>
        <span :class="item.class">{{item.name}}</span>
      </router-link>
    </div>

    <div class="about">
      <div class="about_title">TPU星火插件SAAS市场</div>
      <div class="about_content">致力于为区块链项目提供落地应用插件，当前开放红包插件</div>
    </div>
    <div class="about">
      <div class="about_title">合伙人招募</div>
      <div class="about_content">欢迎加入我们成为技术、产品、运营、社区合伙人，一起来推进整个SAAS平台建设</div>
    </div>

    <!-- 底部切换栏 -->
    <tab-bar></tab-bar>
  </div>
</template>

<script src="./home.js">
// import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from "vue-qrcode-reader";

// const MyComponent = {
//   components: {
//     QrcodeStream,
//     QrcodeDropZone,
//     QrcodeCapture
//   }
// };
</script>

<style lang="less" src="./home.less" scoped>
</style>