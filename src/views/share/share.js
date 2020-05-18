
import QRCode from "qrcodejs2";
import foot from "@/components/foot.vue";
import html2canvas from "html2canvas";
// import wxapi from "@/utils/wxapi.js";

export default {
    name: "share",
    components: {
        foot
    },
    data() {
        return {
            sendName: "",
            rid: "",
            app: "",
            sendToken: "",
            amount: "0.00",
            s: false,
            avatar: "",
            firstFlag: true,
            dataURL: "",
            shareImgShow: false
        };
    },
    methods: {
        toImg() {
            html2canvas(document.querySelector("#captureId"))
                .then(canvas => {
                    let imgUrl = canvas.toDataURL("image/png");
                    this.dataURL = imgUrl;
                    // this.firstFlag = false;
                    this.shareImgShow = true;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        toOpenHB() {
            if (global.accessToken) {
                this.$router.push({
                    path: "/caihongbao",
                    query: { rid: this.rid, app: "tpu" }
                }); //请求成功后跳 拆红包
            } else {
                this.$router.push({
                    path: "/takehongbao",
                    query: { rid: this.rid, app: "tpu" }
                });
            }

        },
        //redpkt/Share/pktinfo
        ptinfo() {
            this.$post2("redpkt/Share/pktinfo", {
                rid: this.$route.query.rid
            }).then(res => {
                console.log(res); //{rid: "SAMO.202002260850-119", uid: 1, token: "SAMO", amount: 1, num: 1, …}
                this.sendName = res.username;
                this.sendToken = res.token;
                this.amount = res.amount;
                this.rid = res.rid;
                if (global.username != res.username) {
                    // this.isLogin()
                }
            });
        },
        qrcode(address) {
            let canvaswidth = this.$refs.qrcode.clientWidth;
            //  let     canvaswidth = window.getComputedStyle(this.$refs.qrcode).height;

            // console.log(canvaswidth);
            let qrcode = new QRCode("qrcode", {
                width: canvaswidth, // 设置宽度，单位像素
                height: canvaswidth, // 设置高度，单位像素
                text: address // 设置二维码内容或跳转地址
            });
        },
        // 画二维码图
        site() {
            this.$post2("redpkt/Share/getShareUrl", {
                rid: this.rid
            })
                .then(res => {
                    console.log(res); //{url: "https://tpu.yqkkn.com/getcurrency?rid=SAMO.202002260850-119"}
                    this.address = res.url;
                    let _this = this;
                    setTimeout(function () {
                        _this.$nextTick(() => {
                            _this.qrcode(res.url);
                        });
                    }, 1000);
                })
                .catch(err => {
                    this.$dialog.alert({
                        message: "不支持的通证"
                    });
                });
        },
        //发送给朋友
        sendShape() {
            this.$toast("H5用户请通过浏览器右上角分享");
            this.wxShareAppMessage();    // 这个不是 写在methods里的
        },
        //判断是否登录
        isLogins() {
            console.log(global.accessToken);
            if (!global.accessToken) {
                this.s = false;
            } else {
                this.$router.push({
                    path: "/get",
                    query: { rid: this.rid, share: "share" }
                }); //请求成功后跳 拆红包
            }
        },
        //拆红包
        openHb() {
            this.$router.push({
                path: "/login",
                query: { share: "share", rid: this.rid }
            }); //请求成功后跳 登录
        },


        // 原本在methods 外面
        wxRegCallback() {
            // 用于微信JS-SDK回调
            this.wxShareTimeline();
            this.wxShareAppMessage();
        },
        wxShareTimeline() {
            // 微信自定义分享到朋友圈
            let option = {
                title: "NULS-TPU应用盒子", // 分享标题, 请自行替换
                link: window.location.href, // 分享链接，根据自身项目决定是否需要split
                imgUrl: "http://s.yqkkn.com/tpu.png", // 分享图标, 请自行替换，需要绝对路径
                success: () => {
                    alert("分享成功");
                },
                error: () => {
                    alert("已取消分享");
                }
            };
            // 将配置注入通用方法
            //     wxapi.ShareTimeline(option);
        },
        wxShareAppMessage() {
            // console.log("分享 186");
            // 微信自定义分享给朋友
            let option = {
                title: "NULS-TPU应用盒子", // 分享标题, 请自行替换
                desc: "红包盒子礼物", // 分享描述, 请自行替换
                link: window.location.href, // 分享链接，根据自身项目决定是否需要split
                imgUrl: "http://s.yqkkn.com/tpu.png", // 分享图标, 请自行替换，需要绝对路径
                success: () => {
                    console.log("分享成功成功");
                    alert("分享成功");
                },
                error: () => {
                    alert("已取消分享");
                }
            };
            // 将配置注入通用方法
            // wxapi.ShareAppMessage(option);
        }
    },
    created() {
        if (this.$route.query.redid) {
            this.rid = this.$route.query.redid;
        }
        if (this.$route.query.rid) {
            this.rid = this.$route.query.rid;
        }

        // console.log(this.rid);   // SAMO.202002260850-119
        // this.s()

        this.ptinfo();
    },
    mounted() {
        const that = this;
        this.site();
        // console.log(global.userInfo);    // undefined
        if (global.userInfo) {
            this.avatar =
                global.userInfo.avatar != ""
                    ? /*'http://s.yqkkn.com/'+*/ global.userInfo.avatar
                    : global.defConfig.avatar;
        } else {
            this.avatar = global.defConfig.avatar;
        }
        // wxapi.wxRegister(this.wxRegCallback);
    },
};