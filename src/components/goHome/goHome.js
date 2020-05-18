
export default {
    name: "goHome",
    data() {
        return {
            top:3.2,
            left:3.2,
        };
    },
    methods:{
        // 点击回首页
        goHome(e){
            this.$router.replace("/");
        },

        // 移动
        move(e){
            let px = e.touches[0].pageX;
            let py = e.touches[0].pageY;
            this.top=py-20;
            this.left=px-20;
        },
    },
};