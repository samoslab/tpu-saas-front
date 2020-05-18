<template>
  <div>
    <div>
      <p class="longtitle">无需注册直接登录</p>
      <ul class="c-reg-panel">
        <li>
          <div class="c-reg-panel-leftbox">
            <label>手机号</label>
            <input type="number" @input="checkPhone" v-model="inputValue" placeholder="请输入手机号" />
          </div>
          <div class="c-reg-panel-rightbox">
            <img :src="rigthImg" v-show="!errorInputShow && userInput" />
            <img :src="errorImg" v-show="errorInputShow" />
          </div>
        </li>
        <li>
          <div class="c-reg-panel-leftbox">
            <label>验证码</label>
            <input type="text" v-model="inputCode" placeholder="请输入验证码" />
          </div>
          <div class="c-reg-panel-rightbox">
            <a href="javascript:;" class="c-reg-code" @click="onSendCode" :disabled="codeSending">
              发送验证码
              <span v-if="codeSending">({{theTime}})</span>
            </a>
          </div>
        </li>
      </ul>
    </div>
    <div class="c-reg-toreg" v-if="isWeixin">
      <span @click="login">微信登录</span>
    </div>
    <div class="c-reg-toreg" v-if="isNabox">
      <span @click="naboxLogin">Nabox钱包登录</span>
    </div>
    <button class="c-reg-btn" @click="onLogin">登录</button>
    <div class="logintitleInfo">
      <p class="p1">友情提示:</p>
      <p class="p2">致力于为区块链Token提供落地应用插件</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "loginPhone",
  data() {
    return {
      info: "",
      rigthImg: require("../../assets/imgs/login/login-right.png"),
      errorImg: require("../../assets/imgs/login/login-error.png"),
      inputValue: "",
      inputCode: "",

      sid: "", //session id
      nation: "86", //country code
      refcode: "",
      userInput: false,
      errorInputShow: false,
      codeSending: false,
      theTime: 0,
      ua: false,
      isWeixin: false,
      isNabox: false
    };
  },
  created() {
    this.refcode = this.$route.query.refcode;
    this.isWeixinFlag();
    this.isNaboxFlag();
    this.$post2("user/api/passport/loginNotice")
      .then(res => {
        console.log(res);
        this.info = res;
      })
      .catch(err => {
        console.log(err);
      });

    console.log(this.refcode + " refcode");
  },
  beforeDestroy() {
    if (this.codeTimer) {
      clearTimeout(this.codeTimer);
    }
  },
  methods: {
    login() {
      window.location =
        "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3482eac80cc986cc&redirect_uri=https://tpu.yqkkn.com/wx/index/info&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect";
    },
    showAlert(msg) {
      return this.$dialog.alert({
        title: "提示",
        message: msg
      });
    },
    checkPhone(e) {
      // console.log(e);
      this.userInput = true;
      let v = e.target.value;
      if (this.isPhoneNumber(v)) {
        this.errorInputShow = false;
      } else {
        this.errorInputShow = true;
      }
    },
    check() {
      if (!this.isPhoneNumber(this.inputValue)) {
        this.showAlert("请输入正确的手机号");
        return false;
      }
      if (this.inputCode == "") {
        this.showAlert("请输入正确的验证码");
        return false;
      }
      return true;
    },
    isPhoneNumber(phone) {
      if (!/^1[3456789]\d{9}$/.test(phone)) {
        return false;
      }
      return true;
    },
    onSendCode() {
      if (this.codeSending) {
        return;
      }
      if (!this.isPhoneNumber(this.inputValue)) {
        this.showAlert("请输入正确的手机号");
        return false;
      }
      this.theTime = 60;
      this.codeSending = true;
      this.doCountDown();
      this.$post2(global.domain.domain + "/security/index/phonecode", {
        phone: this.inputValue,
        op: "register"
      }).then(res => {
        // console.log(res);
        this.sid = res.sid;
      });
    },
    isWeixinFlag() {
      var ua = navigator.userAgent.toLowerCase();
      this.isWeixin = ua.match(/MicroMessenger/i) == "micromessenger";
    },
    isNaboxFlag() {
      if (typeof NaboxJSBridge == "undefined") {
        this.isNabox = false;
      } else {
        this.isNabox = false;
      }
    },

    doCountDown() {
      if (this.theTime > 1) {
        this.theTime--;
        this.codeTimer = setTimeout(() => {
          this.doCountDown();
        }, 1000);
      } else {
        this.codeSending = false;
      }
    },
    onLogin() {
      if (!this.check()) {
        return;
      }
      this.doLogin();
    },
    naboxLogin() {
      NaboxJSBridge.invoke(
        "authorization", //调用方法
        //业务数据
        null,
        function(data) {
          if (data.requestCode == "ok") {
            this.$post2("user/api/passport/loginWithPubkey", {
              address: data.address,
              pubKey: data.pubKey,
              sign: ""
            })
              .then(res => {
                console.log(res);
                // this.$toast("登录成功");

                this.$saveLoginSession(res);
                //   this.showAlert(localStorage.phone);

                if (this.$route.query.redirect) {
                  this.$router.push(this.$route.query.redirect);
                } else if (
                  !localStorage.phone ||
                  typeof localStorage.phone == "undefined"
                ) {
                  //没有手机号
                  this.$router.push("/sPhone?bindPhone=1");
                } else {
                  this.$router.push("/fahongbao");
                }
              })
              .catch(e => {
                this.showAlert(e);
              });
          }
        }
      );
    },
    doLogin() {
      this.$post2("user/api/passport/loginWithCode", {
        phone: this.inputValue,
        sid: this.sid,
        code: this.inputCode,
        refcode: this.refcode
      })
        .then(res => {
          console.log(res);
          // this.$toast("登录成功");
          this.$saveLoginSession(res);
          // this.showAlert(localStorage.phone);

          if (this.$route.query.redirect) {
            this.$router.push(this.$route.query.redirect);
          } else {
            this.$router.push("/fahongbao");
          }
        })
        .catch(e => {
          this.showAlert(e);
        });
    }
  }
};
</script>
<style>
.longtitle {
  font-size: 0.25rem;
  color: #ccc;
  width: 5.6rem;
  /* background: #1e1010; */
  margin: 0.8rem auto 0.2rem;
  /* padding: 0.4rem 0.4rem 0; */
}
.logintitleInfo {
  padding: 1rem 0 0 0;
  width: 6.06rem;
  /* height:0.9rem; */
  /* line-height: 0.9rem; */
  /* background:#eee; */
  opacity: 0.9;
  border-radius: 0.2rem;

  color: #fff;
  margin: 0 auto;
  /* text-align: center; */
}
.logintitleInfo .p1 {
  font-size: 0.3rem;
}
.logintitleInfo .p2 {
  line-height: 0.4rem;
  color: #ccc;
  font-size: 0.25rem;
  text-indent: 2em;
}
</style>

