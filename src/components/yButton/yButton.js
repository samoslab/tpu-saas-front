
export default {
    name: "yButton",
    data() {
        return {
            
        };
    },
    methods:{
        // 点击之后 再把点击事件发送出去
        click(){
            this.$emit("click");
        },
    },
    props:{
        blue:{
            type:Boolean,
            default:false,
        }
    }
};