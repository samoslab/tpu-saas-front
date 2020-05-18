
export default {
    name: "feedback",
    data() {
        return {
            message:''
        };
    },
    methods:{
        bind(){
            if( this.message === '' ){
                this.$dialog.alert({
                    message: '反馈内容不能为空'
                })
            }else{
                this.$post2("im/index/feedback", {
                  msg:this.message
                })
                .then( (res) => {
                    this.$toast('反馈成功');
                    this.$router.go(-1);
                }).catch(err=>{
                    this.$toast(err);
                })
            }
        },
    }
};