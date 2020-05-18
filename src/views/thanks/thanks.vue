<template>
  <div class="thanks">
    <nav-bar title="感谢"></nav-bar>
    <div class="content_project">
      <p>
        Samos/TPU项目自2017年启动以来，获得了很多人的支持和帮助，包括资金、宣传、市场机会、
        代码贡献、建议等等，对此深表感谢！
      </p>
    </div>
    <!-- <div class="content_people">
      <h3>支持者权益</h3>
    </div>-->

    <div class="content_people">
      <h3>贡献者排名不分先后</h3>
      <ul>
        <li>红色蚂蚁</li>
        <li>梁伟</li>
        <li>李森</li>
        <li>高超</li>
        <li>Ben</li>
        <li>Silver</li>
        <li>Sam</li>
        <li>Noker</li>
        <li>吧嗒超</li>
      </ul>
      <p>还有排名者</p>
    </div>
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
.content_project {
  color: white;
  padding: 0.3rem;
  border-radius: 5%;
  margin: 0.2rem;
  background-color: lightseagreen;
  height: 4rem;
  ul {
    padding-left: 0.5rem;

    li {
      display: block;
      float: left;
      width: 1.3rem;
    }
  }
  p {
    padding-left: 0.5rem;
  }
}

.content_people {
  color: white;
  padding: 0.2rem;
  border-radius: 5%;
  margin: 0.2rem;
  background-color: lightseagreen;
  height: 4rem;
  ul {
    padding-left: 0.5rem;

    li {
      display: block;
      float: left;
      width: 1.3rem;
    }
  }
  p {
    padding-left: 0.5rem;
  }
}
</style>