<template>
  <div class="sPwd">
    <nav-bar title="设置登录密码"></nav-bar>

    <van-cell-group>
      <van-field v-model="sms" center clearable label="短信验证码" placeholder="请输入短信验证码">
        <van-button slot="button" size="small" @click="Code()" :disabled="flag" type="info">
          获取验证码
          <span v-if="flag">({{count}})</span>
        </van-button>
      </van-field>
    </van-cell-group>

    <van-cell-group>
      <van-field v-model="password" type="password" label="新密码" placeholder="请输入新密码" />
    </van-cell-group>

    <!-- <van-cell-group>
            <van-field v-model="site" 
            type="password" 
            label="确认密码" 
            placeholder="请再次输入密码"/>
    </van-cell-group>-->

    <van-button class="btn" @click="bind()" size="large" type="info">设置密码</van-button>
  </div>
</template>

<script src="./sPwd.js">
</script>

<style lang="less" src="./sPwd.less" scoped>
</style>