<template>
  <div class="container">
    <nav-bar title="TPU公益"></nav-bar>
    <div class="content">
      赠人玫瑰，手有余香
      <ul>
        <li>支持真实、有效声音的传播</li>
        <li>支持先锋科技和文化的推广</li>
      </ul>
    </div>
    <div class="content">通过我们的努力，我们可以让这个世界变得更好一点...</div>
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