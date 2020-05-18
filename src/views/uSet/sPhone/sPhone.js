
export default {
    name: "sPhone",
    data() {
        return {
            phone: "",           // 手机号
            sms: "",             // 短信验证码
            flag: false,         // 获取验证码 是否禁用
            count: 60,           // 60s 倒计时
            timer: null,         // 倒计时的 定时器
            sid: "",             // 验证
            bindPhone: false,
            openid: "",
        };
    },
    created() {
        this.bindPhone = this.$route.query.bindPhone;
        this.openid = localStorage.openid;

        // this.$dialog.alert({
        //     message: this.openid + ":" + this.bindPhone
        // });

    },
    methods: {
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

        // 设置手机号
        setPhone() {
            if (this.sms === "") {
                this.$dialog.alert({
                    message: "短信验证码不能为空"
                });
            } else if (!/^1[3456789]\d{9}$/.test(this.phone)) {
                this.$dialog.alert({
                    message: "手机号码有误"
                });
            } else {
                if (this.bindPhone && this.openid) {


                    this.$post2("user/api/index/bindPhone", {
                        phone: this.phone,
                        code: this.sms,
                        sid: this.sid,
                        openid: this.openid
                    })
                        .then(res => {
                            this.$toast("手机号设置成功");
                        })
                        .catch(err => {
                            this.$toast(err);
                        });
                } else {

                    this.$post2("user/api/index/setPhone", {
                        phone: this.phone,
                        code: this.sms,
                        sid: this.sid
                    })
                        .then(res => {
                            this.$toast("手机号设置成功");
                            //  this.$router.go(-1);
                        })
                        .catch(err => {
                            this.$toast(err);
                        });
                }

            }
        },
    }
};