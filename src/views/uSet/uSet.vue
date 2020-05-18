<template>
  <div class="uSet">
    <nav-bar title="设置"></nav-bar>

    <van-cell title="设置手机号" is-link to="/sPhone" />
    <van-cell title="登录密码" is-link to="/sPwd" />
    <van-cell title="交易密码" is-link to="/sPay" />

    <!-- <van-cell title="默认通证" is-link @click="tongzhengShow=true" /> -->
    <van-cell title="昵称设置" is-link @click="nicknameShow=true" />
    <!-- <van-cell title="头像设置" is-link @click="avatarShow=true" /> -->

    <!-- 默认通证 弹出层 -->
    <van-popup v-model="tongzhengShow" position="bottom" :overlay="true">
      <van-picker show-toolbar :columns="columns" @cancel="TZCancel" @confirm="TZConfirm" />
    </van-popup>

    <!-- 昵称设置 弹出层 -->
    <van-dialog v-model="nicknameShow" title="设置昵称" show-cancel-button @confirm="nicknameConfirm">
      <van-cell-group>
        <van-field
          v-model="nickname"
          ref="autofocus"
          maxlength="24"
          left-icon="contact"
          placeholder="请输入新的昵称"
        />
      </van-cell-group>
    </van-dialog>

    <!-- 头像设置 弹出框 -->
    <van-dialog v-model="avatarShow" title="头像上传" show-cancel-button @confirm="avatarConfirm">
      <div class="avatar">
        <img class="img" v-if="fileList!=''" :src="fileList" alt />
        <van-uploader v-else :after-read="afterRead" />
      </div>
    </van-dialog>
  </div>
</template>

<script src="./uSet.js">
</script>

<style lang="less" src="./uSet.less" scoped>
</style>