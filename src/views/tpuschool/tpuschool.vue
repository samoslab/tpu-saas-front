<template>
  <div class="tpuschool">
    <nav-bar title="TPUSchool"></nav-bar>

    <div class="content">
      区块链相关
      <ul>
        <li>学习资料</li>
        <li>案例教学</li>
        <li>解决方案</li>
      </ul>
    </div>
    <div class="content">NULS/BTC/ETH/Fabric</div>
    <div class="content">收集资料中...</div>

    <!-- <y-button blue>
      <template v-slot:content>建设中</template>
    </y-button>-->
  </div>
</template>

<script>
export default {
  name: "tpuschool",
  data() {
    return {
      title: "TPUSchool"
    };
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.content {
  color: white;
  padding: 1rem;
  border-radius: 5%;
  margin: 0.3rem;
  background-color: gray;
  ul {
    padding-left: 0.5rem;
  }
}
</style>