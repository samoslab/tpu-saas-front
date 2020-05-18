<template>
  <div class="container">
    <nav-bar title="TPULive"></nav-bar>
    <div class="content">
      <!-- <router-link to="/room?topic_id=4"> -->
      <!-- <i class="iconfont icon-saoma"></i> -->
      <span>我们希望有一个简单的插件，能让团队快捷的和社群互动和沟通，直接汇集项目的相关情况</span>
      <!-- </router-link> -->
    </div>
    <div class="content">
      <ul>
        <li>项目日报周报</li>
        <li>相关网址</li>
        <li>AMA活动归档</li>
        <li>AMA文字直播</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "team",
  props: ["num"],
  data() {
    return {};
  },
  watch: {},
  methods: {
    // 获取 我发出的红包 数据 列表
  },
  created() {}
};
</script>

<style lang="less" scoped>
.content {
  color: white;
  padding: 1rem;
  border-radius: 5%;
  margin: 0.3rem;
  background-color: lightseagreen;
  ul {
    padding-left: 0.5rem;
  }
}
</style>