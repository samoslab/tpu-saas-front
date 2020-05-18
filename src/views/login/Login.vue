<template>
  <div class="c-reg-box">
    <div class="c-reg-nav">
      <div>
        <a href="javascript:;" :class="{active:activeTab=='code'}" @click="setActive('code')">验证码登录</a>
      </div>
      <div>
        <a
          href="javascript:;"
          :class="{active:activeTab=='password'}"
          @click="setActive('password')"
        >密码登录</a>
      </div>
      <!-- <div>
        <a
          href="javascript:;"
          :class="{active:activeTab=='register'}"
          @click="setActive('register')"
        >用户注册</a>
      </div>-->
    </div>
    <components :is="regType"></components>
  </div>
</template>

<script>
import LoginCode from "@/components/login/LoginCode.vue";
import LoginPwd from "@/components/login/LoginPwd.vue";
// import RegPhone from "@/components/login/LoginPhone.vue";

export default {
  name: "login",
  components: {
    LoginCode,
    LoginPwd
    // RegPhone
  },
  data() {
    return {
      regType: LoginCode,
      activeTab: "code",
      accessToken: this.$route.query.code,
      app: this.$route.query.app
    };
  },
  mounted() {},
  created() {
    // console.log(this.$route.query.code)
    if (this.$route.query.code) {
      global.accessToken = this.accessToken;
      localStorage.accessToken = this.accessToken;

      // this.$dialog.alert({
      //   title: "提示",
      //   message: localStorage.accessToken + "accessToken"
      // });

      this.$post2("user/api/index/home", {})
        .then(res => {
          global.userInfo = res.user;
          global.defaultToken = res.user.defaultToken;

          localStorage.phone = res.user.phone;
          localStorage.openid = res.user.openid;
          localStorage.uid = res.user.uid;
          localStorage.app = res.user.app;

          localStorage.userInfo = JSON.stringify(res.user);
          if (
            (typeof localStorage.phone == "undefined" ||
              localStorage.phone == 0 ||
              localStorage.phone == "") &&
            localStorage.openid
          ) {
            this.$router.push("/sPhone?bindPhone=1");
          } else {
            this.$router.push("/fahongbao");
          }
        })
        .catch(err => {
          alert(err);
        });
    }
  },
  methods: {
    setActive(tab) {
      this.activeTab = tab;
      if (tab === "code") {
        this.regType = LoginCode;
      } else if (tab == "password") {
        this.regType = LoginPwd;
      }
    }
  }
};
</script>
<style lang="less">
@import url("../../assets/css/login.less");
</style>