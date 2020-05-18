<template>
  <div class="c-content">
    <nav-bar title="提现申请" @click-right="onClickRight">
      <van-icon name="wap-home-o" slot="right" />
    </nav-bar>

    <!-- <van-nav-bar
      @click-left="onClickLeft"
      @click-right="onClickRight"
      :left-arrow="true"
      title="提现请求"
      class="c-nav-bar"
    >-->
    <!-- </van-nav-bar> -->

    <div class="extract">
      <van-cell-group>
        <!-- <van-field 
                :placeholder="data.phone" 
                disabled
        label="手机号"/>-->

        <van-field disabled :placeholder="data.token" label="提现通证" v-model="withdrawAddress">
          <van-button
            slot="button"
            @click="bindAddress"
            class="getcode"
            size="small"
            type="primary"
          >绑定</van-button>
        </van-field>

        <van-field disabled :placeholder="amount" label="可用数量" />
        <van-field disabled :placeholder="frozen" label="冻结数量" />
        <van-field center clearable v-model="data.Code" label="短信验证码" placeholder="请输入短信验证码">
          <van-button
            slot="button"
            @click="getCode"
            class="getcode"
            size="small"
            :disabled="flag"
            type="primary"
          >
            发送验证码
            <span v-show="flag">({{count}})</span>
          </van-button>
        </van-field>
        <van-field
          v-model="data.withdrawAmount"
          @blur="feeCalcute"
          placeholder="请输入提现数量"
          label="提现数量"
        />

        <van-field v-model="tradepwd" type="password" placeholder="请输入交易密码" label="交易密码" />

        <div class="charge">
          <p>服务费选择</p>
          <van-radio-group class="charge_" v-model="feetoken">
            <van-radio
              v-for="item in currencyOption"
              :key="item"
              @click="feeCalcute"
              class="charge_z"
              :name="item"
            >{{item}}</van-radio>
            <!-- <van-radio class='charge_z' name="2">{{ data.token }}</van-radio> -->
          </van-radio-group>
        </div>
      </van-cell-group>
      <div class="cost">
        <div>最低提现数量{{withdraw_min}},可提现数量{{balance}}</div>
        <div>服务费:{{serviceCharge.fee}} {{serviceCharge.feetoken}},收到：{{serviceCharge.receiveAmount}} {{serviceCharge.token}}</div>
      </div>
    </div>

    <van-button class="btn" v-if="showBtn" @click="doWithdraw" size="large">发送请求</van-button>
  </div>
</template>

<script>
// import axios from "axios";
// import Vue from "vue";
import { Dialog } from "vant";

