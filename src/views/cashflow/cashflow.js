
export default {
    name: "cashflow",
    data() {
        return {
            active: 0,       // 充值/提现 记录 切换
            rechargeList: [],    // 充值记录 数据列表
            cashOutList: [],     // 提现记录 数据列表
            depositPage: 1,
            withdrawPage: 1,
            loading: false,
            finished: false,
            LoadingFlag: true
        };
    },
    methods: {
        // 获取充值记录数据
        getRechargeList() {
            this.$post2('pay/api/index/depositlist', {})
                .then((res) => {
                    this.rechargeList = res.list;
                })
        },

        // 获取提现记录数据
        getCashOutList() {
            this.$post2("pay/api/index/withdrawlist", {})
                .then(res => {
                    this.cashOutList = res.list;
                });
        },
        hashTx(token, txhash) {

            this.$router.push({
                path: "/tx",
                query: { token: token, txhash: txhash }
            }); //请求
        }
    },
    created() {
        this.getRechargeList();
        this.getCashOutList();
    }
};