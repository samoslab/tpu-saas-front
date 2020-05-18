import Loading from '../../components/Loading';
export default {
    name: "redRecode",
    components: { Loading },
    props: ['num'],
    data() {
        return {
            active: 0,          // 我发布/收到 切换
            loading: false,
            finished: false,
            LoadingFlag: true,
            sendPage: 1,
            receivePage: 1,
            sendRedList: [],     // 我发出的红包 数据 列表
            receiveRedList: [],  // 我收到的红包 数据 列表
        };
    },
    watch: {
        num(news, old) {
            this.sendPage = 1;
            this.receivePage = 1;

            this.finished = false;
            this.LoadingFlaf = true;
            this.sendRedList = [];
            this.sendRedList = [];
        }
    },
    methods: {
        // 获取 我发出的红包 数据 列表
        getSendRedList() {
            this.$post2("redpkt/Index/getMySentList", {
                page: this.sendPage++
            })
                .then(res => {
                    this.sendRedList = res.list;
                    this.LoadingFlag = false;
                    console.log("res=>", res);
                });
        },
        onLoad() {
            if (this.active == 0) {
                this.getSendRedList();
            } else {
                this.getReceiveRedList();
            }
            // 异步更新数据
            setTimeout(() => {
                for (let i = 0; i < this.Data.length; i++) {
                    this.list.push(this.Data[i]);
                }
                // 加载状态结束
                this.loading = false;
                // 数据全部加载完成
                if (this.Data.length < 10) {
                    this.finished = true;
                }
            }, 500);
        },

        // 获取 我收到的红包 数据 列表
        getReceiveRedList() {
            this.$post2('redpkt/Index/getMyReceiveList', {})
                .then(res => {
                    console.log(res);
                    this.receiveRedList = res.list;
                })
        }
    },
    created() {
        this.getSendRedList();
        this.getReceiveRedList();
    },
};
