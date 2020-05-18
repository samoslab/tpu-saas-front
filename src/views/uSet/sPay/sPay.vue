<template>
  <div class="sPay">
    <nav-bar title="交易密码绑定"></nav-bar>

    <van-cell-group>
      <van-field
        v-model="inputCode
                    "
        center
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码"
      >
        <van-button slot="button" size="small" @click="onSendCode()" :disabled="flag" type="info">
          获取验证码
          <span v-if="codeSending">({{theTime}})</span>
        </van-button>
      </van-field>
    </van-cell-group>
    <van-cell-group>
      <van-field v-model="paypwd" type="password" label="交易密码" placeholder="请输入交易密码" />
    </van-cell-group>

    <van-button class="btn" @click="bindPwd()" size="large" type="info">绑定交易密码</van-button>
  </div>
</template>

<script src="./sPay.js">
</script>

<style lang="less" src="./sPay.less" scoped>
</style>