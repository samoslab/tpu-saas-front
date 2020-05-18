<template>
  <div class="sPhone">
    <nav-bar :title="'未登录领取'+token+'红包'"></nav-bar>

    <van-cell-group>
      <van-field v-model="phone" label="手机号" placeholder="请输入手机号" />
      <van-field v-model="code" center clearable label="验证码" placeholder="请输入短信验证码">
        <van-button slot="button" size="small" @click="getSms" :disabled="flag" type="info">
          获取验证码
          <span v-if="flag">({{count}})</span>
        </van-button>
      </van-field>

      <van-field v-model="secret" v-show="secret" label="口令" placeholder="请输入口令" />
    </van-cell-group>

    <van-cell-group>
      <van-field v-model="wishing" label="祝福语" :placeholder="wishing" readonly />
      <van-field v-model="sendName" label="发送者" :placeholder="sendName" readonly />
      <van-field v-model="num" label="总个数" :placeholder="num+''" readonly />
      <van-field v-model="amount" label="总金额" :placeholder="amount+''" readonly />
      <van-field v-model="opened_num" label="已领" :placeholder="opened_num+''" readonly />
    </van-cell-group>

    <van-button class="btn" @click="takeHongbao" type="info" size="large">领取红包</van-button>
  </div>
</template>

<script>
import { Dialog } from "vant";

export default {
  name: "takehongbao",
  data() {
    return {
      phone: "", // 手机号
      sms: "", // 短信验证码
      flag: false, // 获取验证码 是否禁用
      count: 60, // 60s 倒计时
      timer: null, // 倒计时的 定时器
      sid: "", // 验证
      refcode: "",
      secret: "",
      active: 0,

      history: [],
      kouLing: "",
      rid: "",
      app: "",
      fromt: "",
      sendName: "", //用户名
      sharePage: false,
      wishing: "",
      me: "",
      show: "",
      popupShow: false,
      popupTakeWithphone: false,
      token: "",
      opened_redpkt: false,
      opened_amount: "",
      opened_num: "",
      num: "",
      code: "",
      amount: ""
    };
  },
  created() {
    this.refcode = this.$route.query.refcode;
    this.rid = this.$route.query.rid;
    this.app = this.$route.query.app;

    if (localStorage.accessToken) {
      this.$router.push({
        path: "/caihongbao",
        query: { rid: this.rid, app: "tpu", refcode: this.refcode }
      }); //请求成功后跳 分享二维码页
    }
  },
  mounted() {
    console.log(this.rid);
    if (this.rid) {
      this.pktInfo();
    } else {
      this.showAlert("缺少参数");
    }
  },
  methods: {
    takeHongbao() {
      this.$post2("redpkt/Share/takehongbao", {
        rid: this.rid,
        app: this.app,
        from: this.refcode,
        phone: this.phone,
        sid: this.sid,
        code: this.code,
        secret: this.secret
      })
        .then(res => {
          console.log(res);

          let amount = res.amount;

          global.userInfo = res;
          //   global.defaultToken = res.defaultToken;
          global.accessToken = res.accessToken;
          localStorage.userInfo = JSON.stringify(res);
          localStorage.accessToken = res.accessToken;
          localStorage.app = res.app;

          Dialog.confirm({
            title: "拆红包",
            message: "您抢到" + amount + "个" + this.token + ",查看谁抢到最多？"
          })
            .then(() => {
              // on confirm
              this.$router.push({
                path: "/caihongbao",
                query: { from: "takehongbao", rid: this.rid, app: this.app }
              }); //请求成功后跳 分享二维码页
            })
            .catch(() => {
              // on cancel
              global.userInfo = "";
              global.accessToken = "";
              localStorage.userInfo = "";
            });

          //    this.openHistory();
        })
        .catch(err => {
          this.showAlert(err);
        });
    },
    pktInfo() {
      this.$post2("redpkt/Share/pktinfo", {
        rid: this.rid,
        app: this.app,
        from: this.refcode
      })
        .then(res => {
          console.log(res);
          this.sendName = res.username;
          this.wishing = res.wishing;
          this.token = res.token;
          this.opened_redpkt = res.opened_redpkt;
          this.opened_amount = res.opened_amount;

          this.amount = res.amount;
          this.opened_num = res.opened_num;
          this.num = res.num;
          this.secret = res.secret;
          this.user_set = res.user_set;

          //    this.openHistory();
        })
        .catch(err => {
          this.showAlert(err);
        });
    },
    // 点击 获取验证码
    getSms() {
      if (!/^1[3456789]\d{9}$/.test(this.phone)) {
        this.$dialog.alert({
          message: "手机号码有误"
        });
        return;
      }
      const TIME_COUNT = 60;
      if (this.flag == false) {
        this.$post2("security/index/phonecode", {
          phone: this.phone,
          op: "setphone"
        }).then(res => {
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

    //提示框
    showAlert(msg) {
      return this.$dialog.alert({
        title: "提示",
        message: msg
      });
    }
  }
};
</script>

<style lang="less" scoped>
.btn {
  margin: 2 auto;
  text-align: center;
  width: 100%;
  height: 0.9rem;
  line-height: 0.9rem;
  background: linear-gradient(
    45deg,
    rgba(210, 29, 46, 1) 0%,
    rgba(231, 60, 50, 1) 100%
  );
  opacity: 0.9;
  border-radius: 0.2rem;
  font-size: 0.3rem;
  color: #fff;
}
</style>