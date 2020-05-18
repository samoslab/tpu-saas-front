<template>
  <div class="sPhone">
    <nav-bar title="设置手机号"></nav-bar>

    <van-cell-group>
      <van-field v-model="phone" label="手机号" placeholder="请输入手机号" />
    </van-cell-group>

    <van-field v-model="sms" center clearable label="短信验证码" placeholder="请输入短信验证码">
      <van-button slot="button" size="small" @click="getSms" :disabled="flag" type="info">
        获取验证码
        <span v-if="flag">({{count}})</span>
      </van-button>
    </van-field>

    <van-button class="btn" @click="setPhone" type="info" size="large">设置手机号</van-button>
    <div class="tip">提现和交易需要接收验证码，请先设置正确的手机号码</div>
  </div>
</template>

<script src="./sPhone.js">
</script>

<style lang="less" src="./sPhone.less" scoped>
</style>