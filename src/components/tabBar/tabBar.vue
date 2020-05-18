<template>
  <div class="tab_bar_por">
    <div class="tab_bar">
      <!-- 首页 -->
      <router-link to="/">
        <i class="iconfont icon-shouye"></i>
        <span>首页</span>
      </router-link>

      <!-- 转账 -->
      <!-- <router-link 
                to="/transfer" 
                >
                <i class="iconfont icon-qianbao"></i>
                <span>转账</span>
      </router-link>-->

      <!-- 通讯录 -->
      <!-- <router-link to="/tongxunlu">
        <i class="iconfont icon-liaotian"></i>
        <span>通讯录</span>
      </router-link>-->

      <!-- 个人中心 -->
      <router-link to="/geren">
        <i class="iconfont icon-yonghu"></i>
        <span>个人中心</span>
      </router-link>
    </div>
  </div>
</template>

<script src="./tabBar.js">
</script>

<style lang="less" src="./tabBar.less" scoped>
</style>