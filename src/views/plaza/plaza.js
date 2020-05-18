
import foot from "@/components/foot.vue";
import Hblist from "@/views/my-menu/Record/Hblist.vue";
import MyAttention from "@/views/my-menu/Record/myAttention.vue";
export default {
    name: "plaza",
    components: {
        foot,
        Hblist,
        MyAttention
    },
    data() {
        return {
            secret: "",
            active: 0,
            allData: {
                amount: "0",
                sendToken: "**",
                getedznum: "0",
                num: "0",
                opened: "0",
                user_set: [
                    // {
                    //   id:1,
                    //   pic:"http://s.yqkkn.com/tpu.png",
                    //   name:"jackChen",
                    //   num:15.369,
                    //   Bi:"SAMO",
                    //   time:"2019-08-19"
                    // }
                ]
            },
            kouLing: "",
            rid: "",
            sendName: "", //用户名
            //sendToken:'',//token
            //amount:'',//金额
            //secret:'',//口令
            //user_set:'',//领取列表

            sharePage: false
        };
    },
    methods: {
        ptinfo() {
            this.$post2("redpkt/Share/pktinfo", { rid: this.rid }).then(res => {
                console.log(res);
                this.sendName = res.username;
                this.allData.sendToken = res.token;
                this.allData.amount = res.amount;
                this.allData.opened = res.opened;
                this.allData.num = res.num;
                this.secret = res.secret;
                this.allData.user_set = res.user_set;
            });
        },
        //拆红包
        openHb() {
            this.$post2("redpkt/Index/openpkt", {
                rid: this.rid,
                secret: this.secret
            }).then(res => {
                console.log(res);
                this.showAlert("抢到:" + res.num + "个" + res.token);
            });
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
        },
        getPath() {
            this.rid = this.$route.query.rid;
            if (this.$route.query.share === "share") {
                //分享页面进入
                this.ptinfo();
                this.sharePage = true;
            } else {
                //列表
                // this.$router.push('/')
                this.sharePage = false;
            }
        }
    },
    created() {
        if (this.$route.query.show) {
            this.sharePage = true;
        }
        this.rid = this.$route.query.rid;
    },
    mounted() {
        this.getPath();
    },
    watch: {
        $route: "getPath"
    }
};