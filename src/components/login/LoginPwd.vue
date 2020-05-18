<template>
  <div>
    <div>
      <ul class="c-reg-panel">
        <li>
          <div class="c-reg-panel-leftbox">
            <label>用户名</label>
            <input type="text" v-model="inputValue" placeholder="手机号/邮箱" />
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
        <!-- <router-link to="/register">注册新用户</router-link> -->
      </div>
    </div>
    <button class="c-reg-btn" @click="onLogin">登录</button>
  </div>
</template>
<script>
export default {
  name: "loginPhone",
  data() {
    return {
      rigthImg: require("../../assets/imgs/login/login-right.png"),
      errorImg: require("../../assets/imgs/login/login-error.png"),
      inputValue: "",
      inputPassword: "",
      refcode: this.$route.query.refcode
    };
  },
  methods: {
    showAlert(msg) {
      return this.$dialog.alert({
        title: "提示",
        message: msg
      });
    },
    check() {
      if (this.inputValue == "") {
        this.showAlert("请输入正确的用户名");
        return false;
      }
      if (this.inputPassword == "" || this.inputPassword.length < 8) {
        this.showAlert("密码不能为空且不能小于8位");
        return false;
      }
      this.inputValue.trim(); // 去除一下两端空格
      return true;
    },
    isPhoneNumber(phone) {
      if (!/^1[3456789]\d{9}$/.test(phone)) {
        return false;
      }
      return true;
    },
    onLogin() {
      if (!this.check()) {
        return;
      }
      this.doLogin();
    },
    doLogin() {
      let type;
      if (this.isPhoneNumber(this.inputValue)) {
        type = "phone";
      } else {
        type = "email";
      }
      this.$post2("user/api/passport/loginwithpwd", {
        username: this.inputValue,
        type: type,
        password: this.$SHA256(this.inputPassword)
      })
        .then(res => {
          console.log(res);
          this.$saveLoginSession(res);
          // this.showAlert(localStorage.phone);
          if (this.$route.query.redirect) {
            this.$router.push(this.$route.query.redirect);
          } else {
            this.$router.push("/fahongbao");
          }
        })
        .catch(e => {
          console.log(e, "出错");
          this.showAlert(e);
        });
    }
  }
};
</script>
