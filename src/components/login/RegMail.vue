<template>
  <div>
    <div>
      <ul class="c-reg-panel">
        <li>
          <div class="c-reg-panel-leftbox">
            <label>邮箱</label>
            <input type="text" @input="checkMail" v-model="inputValue" placeholder="请输入邮箱" />
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
        <li>
          <div class="c-reg-panel-leftbox">
            <label>密码</label>
            <input type="password" v-model="inputPassword" placeholder="请输入密码" />
          </div>
        </li>
      </ul>
      <div class="c-reg-toreg">
        <router-link to="/login">登录</router-link>
      </div>
    </div>
    <button class="c-reg-btn" @click="onReg">注册</button>
  </div>
</template>
<script>
export default {
  name: "registerPhone",
  data() {
    return {
      rigthImg: require("../../assets/imgs/login/login-right.png"),
      errorImg: require("../../assets/imgs/login/login-error.png"),
      inputValue: "",
      inputCode: "",
      inputPassword: "",
      userInput: false,
      errorInputShow: false,
      codeSending: false,
      theTime: 0,
      sid: "", //session id
      nation: "86", //country code
      refcode: this.$route.query.refcode
    };
  },
  beforeDestroy() {
    if (this.codeTimer) {
      clearTimeout(this.codeTimer);
    }
  },
  methods: {
    showAlert(msg) {
      return this.$dialog.alert({
        title: "提示",
        message: msg
      });
    },
    checkMail(e) {
      // console.log(e);
      this.userInput = true;
      let v = e.target.value;
      if (this.isMail(v)) {
        this.errorInputShow = false;
      } else {
        this.errorInputShow = true;
      }
    },
    check() {
      if (!this.isMail(this.inputValue)) {
        this.showAlert("请输入正确的邮箱");
        return false;
      }
      if (this.inputCode == "") {
        this.showAlert("请输入正确的验证码");
        return false;
      }
      if (this.inputPassword == "" || this.inputPassword.length < 8) {
        this.showAlert("密码不能为空且不能小于8位");
        return false;
      }
      return true;
    },
    isMail(txt) {
      var reg = new RegExp(
        "^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"
      );
      if (!reg.test(txt)) {
        return false;
      }
      return true;
    },
    onSendCode() {
      if (this.codeSending) {
        return;
      }
      if (!this.isMail(this.inputValue)) {
        this.showAlert("请输入正确的邮箱");
        return false;
      }
      this.theTime = 60;
      this.codeSending = true;
      this.doCountDown();
      this.$post2(global.domain.domain + "/security/index/emailcode", {
        email: this.inputValue,
        op: "register",
        refcode: this.$route.query.refcode
      }).then(res => {
        console.log(res);
        this.sid = res.sid;
      });
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
    onReg() {
      if (!this.check()) {
        return;
      }
      this.doReg();
    },
    doReg() {
      this.$post2("user/api/passport/registerWithEmail", {
        email: this.inputValue,
        op: "register",
        sid: this.sid,
        code: this.inputCode,
        password: this.$SHA256(this.inputPassword),
        refcode: this.refcode
      })
        .then(res => {
          console.log(res);
          this.$toast("注册成功");
          // global.accessToken = res.accessToken;
          // global.defaultToken = res.defaultToken
          this.$router.push("/login");
        })
        .catch(e => {
          this.showAlert(e);
        });
    }
  }
};
</script>
