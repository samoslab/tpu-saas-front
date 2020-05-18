
import foot from "@/components/foot.vue";

export default {
    name: "openredpkt",
    components: {
        foot
    },
    data() {
        return {
            secret: "xxx",
            active: 0,
            allData: {
                amount: "0",
                sendToken: "**",
                getedznum: "0",
                num: "0",
                opened: "0",
                opened_pkt: false,
                user_set: []
            },
            history: [],
            kouLing: "",
            rid: "",
            app: "",
            fromt: "",
            sendName: "", //用户名
            sharePage: false,
            wishing: "",
            me: "",
            show: "",
            popupShow: false,
            popupTakeWithphone: false,
            token: "",
            opened_redpkt: false,
            opened_amount: "",
            takePhone: "",//领取红包手机号
            sid: "",
            refcode: "",

        };
    },
    methods: {
        pktInfo() {
            this.$post2("redpkt/Share/pktinfo", { rid: this.rid, app: this.app, from: this.from }).then(res => {
                console.log(res);
                this.sendName = res.username;
                this.wishing = res.wishing;
                this.token = res.token;
                this.opened_redpkt = res.opened_redpkt;
                this.opened_amount = res.opened_amount;

                this.allData.token = res.token;

                this.allData.amount = res.amount;
                this.allData.opened_num = res.opened_num;
                this.allData.num = res.num;
                this.secret = res.secret;
                this.allData.user_set = res.user_set;
                this.allData.opened_pkt = res.opened_pkt;

                this.openHistory();

            }).catch(err => {
                this.showAlert(err);
            });
        },
        openHistory() {
            this.$post2("redpkt/Share/openHistory", { rid: this.rid }).then(
                res => {
                    this.history = res.list;
                }
            ).catch(err => {
                this.showAlert(err);
            });
        },

        onCancel() {
            this.show = false;
        },
        beforeClose(action, done) {
            if (action === "confirm") {
                if (!this.secret == this.kouLing) {
                    this.$toast("请输入口令");
                    done(false); //不关闭弹框
                } else {
                    this.openHb(done);
                }
            } else if (action === "cancel") {
                done(); //关闭
            }
        },
        beforeCloseTakeWithPhone(action, done) {
            if (action === "confirm") {
                if (this.takePhone == "") {
                    this.$toast("请输入手机号领取红包");
                    done(false); //不关闭弹框
                } else {
                    this.openHBWithPhone(done);
                }
            } else if (action === "cancel") {
                done(); //关闭
            }
        },
        showDialog() {
            this.popupShow = true;
        },


        openHongbao() {

            if (!localStorage.accessToken) {

                this.$router.push({ path: "/takehongbao", query: { rid: this.rid, app: "tpu", refcode: this.refcode } }); //请求成功后跳 分享二维码页


            } else {
                this.$post2("redpkt/Index/openpkt", {
                    rid: this.rid,
                    secret: this.kouLing
                })
                    .then(res => {
                        this.opened_amount = res.amount;
                        this.opened_redpkt = true;
                        // this.showAlert("抢到:" + res.amount + "个" + res.token);
                    })
                    .catch(err => {
                        this.showAlert(err);
                    });
            }

        },
        //拆红包
        openHb(done) {
            // this.popupShow = true;
            this.openHongbao();
            done();
        },
        routerTo() {
            this.$router.push({ path: "/share", query: { rid: this.rid } }); //请求成功后跳 分享二维码页
        },
        //提示框
        showAlert(msg) {
            return this.$dialog.alert({
                title: "提示",
                message: msg
            });
        }
    },
    created() {
        this.rid = this.$route.query.rid;
        this.app = this.$route.query.app;
        this.from = this.$route.query.from;
        this.refcode = this.$route.query.refcode;
        console.log(this.rid);
    },
    mounted() {
        if (this.rid) {
            this.pktInfo();
        } else {
            this.showAlert("缺少参数");
        }
    }
};