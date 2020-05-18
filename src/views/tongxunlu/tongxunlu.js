
export default {
    name: "tongxunlu",
    data() {
        return {
            
        };
    },
    methods:{
        // 跳转到 聊天界面
        toLiaotian(){
            this.$router.push({
                path:"liaotian",
                params:{
                    me:"xxx",
                    he:"yyy",
                },
            });
        },
    }
};