<template>
  <div class="test">
    <nav-bar>建设中</nav-bar>
    <div class="content">
      <ul>
        <li>基于区块链的相关应用</li>
      </ul>
    </div>
    <div class="content">建设中...</div>
  </div>
</template>

<script>
export default {
  name: "test",
  data() {
    return {};
  }
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