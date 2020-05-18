<template>
  <div class="c-content">
    <van-nav-bar
      @click-left="onClickLeft"
      @click-right="onClickRight"
      :left-arrow="true"
      title="我的资产"
      class="c-nav-bar"
    ></van-nav-bar>
    <!-- right-text="账单" -->

    <div class="wallet_center">
      <div class="gross">
        <p>预估总资产</p>
        <div>
          <span class="balance">
            <p v-show="!flag">￥{{(capital*1+dscapital*1).toFixed(3)}}</p>
            <p v-show="flag">***,**</p>
            <em @click="hide()"></em>
          </span>
          <!-- <i>人民币</i> -->
        </div>
        <div class="capital">
          <p>可用资产:￥{{capital}}</p>
          <p>冻结资产:￥{{dscapital}}</p>
        </div>
      </div>

      <van-pull-refresh class="refresh" v-model="isLoading" @refresh="onRefresh">
        <div v-for="(item,index) in arr" :key="index">
          <div class="xtoken">
            <div class="xtoken_lt">
              <img :src="item.icon" alt />
            </div>
            <div class="xtoken_rt">
              <div>
                <p style="font-weight: 700;">{{item.token}}</p>
                <p>1 {{item.token}} = ¥ {{item.price.cny}}</p>
              </div>
              <div class="money">
                <p>{{(item.amount*1).toFixed(3)}}/{{(item.frozen*1).toFixed(3)}}</p>
                <p>¥ {{(item.amount * item.price.cny).toFixed(3)}}</p>
              </div>
            </div>
          </div>

          <div class="btnGroup">
            <div @click="skip(item)">充值</div>
            <!-- <div @click="toRechage" style="display:hidden;">记录</div> -->
            <div @click="toCash">提现</div>
          </div>
        </div>
      </van-pull-refresh>
    </div>

    <!-- <Loading v-if='mo_flag'></Loading> -->
  </div>
</template>

<script>
import axios from "axios";
// import Loading from '../Loading';

export default {
  name: "minePig",
  // components: { Loading },
  data() {
    return {
      capital: "",
      dscapital: "",
      flag: false,
      isLoading: false,
      arr: [],
      amount: 0,
      mo_flag: true
    };
  },
  created() {
    this.code();
  },
  methods: {
    hide() {
      this.flag = !this.flag;
    },
    skip(item) {
      let data = [];
      data.push((item.amount * 1 + item.cny).toFixed(4));
      data.push(item.token);
      // console.log(data)
      this.$router.push({
        path: "/recharge-coin",
        query: { data: data, icon: item.icon }
      });
    },
    //提现
    toCash() {
      this.$router.push({ path: "/my-cash", query: {} });
    },
    //记录
    toRechage() {},
    code() {
      this.$post2("user/api/index/tokenset", {})
        .then(res => {
          this.arr = res.token_set;
          this.capital = res.summary.total_amount_cny;
          this.dscapital = res.summary.total_amount_frozen_cny;
          // console.log(res);
        })
        .catch(e => {
          console.log(e);
        });

      //  this.$post("redpkt/Share/pktinfo", {
      //      'rid':'redpkt.SAMO.201909141254-1'

      //   })
      //     .then(res => {
      //       console.log(res);
      //     })
      //     .catch(e => {
      //       console.log(e);
      //     });

      //  'http://api.yqkkn.com/user/api/index/tokenset'
      //  this.
      // let url = window.globalData.config.domain + '/user/tokenPrice';
      // axios.post(url,{
      //     cmd:'123',
      //     body:{
      //         accessToken: localStorage.token,
      //         uid:localStorage.uid,
      //         appid:localStorage.appid
      //     }
      // }).then( (res) => {
      //     // console.log(res.data)
      //     this.arr = res.data;
      //     res.data.forEach( (item) => {
      //         // console.log(item)
      //         this.mo_flag = false;
      //         this.amount += item.money;
      //     })
      // })
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.$router.push("/wallet/bill");
    },
    onRefresh() {
      this.amount = 0;
      setTimeout(() => {
        this.code();
        this.$toast("刷新成功");
        this.isLoading = false;
      }, 500);
    }
  }
};
</script>
<style scoped lang='less'>
// @import url("../../assets/css/all.less");
.c-content {
  width: 100%;
  height: 100%;
  font-size: 16px;
  flex-direction: column;
  .wallet_center {
    // width: 100%;
    padding: 0 calc(3vh);
    padding-bottom: 20px;
    .gross {
      // width: 100%;
      height: 160px;
      margin-top: 24px;
      margin-bottom: 24px;
      padding-left: 40px;
      padding-top: 24px;
      border-radius: 16px;
      background: #00c0ed;
      color: white;
      > p {
        padding-bottom: 20px;
        color: white;
      }
      span {
        display: flex;
        font-size: 24px;
        line-height: 24px;
        p {
          width: 230px;
          display: inline-block;
          margin-right: 16px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          flex: 1;
        }
      }
      i {
        font-size: 10px;
        color: white;
      }
      em {
        background: url("../../assets/imgs/my/eye.png") no-repeat;
        background-size: 24px;
        width: 24px;
        height: 24px;
        display: inline-block;
        margin-right: 40px;
      }
    }
    .refresh {
      height: 100%;
    }
    .xtoken {
      width: 100%;
      height: 50px;
      margin-top: 10px;
      display: flex;

      .xtoken_lt {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        margin-right: 16px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .xtoken_rt {
        flex: 1;
        display: flex;
        font-size: 14px;
        // padding-right: 40px;
        > div {
          width: 130px;
          flex: 1;
        }
        p {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 14px;
        }
        .money {
          text-align: right;
        }
      }
    }
    .btnGroup {
      display: flex;
      justify-content: space-between;
      border-bottom: 2px solid #ddd;
      padding-left: 48px;
      padding-bottom: 0.2rem;
      font-size: 0.3rem;
    }
  }
}
.c-nav-bar {
  span {
    font-size: 16px !important;
  }
}
.capital {
  margin-top: 15px;
  p {
    line-height: 35px;
  }
}
</style>
