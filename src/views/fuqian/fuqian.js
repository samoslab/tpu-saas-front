
export default {
    name: "fuqian",
    data() {
        return {
            active: 0,               // 云支付 本地支付 哪个激活
            balanceNum: 0,           // 账户余额
            address: "",             // 转出地址
            num: "",                 // 输入金额 ?
            payValue: "SAMO",        // 支付类型
            payType: [               // 支付类型 下拉选项
                { text: "SAMO", value: "SAMO" },
                { text: "SAMO1", value: "SAMO1" },
                { text: "SAMO2", value: "SAMO2" },
            ],
            payPopup: false,         // 支付弹出层
            popupTitle: "支付",      // 弹出层 title 文字
            key: "",                 // 密码
            keyShow: false,          // 密码框 是否显示
            balanceShow: true,   // 蓝卡上 资产数字 是否显示

            tokenSet: [],       // 货币列表
            money: "",          // 可用 余额
            frozen: "",         // 冻结资产

            capital: "",
            dscapital: "",
            flag: false,
            currentBalance: "",
            currentToken: "",

        };
    },
    created() {
        this.getTokenSet();
        // this.getFaker();    // 做完删
    },
    methods: {
        // 获取数据
        getTokenSet() {
            this.$post2("user/api/index/userAsset", {})
                .then(res => {
                    console.log(res);
                    this.tokenSet = res.token_set;
                    localStorage.userTokenSet = JSON.stringify(this.tokenSet);
                    this.money = res.summary.total_amount_cny;
                    this.frozen = res.summary.total_amount_frozen_cny;
                    // {"code":0,"msg":"","result":{"token_set":[{"id":28,"app":"tpu","uid":"10003","token":"NULS","amount":"0.0","frozen":"0.0","created_at":"2020-04-24 23:06:23","updated_at":"2020-04-24 23:06:23","price":{"cny":1.487,"usdt":0.212},"cny":0,"usdt":0,"frozen_cny":0,"frozen_usdt":0,"icon":"http://s.yqkkn.com/nuls2.png"},{"id":29,"app":"tpu","uid":"10003","token":"SAMO","amount":"0.0","frozen":"0.0","created_at":"2020-04-24 23:06:23","updated_at":"2020-04-24 23:06:23","price":{"cny":0.05,"usdt":0.007},"cny":0,"usdt":0,"frozen_cny":0,"frozen_usdt":0,"icon":"http://s.yqkkn.com/samo.png"},{"id":30,"app":"tpu","uid":"10003","token":"TPU","amount":"0.5","frozen":"0.0","created_at":"2020-04-24 23:06:23","updated_at":"2020-04-26 00:26:01","price":{"cny":0.01,"usdt":0.014},"cny":0.005,"usdt":0.007,"frozen_cny":0,"frozen_usdt":0,"icon":"http://s.yqkkn.com/tpu.png"}],"summary":{"total_amount_cny":0.005,"total_amount_usdt":0.007,"total_amount_frozen_cny":0,"total_amount_frozen_usdt":0}}}
                    this.payType = [];
                    this.tokenSet.forEach(v => {
                        console.log(v.token);
                        this.payType.push({ text: "" + v.token, value: v.token });

                    });
                    // array.forEach(element => {

                    // });
                })
                .catch(e => {
                    console.log(e);
                });
        },

        // 点击返回
        onClickLeft() {
            console.log("返回");
        },

        // 点击 支付
        pay() {
            if (this.address === "") {
                this.$toast("请输入转出地址");
                return;
            }
            if (this.num === "") {
                this.$toast("请输入金额");
                return;
            }
            this.payPopup = true;
        },
        // 支付 弹出层 点击取消
        payPopupCancel() {
            this.payPopup = false;
            this.keyShow = false;
            this.popupTitle = "支付";
        },
        // 弹出层 里的 下一步 按钮
        nextCommit() {
            if (!this.keyShow) {
                this.keyShow = true;
                this.popupTitle = "输入密码";
                return;
            }
            // 后端 添加 付账接口 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
            if (this.key === "") {
                this.$toast("密码不能为空");
                return;
            }
            this.$toast("暂无后端支付接口");
            this.payPopupCancel();


        },
    }
};