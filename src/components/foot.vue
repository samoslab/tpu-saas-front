<template>
  <div class="tabs">
    <!--命名路由-->
    <ul>
      <!--this inspection reports XML/HTML tags with missing mandatory attrbutes ,you can specify attrbute name that should not  be reported-->
      <!--home被点击后，一直处于激活状态，因此需要使用精确匹配模式，在router-link中添加exact属性-->
      <router-link :to="{name:'send'}" tag="li" exact>
        <div>
          <img :src="this.$route.path=='/'?require('../assets/imgs/foot/sendS.png'):require('../assets/imgs/foot/send.png')" alt="发红包" />
        </div>
        <div>发红包</div>
      </router-link>
      <router-link :to="{name:'plaza'}" tag="li">
        <div>
          <img :src="this.$route.path=='/plaza'?require('../assets/imgs/foot/getS.png'):require('../assets/imgs/foot/get.png')" alt="领红包" />
        </div>
        <div>红包广场</div>
      </router-link>
      <router-link :to="{name:'find'}" tag="li">
        <div>
          <img :src="this.$route.path=='/find'?require('../assets/imgs/foot/findS.png'):require('../assets/imgs/foot/find.png')" alt="发现" />
        </div>
        <div>发现</div>
      </router-link>
      <router-link :to="{name:'my'}" tag="li">
        <div>
          <img :src="this.$route.path=='/my'?require('../assets/imgs/foot/myS.png'):require('../assets/imgs/foot/my.png')" alt="我的" />
        </div>
        <div>我</div>
      </router-link>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'foot',
  }
</script>
<style lang="less" type="text/less">
  .tabs {
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #fff;
    box-shadow: 0 2px 4px #000;
    width: 100%;
    & > ul, & > ul > li {
      margin: 0;
      padding: 0;
    }
    ul {
      display: table;
      width: 100%;
      & > li {
        text-align: center;
        font-size: 16px;
        display: table-cell;
        padding: 8px 12px;
        cursor: pointer;
        &.router-link-active{
          color: #FF6969;
        }
        & > div {
          font-size: 14px;
          & > img {
            width:0.5rem;
            height:0.5rem;
          }
        }
      }
    }
  }
</style>
