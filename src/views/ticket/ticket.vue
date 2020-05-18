<template>
  <div class="redRecode">
    <nav-bar title="票务"></nav-bar>
    <div class="content">
      让数字货币支持票务购买，比如火车票、机票、电话卡、加油卡
      <ul>
        <li>支持NULS、TPU、ETH等等</li>
      </ul>
    </div>

    <div class="content">对演出票务特别支持，能快捷发行和流通数字票务。有演出票务需求场景的朋友们我们一起沟通...</div>

    <div class="content">火车票、机票等的支持在从老版本迁移测试</div>
  </div>
</template>

<script>
export default {
  name: "team",
  props: ["num"],
  data() {
    return {
      active: 0, // 我发布/收到 切换
      loading: false,
      finished: false,
      LoadingFlag: true,
      sendPage: 1,
      receivePage: 1,
      sendRedList: [], // 我发出的红包 数据 列表
      receiveRedList: [] // 我收到的红包 数据 列表
    };
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