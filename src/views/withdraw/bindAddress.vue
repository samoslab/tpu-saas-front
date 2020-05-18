<template>
  <div class="bindSite c-content">
    <nav-bar title="绑定地址" @click-right="onClickRight">
      <van-icon name="wap-home-o" slot="right" />
    </nav-bar>

    <div class="bindSite_cen">
      <!-- <van-cell-group :border='false'>
                <van-field
                v-model="phone"
                disabled
                label="手机号"
                placeholder=""/>
      </van-cell-group>-->

      <van-cell-group>
        <van-field v-model="sms" center clearable label="短信验证码" placeholder="请输入短信验证码">
          <van-button slot="button" size="small" @click="Code()" :disabled="flag" type="primary">
            获取验证码
            <span v-if="flag">({{count}})</span>
          </van-button>
        </van-field>
      </van-cell-group>
      <van-cell-group>
        <van-field v-model="password" label="交易密码" type="password" placeholder="请输入交易密码" />
      </van-cell-group>
      <van-cell-group :border="false">
        <van-field v-model="address" label="提现地址" placeholder="请输入绑定地址" />
      </van-cell-group>
      <van-cell-group>
        <van-field v-model="memo" label="地址备注" placeholder="请输入地址备注" />
      </van-cell-group>
    </div>
    <van-button v-if="showBtn" class="btn" @click="bind()" size="large">绑定地址</van-button>
  </div>
</template>

<script>
export default {
  name: "bindAddress",
  data() {
    return {
      token: this.$route.query.token,
      phone: localStorage.phone, //  用户手机号
      address: "", //  地址
      memo: "", // 地址备注
      sms: "", // 短信验证码
      count: "", // 倒计时
      password: "", //交易密码
      flag: false,
      timer: null,
      sid: "", // 验证
      clientHeight: document.documentElement.clientHeight,
      showBtn: true
    };
  },
  mounted() {
    window.onresize = () => {
      if (this.clientHeight > document.documentElement.clientHeight) {
        this.showBtn = false;
      } else {
        this.showBtn = true;
      }
    };
    this.refreshWithdrawAddress();
  },

  methods: {
    onClickRight() {
      this.$router.push({ path: "/geren" });
    },
    bind() {
      if (this.sms === "") {
        this.$dialog.alert({
          message: "短信验证码不能为空"
        });
      } else if (this.site === "") {
        this.$dialog.alert({
          message: "请输入地址"
        });
      } else if (this.sites === "") {
        this.$dialog.alert({
          message: "请输入地址备注"
        });
      } else {
        // 'pay/index/bindWithdrawAddress'
        // global.userInfo.phone+''
        this.$post2("pay/api/index/bindWithdrawAddress", {
          tradepwd: this.$SHA256(this.password),
          token: this.token,
          address: this.address,
          code: this.sms,
          sid: this.sid,
          memo: this.memo
        })
          .then(res => {
            this.$dialog.alert({
              message: "绑定成功"
            });
            // this.$router.go(-1);
          })
          .catch(() => {});
      }
    },
    Code() {
      const TIME_COUNT = 60;
      if (this.flag == false) {
        // 'http://api.yqkkn.com/security/user/authsmscode'
        this.$post2("security/user/authsmscode", {}).then(res => {
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
    onClickLeft() {
      this.$router.go(-1);
    },
    refreshWithdrawAddress() {
      this.$post2("pay/api/index/getWithdrawAddress", {
        token: this.token
      })
        .then(res => {
          console.log(res);
          this.address = res.address;
          this.memo = res.memo;
        })
        .catch(() => {});
    }
  }
};
</script>

<style scoped lang='less'>
.bindSite {
  font-size: 18px;
  width: 100%;
  height: 100%;
  .bindSite_cen {
    width: 100%;
    // height: 100%;
  }
  .btn {
    border: none;
    background: #00c0ed;
    color: white;
    position: absolute;
    bottom: 0;
  }
  .sign {
    margin-top: 10px;
    font-size: 14px;
    text-align: center;
    color: green;
  }
}
.c-nav-bar {
  background: var(--bgColor);

  span,
  i {
    font-size: 24px !important;
  }
}
</style>
