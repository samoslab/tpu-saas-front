<template>
  <div class="feedback">
    <nav-bar title="反馈"></nav-bar>

    <div>
      <p class="ptitle">欢迎和团队沟通</p>
    </div>
    <div class="bindSite_cen">
      <van-cell-group>
        <van-field
          v-model="message"
          type="textarea"
          placeholder="请输入沟通事项"
          rows="1"
          border
          label-width="60"
          maxlength="300"
          :autosize="{ maxHeight: 200, minHeight: 100}"
        />
      </van-cell-group>
    </div>
    <van-button class="btn" @click="bind()" size="large" type="info">马上发送</van-button>
  </div>
</template>

<script src="./feedback.js">
</script>

<style lang="less" src="./feedback.less" scoped>
</style>