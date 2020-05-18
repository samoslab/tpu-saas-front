
export default {
    name: "sPay",
    data() {
        return {
            Title: this.$route.query.num,
            phone: localStorage.phone, //  用户手机号
            site: "", //  地址
            sites: "", // 地址备注
            sms: "", // 短信验证码
            count: "", // 倒计时
            pasword: "", //交易密码
            loginpwd: "", //登录密码
            inputCode: "",
            flag: false,
            timer: null,
            sid: "", // 验证
            clientHeight: document.documentElement.clientHeight,
            showBtn: true,
            paypwd: "",
            codeSending: false,
            theTime: 0,
        };
    },
    methods: {
        // 获取验证码
        onSendCode() {
            if (this.codeSending) {
                return;
            }
            this.theTime = 60;
            this.codeSending = true;
            this.doCountDown();
            this.$post2(global.domain.domain + "/security/user/authsmscode", {
                op: "tradepwd"
            }).then(res => {
                console.log(res);
                this.sid = res.sid;
            });
        },
        // 又改成 一次定时器了 写的真烂... 
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
            // if (this.loginpwd == "") {
            //   this.showAlert("请输入正确的登录密码");
            //   return false;
            // }
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
            this.doSetpwd();
        },
        doSetpwd() {
            this.$post2("/user/api/index/settradepwd", {
                // password: this.loginpwd,
                tradepwd: this.$SHA256(this.paypwd),
                code: this.inputCode,
                sid: this.sid
            }).then(res => {
                console.log(res);
                this.$toast("交易密码修改成功");
            });
        },
    }
};