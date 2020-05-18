
export default {
    name: "coffer",
    data() {
        return {
            active: 0,           // 云端/本地 切换
            balanceShow: true,   // 蓝卡上 资产数字 是否显示

            tokenSet: [],       // 货币列表
            money: "",          // 可用 余额
            frozen: "",         // 冻结资产

            capital: "",
            dscapital: "",
            flag: false,
            isLoading: false,
            arr: [],
            amount: 0,
            mo_flag: true

        };
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
                })
                .catch(e => {
                    console.log(e);
                });
        },

        // 获取假数据 做完删
        getFaker() {
            this.$axios.get("/test.json")
                .then(res => {
                    let result = res.data.result;
                    this.tokenSet = result.token_set;
                    this.money = result.summary.total_amount_cny;
                    this.frozen = result.summary.total_amount_frozen_cny;
                })
        },

        // 点击眼睛 隐藏/显示 资产
        hideBalance() {
            this.balanceShow = !this.balanceShow;
        },
        hide() {
            this.flag = !this.flag;
        },
        deposit(item) {
            let data = [];
            data.push((item.amount * 1).toFixed(4));
            data.push(item.token);
            // console.log(data)
            this.$router.push({
                path: "/recharge-coin",
                query: { data: data, icon: item.icon }
            });
        },
        //提现
        withdraw(item) {
            this.$router.push({
                path: "/withdraw",
                query: { token: item.token }
            }
            );
        },


    },
    created() {
        this.getTokenSet();
        // this.getFaker();    // 做完删
    },
};