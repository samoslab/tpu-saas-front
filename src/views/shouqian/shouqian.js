
export default {
    name: "fuqian",
    data() {
        return {
            active:1,               // 云支付 本地支付 哪个激活
            payValue:"SAMO",        // 支付类型
            payType:[               // 支付类型 下拉选项
                {text:"SAMO",value:"SAMO"},
                {text:"SAMO1",value:"SAMO1"},
                {text:"SAMO2",value:"SAMO2"},
            ],  

            walletAddress:"xxx",    // 钱包地址
            userName:"1111samo",    // 用户名
        };
    },
    methods:{
        // 点击返回
        onClickLeft(){
            console.log("返回");
        },

        // 点击 支付
        pay(){
            if(this.address===""){
                this.$toast("请输入转出地址");
                return;
            }
            if(this.num===""){
                this.$toast("请输入金额");
                return;
            }
            this.payPopup=true;
        },
        // 支付 弹出层 点击取消
        payPopupCancel(){
            this.payPopup=false;
            this.keyShow=false;
            this.popupTitle="支付";
        },
        // 弹出层 里的 下一步 按钮
        nextCommit(){
            if(!this.keyShow){
                this.keyShow=true;
                this.popupTitle="输入密码";
                return;
            }
            // 后端 添加 付账接口 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
            if(this.key===""){
                this.$toast("密码不能为空");
                return;
            }
            this.$toast("暂无后端支付接口");
            this.payPopupCancel();


        },
    }
};