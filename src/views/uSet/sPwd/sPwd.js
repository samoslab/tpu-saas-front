
export default {
    name: "sPwd",
    data() {
        return {
            Title: this.$route.query.num,
            phone: "",

            //  用户手机号
            site: '',   //  地址
            sites: '',   // 地址备注
            sms: '',     // 短信验证码
            count: '',    // 倒计时
            password: '',//交易密码
            flag: false,
            timer: null,
            sid: '',     // 验证
            clientHeight: document.documentElement.clientHeight,
            showBtn: true,
        };
    },
    created() {
        console.log(localStorage.userInfo);
        // if (!global.userInfo.phone) {
        //     this.$toast("请先设置手机号");


        // }
        let st = JSON.parse(localStorage.userInfo);

        this.phone = st.phone;



    },
    methods: {

        bind() {
            if (this.sms === '') {
                this.$dialog.alert({
                    message: '短信验证码不能为空'
                })
            }
            // else if (this.site === '') {
            //     this.$dialog.alert({
            //         message: '密码不能为空'
            //     })
            // } 
            else
                if (this.password === '') {
                    this.$dialog.alert({
                        message: '请确认密码'
                    })
                } else {
                    this.$post2("user/api/passport/resetpwd", {
                        phone: this.phone,
                        code: this.sms,
                        password: this.$SHA256(this.password),
                        sid: this.sid
                    }).then((res) => {
                        console.log(res)
                        this.$toast('密码设置成功');
                        // this.$router.go(-1);
                    }).catch(err => {
                        this.$toast(err);
                    })
                }
        },
        Code() {
            const TIME_COUNT = 60;
            if (this.flag == false) {
                // 'http://api.yqkkn.com/security/user/authsmscode'
                this.$post2("security/user/authsmscode", {

                }).then(res => {
                    this.sid = res.sid;
                })
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
                }, 1000)
            }
        },
    },
};