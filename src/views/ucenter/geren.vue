<template>
  <div class="geren">
    <nav-bar title="个人中心" :left="false" />

    <div class="geren_info">
      <!-- 头像 用户名 电话 -->
      <div class="geren_info_title">
        <img :src="avatar" class="avatar" />
        <div class="description">
          <div class="name">{{username}}</div>
          <div class="tel">{{phoneNum}}</div>
        </div>
      </div>

      <!-- 账单 TPU会员 总资产 余额 余额宝 等导航 -->
      <div class="nav">
        <van-cell is-link to="/coffer">
          <template slot="title">
            <i class="iconfont icon-qingdan"></i>
            <span class="custom-title">我的资产</span>
          </template>
        </van-cell>

        <!-- <van-cell is-link>
                    <template slot="title">
                        <i class="iconfont icon-qingdan"></i>
                        <span class="custom-title">TPU会员</span>
                    </template>
                </van-cell>

                <van-cell is-link to="/coffer">
                    <template slot="title">
                        <i class="iconfont icon-qingdan"></i>
                        <span class="custom-title">总资产</span>
                    </template>
                </van-cell>

                <van-cell is-link to="/yue">
                    <template slot="title">
                        <i class="iconfont icon-qingdan"></i>
                        <span class="custom-title">余额</span>
                    </template>
                </van-cell>

                <van-cell is-link>
                    <template slot="title">
                        <i class="iconfont icon-qingdan"></i>
                        <span class="custom-title">余额宝</span>
                    </template>
        </van-cell>-->
      </div>

      <!-- 红包记录 -->
      <div class="nav">
        <van-cell is-link to="/redRecode">
          <template slot="title">
            <i class="iconfont icon-qingdan q"></i>
            <span class="custom-title">红包记录</span>
          </template>
        </van-cell>

        <van-cell is-link to="/cashflow">
          <template slot="title">
            <i class="iconfont icon-fukuan b"></i>
            <span class="custom-title">充提记录</span>
          </template>
        </van-cell>

        <van-cell is-link to="/uSet">
          <template slot="title">
            <i class="iconfont icon-shezhi y"></i>
            <span class="custom-title">个人设置</span>
          </template>
        </van-cell>
        <van-cell is-link to="/team">
          <template slot="title">
            <i class="iconfont icon-liaotian p"></i>
            <span class="custom-title">邀请奖励</span>
          </template>
        </van-cell>
        <!-- 
        <van-cell is-link to="/myMsg">
          <template slot="title">
            <i class="iconfont icon-liaotian g"></i>
            <span class="custom-title">我的消息</span>
          </template>
        </van-cell>-->

        <van-cell is-link to="/feedback">
          <template slot="title">
            <i class="iconfont icon-fankui p"></i>
            <span class="custom-title">我要反馈</span>
          </template>
        </van-cell>
      </div>
      <div class="nav">
        <van-cell is-link @click="logoutHandle">
          <template slot="title">
            <i class="iconfont icon-tuichu r"></i>
            <span class="custom-title">退出登录</span>
          </template>
        </van-cell>
      </div>

      <div class="guard"></div>
    </div>

    <tab-bar></tab-bar>
  </div>
</template>

<script src="./geren.js">
</script>

<style lang="less" src="./geren.less" scoped>
</style>