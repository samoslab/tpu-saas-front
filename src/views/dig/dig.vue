<template>
  <div class="tpuschool">
    <nav-bar title="挖矿"></nav-bar>

    <div class="content">
      行为挖矿
      <ul>
        <li>基于区块链的行为挖矿插件</li>
      </ul>
    </div>
    <div class="content">我有很好对想法，就差一个程序员来实现了：）</div>

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