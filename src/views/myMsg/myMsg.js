
export default {
    name: "myMsg",
    data() {
        return {
            str: "",
            list: [],
            loading: false,
            finished: false,
            message: "",
        };
    },
    created(){
        this.$post2("im/index/recevied", {})
        .then(res => {
            this.list = res;
        });
    },
    methods:{
        onLoad() {
            // 异步更新数据
            setTimeout(() => {
                this.loading = false;
                this.finished = true;
            }, 2000);
        },
    }
};