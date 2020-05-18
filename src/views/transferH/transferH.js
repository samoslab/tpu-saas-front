
export default {
    name: "transferHim",
    data() {
        return {
            remarks:"",         // 备注
            num:1,              // 转账金额
        };
    },
    methods:{
        // 确认转账
        transferMoney(){
            this.$toast("后端暂无转账接口");
        },
    }
};