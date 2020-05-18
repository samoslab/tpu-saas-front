<template>
     <div class="wrap">
      <van-nav-bar 
        @click-left="onClickLeft"
        :left-arrow="true"
        title="活动屋"
        class="c-nav-bar">
        </van-nav-bar>

        <div class='record' style="top:0">
            <van-tabs v-model="active">
            <van-tab title="过往活动">
                <ActivityList></ActivityList>
            </van-tab>
            <van-tab title="最新活动">
            </van-tab>
            </van-tabs>
        </div>

  </div>
</template>

<script>
import foot from "@/components/foot.vue";
import ActivityList from '../Record/ActivityList';

export default {
  name: "",
  components: {
    foot,
    ActivityList,
  },

   data() {
        return {
            active: 0
        }
    },
    methods:{
        onClickLeft(){
            this.$router.go(-1);
        }
    }
}
</script>
<style lang="less" scoped>
  .wrap{
    padding:0;
  }
 

  .whiteBox{
    background: #fff;
  }
  .sendName{
    font-size:0.3rem;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(26,24,24,1);
    padding-top: 1rem;
    text-align:center;
  }
  .secret{
    font-size: 0.3rem;
    font-family: PingFang SC;
    font-weight: 400;
    color: #777575;
    padding: 0.2rem 0.4rem 0;
    text-align: center;
  }
  .formBox{
    padding-top:0.1rem;
    .form-item{
      padding:0 0.25rem 0 0.45rem;
      border-bottom: 0.03rem solid #E73C32;
      .form-item-line1{
        display: flex;
        justify-content: space-between;
        padding:0.3rem 0;
        .left{
          font-size:0.3rem;
          width:30%;
        }
        input{
          padding: 0.02rem 0;
          border:none;
          width: 70%;
          font-size: 0.28rem;
          color:#410E0E;
          font-weight: bold;
          outline: none;
        }
        .right{
          width:70%;
        }
        .btnopen{
          font-size: 0.22rem;
          background: #e73b32;
          color: #fff;
          border: 1px solid #e73b32;
          border-radius: 5px;
          outline: none;
          width: 20%;
          line-height: 1.7;
        }
      }
    }
    .btn-groups{
      display: flex;
      height:1.12rem;
      div{
        line-height: 1.12rem;
        text-align: center;
        font-size:0.3rem;
        font-family:PingFang SC;
        font-weight:400;
        
        flex:1;
        a{
          color:rgba(26,24,24,1);
        }
      }
    }
  }

  .geted{
    margin:0.4rem auto 0;
    width:100%;
    background:rgba(182,31,38,.64);
    border-top-right-radius:0.2rem;
    border-top-left-radius:0.2rem;
    padding:0.3rem;
    box-sizing: border-box;
    .tittle{
      font-size:0.24rem;
      font-weight:400;
      color:rgba(239,159,158,1);
    }
    .scrollBox{
      overflow-y:scroll;
      height: 5rem;
      margin-top:0.4rem;
      &>li{
        display: flex;
        margin-bottom: 0.25rem;
        .picBox{
          width:0.54rem;
          height:0.54rem;
          line-height: 0.54rem;
          border-radius: 50%;
          overflow: hidden;
          margin-right:0.2rem;
          background:pink;
          img{
            width:0.54rem;
            height:0.54rem;
          }
        }
        .name{
          font-size:0.24rem;
          font-weight:400;
          color:rgba(255,190,190,1);
          flex:1;
          line-height: 0.54rem;
        }
        .right{
          font-size:0.2rem;
          color:rgba(239,159,158,1);
        }
      }
    }
  }
</style>
