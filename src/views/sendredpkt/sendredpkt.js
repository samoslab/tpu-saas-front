
import foot from "@/components/foot.vue";
export default {
    name: "sendredpkt",
    components: {
        foot
    },
    data() {
        return {
            info: "",
            kouLing: "", //口令
            value: "", //选择的通证
            show: false,
            columns: [],
            amount: "", //红包总额
            num: "", //红包个数
            popupShow: false, //输入密码弹层
            popupShowTip: false, //提示充值
            psd: "", //密码
            paymoney: "0.00",
            tokenaMount: [],
            tokenaMountInfo: "",
            mountIndex: 0,
            tipShow: false,
            redtype: "1",
            wishing: "",
            feetokensetList: [],
            feetoken: "TPU", //服务费通证
            showmore: true,
            ispublic: "1",
            feetokensetToken: [],
            avatar: "",
            auth: "0" //是否需要口令
        };
    },
    methods: {
        showPop() {
            this.show = true;
        },
        showMore() {
            this.showmore = !this.showmore; // true
        },
        // showauth() {
        //   this.auth=1;
        //   document.getElementById("showauth-id").checked=true;
        //   document.getElementById("hideauth-id").checked=false;
        //   console.log("show auth");
        // },
        // hideauth() {
        //   this.auth=0;
        //   document.getElementById("showauth-id").checked=false;
        //   document.getElementById("hideauth-id").checked=true;

        //     console.log("hide auth");

        // },
        onCancel() {
            this.show = false;
        },
        onConfirm(value, index) {
            this.$refs.iptsum.focus();
            this.show = false;
            this.mountIndex = index;
            this.value = value;
            this.tokenaMountInfo = this.tokenaMount[index];
            this.getfeetokenset(value); //设置手续费参数
        },
        showPassword() {
            if (this.auth == "1" && !this.kouLing) {
                this.$toast("请输入口令!");
                return;
            }
            if (!this.value) {
                this.$toast("请选择通证!");
                return;
            }
            if (!this.amount) {
                this.$toast("红包总额不能为空!");
                return;
            }
            if (!this.num) {
                this.$toast("红包个数不能为空!");
                return;
            }

            if (this.tipShow) {
                this.popupShowTip = true;
            } else {
                this.popupShow = true;
            }
        },
        beforeClose(action, done) {
            if (action === "confirm") {
                if (!this.psd) {
                    this.$toast("请输入用户名和密码");
                    done(false); //不关闭弹框
                } else {
                    this.passwordConfirm(done);
                }
            } else if (action === "cancel") {
                done(); //关闭
            }
        },
        //密码确认
        passwordConfirm(done) {
            const url = domain.psdCheck;
            // const prams={"psd":this.psd};
            const prams = {};
            this.$post2("/redpkt/index/sendpkt", {
                token: this.value, //token
                op: "redpkt", //op头
                amount: this.amount, //红包金额
                num: this.num, //红包数量
                wishing: this.wishing, //祝福语
                secret: this.kouLing, //口令
                tradepwd: this.psd, //密码
                auth: this.auth, //是否输入口令
                type: this.redtype, //红包类型
                feetoken: this.feetoken, //服务费通证
                public: this.ispublic //是否公开
            })
                .then(res => {
                    //res.code==0  已全局处理
                    done();
                    let params = { redid: res.redid, rid: res.redid };
                    this.$router.push({ path: "/share", query: params }); //请求成功后跳 分享二维码页
                })
                .catch({});
        },
        //服务费
        getfee(isAmount) {
            this.$post2("pay/index/fee", {
                token: this.value,
                op: "redpkt",
                amount: isAmount,
                feetoken: this.feetoken
            })
                .then(res => {
                    this.paymoney = res.fee;
                    this.tokenaMountInfo = this.tokenaMount[this.mountIndex];
                    this.tipShow =
                        parseInt(this.paymoney) + parseInt(isAmount) >
                            this.tokenaMountInfo
                            ? true
                            : false;
                })
                .catch({});
        },
        //服务费通证 pay/index/feetokenset
        getfeetokenset(tokenarg) {
            if (!tokenarg) {
                tokenarg = global.defaultToken;
            }
            this.$post2("pay/index/feetokenset", {
                token: tokenarg
            })
                .then(res => {
                    this.feetokensetList = [];
                    res.forEach(item => {
                        let o = { token: item, tokenName: item };
                        this.feetokensetList.push(o);
                    });
                    this.feetokensetToken = res; //服务费通证列表
                    this.feetoken = tokenarg; //global.defaultToken
                })
                .catch({});
        }
    },
    mounted() {
        this.$nextTick(() => {
            //   this.$refs.ipt.focus()
        });

        this.value = global.defaultToken;

        if (global.userInfo) {
            this.avatar =
                global.userInfo.avatar != ""
                    ? /*'http://s.yqkkn.com/'+*/ global.userInfo.avatar
                    : global.defConfig.avatar;
            // this.auth = 0;
        } else {
            this.avatar = global.defConfig.avatar;
        }

    },
    created() {
        this.$post2("user/passport/homeNotice")
            .then(res => {
                this.info = res;
            })
            .catch(err => {
                console.log(err);
            });

        this.getfeetokenset();
        this.$post2("user/api/index/tokenset").then(res => {
            console.log("user/api/index/tokenset", res);
            let tokenset = res.token_set;
            this.columns = [];
            tokenset.forEach(item => {
                this.columns.push(item.token);
                this.tokenaMount.push(item.amount);
            });
        });
    },
    watch: {
        //监听红包钱数
        amount() {
            if (this.amount && this.amount > 0) {
                this.getfee(this.amount);
            } else {
                this.paymoney = "0.00";
                this.tipShow = false;
            }
        },
        //监听通证
        value() {
            if (this.amount && this.amount > 0) {
                this.getfee(this.amount);
            } else {
                this.paymoney = "0.00";
                this.tipShow = false;
            }
        },
        //服务费通证
        feetokenset() {
            if (this.amount && this.amount > 0) {
                this.getfee(this.amount);
            } else {
                this.paymoney = "0.00";
                this.tipShow = false;
            }
        }
    }
};