export default {
  name: "withdraw",
  data() {
    return {
      serviceCharge: "",
      txid: "",
      data: {
        phone: localStorage.phone,
        Code: "",
        token: this.$route.query.token,
        withdrawAmount: "",
        receiveAmount: "",
        site: ""
      },
      sid: "",
      tradepwd: "",
      feetoken: this.$route.query.token,
      flag: false,
      show: true,
      count: "",
      timer: null,
      // Token: '',
      rate: "",
      clientHeight: document.documentElement.clientHeight,
      showBtn: true,
      balance: 0,
      currencyOption: [],
      withdraw_min: 1,
      withdrawAddress: "",
      amount: "",
      frozen: "",

      token: this.$route.query.token,
      receiveAmount: ""
    };
  },
  created() {
    // this.token = this.$route.query.token;
  },
  mounted() {
    this.feeCalcute();
    this.getFeeTokenSet();
    // this.getToken();
    this.prepareWithdraw();

    window.onresize = () => {
      if (this.clientHeight > document.documentElement.clientHeight) {
        //    this.showBtn =false
      } else {
        this.showBtn = true;
      }
    };

    let tokenset = JSON.parse(localStorage.userTokenSet);
    console.log(tokenset);
    console.log(this.token);
    for (var idx in tokenset) {
      var item = tokenset[idx];

      if (item.token == this.token) {
        this.amount = item.amount;
        this.frozen = item.frozen;
        this.balance = parseFloat(this.amount);

        console.log(this.amount);
      }
    }
  },
  methods: {
    bindAddress() {
      this.$router.push({ path: "/bindAddress", query: { token: this.token } });
    },
    onClickRight() {
      this.$router.push({ path: "/coffer" });
    },
    feeCalcute() {
      if (this.data.withdrawAmount < this.withdraw_min) {
        this.$toast("提现数量小于最低提现数量：" + this.withdraw_min);
      } else if (this.data.withdrawAmount <= 0) {
        this.$toast("提现数量必须大于零");
      } else if (this.data.withdrawAmount > this.balance) {
        this.$toast(
          "提现数量大于可用余额:" +
            this.data.withdrawAmount +
            " ,balance:" +
            this.balance
        );
      } else {
        // '      http://api.yqkkn.com/pay/index/fee'
        this.$post2("pay/api/index/fee", {
          feetoken: this.feetoken,
          op: "withdraw",
          amount: this.data.withdrawAmount,
          token: this.token,
          balance: this.balance
        })
          .then(res => {
            this.serviceCharge = res;
            console.log(res);
          })
          .catch(err => {
            this.$toast(err);
          });
      }
    },
    getFeeTokenSet() {
      this.$post2("pay/api/index/feetokenset", {
        token: this.data.token
      }).then(res => {
        this.currencyOption = res;
      });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    prepareWithdraw() {
      this.$post("pay/api/index/prepareWithdraw", {
        token: this.data.token
      }).then(res => {
        console.log(res);
        if (res.code == 1) {
          //检查交易密码
          Dialog.confirm({
            title: "提现",
            message: "请先设置交易密码"
          })
            .then(() => {
              this.$router.push({ path: "/sPay" });
            })
            .catch(() => {
              // on cancel
            });
        } else if (res.code == 100) {
          //没有绑定提币地址
          Dialog.confirm({
            title: "提现",
            message: "请先设置提币地址"
          })
            .then(() => {
              this.$router.push({
                path: "/bindAddress",
                query: { token: this.token }
              });
            })
            .catch(() => {
              // on cancel
            });
        } else {
          console.log("set asset data");
          this.txid = res.result.txid;
          this.balance = parseFloat(res.result.asset.amount);
          this.amount = res.result.asset.amount;
          this.frozen = res.result.asset.frozen;
          this.withdrawAddress = res.result.asset.address;
          this.withdraw_min = parseFloat(res.result.asset.withdraw_min);
        }
      });
    },
    getCode() {
      //验证码
      const TIME_COUNT = 60;
      if (this.flag == false) {
        this.$post2("security/user/authsmscode", {}).then(res => {
          console.log(res);
          this.sid = res.sid;
        });
      }
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.flag = true;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.flag = false;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
    doWithdraw() {
      this.$post3("pay/api/index/beginWithdraw", {
        token: this.data.token,
        feetoken: this.feetoken,
        op: "withdraw",
        amount: this.data.withdrawAmount,
        tradepwd: this.$SHA256(this.tradepwd),
        txid: this.txid,
        code: this.data.Code,
        sid: this.sid
      })
        .then(res => {
          console.log(res);
          this.$toast("申请成功");
          // this.$router.push({ path: "/my-rechargeWithdrawal" });
          this.prepareWithdraw();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped lang='less'>
.extract {
  .getcode {
    // background: #00c0ed;
    background: var(--bgColor);
    color: #fff;

    border: none;
    width: 128px;
    text-align: center;
  }
}
.btn {
  width: 100%;
  // background: #00c0ed;
  background: var(--bgColor);

  position: absolute;
  bottom: 0;
  color: white;
  border: none;
}
.cost {
  font-size: 12px;
  margin-top: 10px;
  padding: 0 10px;
  // width: 100%;
  text-align: center;
  color: green;
}
.charge {
  // width: 100%;
  height: 40px;
  display: flex;
  padding: 0 15px;
  line-height: 40px;
  font-size: 14px;
  > p {
    width: 120px;
  }
  .charge_ {
    width: 100%;
    display: flex;
    .charge_z {
      flex: 1;
    }
  }
}
.c-nav-bar {
  background: var(--bgColor);
  color: #fff;

  span,
  i {
    font-size: 24px !important;
  }
}
</style>
