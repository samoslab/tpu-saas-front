<template>
  <div class="myWrap">
    <div class="formBox">
      <div class="form-item">
        <div class="form-item-line1">
          <div class="left">登录密码：</div>
          <input v-model="loginpwd" type="password" placeholder="请输入登录密码" />
        </div>
      </div>
      <div class="form-item">
        <div class="form-item-line1">
          <div class="left">验证码:</div>
          <input type="text" v-model="inputCode" placeholder="请输入验证码" style="width:49%" />
          <a href="javascript:;" class="c-reg-code" @click="onSendCode" :disabled="codeSending">
            发送验证码
            <span v-if="codeSending">({{theTime}})</span>
          </a>
        </div>
      </div>
      <div class="form-item">
        <div class="form-item-line1">
          <div class="left">交易密码：</div>
          <input v-model="paypwd" type="password" placeholder="请输入交易密码" />
        </div>
      </div>
      <div class="form-item">
        <div class="form-item-line1">
          <button @click="bindPwd()">绑定</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "paypass",
  data() {
    return {
      loginpwd: "",
      inputCode: "",
      paypwd: "",
      codeSending: false,
      theTime: 0,
      sid: ""
    };
  },
  methods: {
    onSendCode() {
      if (this.codeSending) {
        return;
      }
      this.theTime = 60;
      this.codeSending = true;
      this.doCountDown();
      this.$post2(global.domain.domain + "/security/user/authsmscode", {
        op: "password"
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
    check() {
      if (this.inputCode == "") {
        this.showAlert("请输入正确的验证码");
        return false;
      }
      if (this.loginpwd == "") {
        this.showAlert("请输入正确的登录密码");
        return false;
      }
      if (this.paypwd == "") {
        this.showAlert("请输入正确的交易密码");
        return false;
      }
      return true;
    },
    showAlert(msg) {
      return this.$dialog.alert({
        title: "提示",
        message: msg
      });
    },
    bindPwd() {
      if (!this.check()) {
        return;
      }
      this.doGetpwd();
    },
    doGetpwd() {
      this.$post2("/user/api/index/settradepwd", {
        password: this.loginpwd,
        tradepwd: this.paypwd,
        code: this.inputCode,
        sid: this.sid
      }).then(res => {
        this.$toast("交易密码修改成功");
      });
    }
  }
};
</script>
<style lang="less" scoped>
.myWrap {
  min-height: 100vh;
  background: #fff;
  .formBox {
    padding-top: 1.4rem;
    .form-item {
      padding: 0 0.25rem 0 0.45rem;
      border-bottom: 1px solid #f8f5f5;
      .form-item-line1 {
        display: flex;
        justify-content: space-between;
        padding: 0.3rem 0;
        .left {
          font-size: 0.3rem;
          width: 30%;
        }
        input {
          padding: 0.02rem 0;
          border: none;
          width: 70%;
          font-size: 0.28rem;
          color: #410e0e;
          font-weight: bold;
          outline: none;
        }
        .right {
          width: 70%;
        }
        .c-reg-code {
          color: #cacaca;
          font-size: 0.28rem;
        }
        .selectBi {
          display: flex;
          justify-content: space-between;
          div {
            font-size: 0.28rem;
            font-family: PingFang SC;
            font-weight: bold;
            color: rgba(65, 14, 14, 1);
          }
          .sanjiao {
            width: 0;
            height: 0;
            border-width: 0.15rem;
            border-style: solid;
            border-color: #410e0e transparent transparent transparent;
            float: right;
            display: inline-block;
            margin-top: 0.15rem;
          }
        }
      }
      .form-item-line2 {
        font-size: 0.2rem;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(149, 149, 149, 1);
        // margin-bottom: .28rem;
        // font-size: 0.3rem;
        // font-size:.28rem;
        // font-family:PingFang SC;
        // font-weight:bold;
        // color:rgba(65,14,14,1);

        // input{
        //   line-height: 0.3rem;
        //   border:none;
        //   padding: 0.1rem 0;
        //   width: 100%;
        //   font-size: 0.28rem;
        //   color:#410E0E;
        //   font-weight: bold;
        //   outline: none;
        // }
      }
    }
    .banner {
      width: 100%;
      height: 1rem;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
  }
}
</style>