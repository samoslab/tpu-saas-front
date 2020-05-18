
export default {
    name: "tabBar",
    data() {
        return {
            activeIndex:0,  // 激活状态
        };
    },
    methods:{
        // 点击 tabBar 哪个就变蓝
        activeClass(index){
            this.activeIndex=index;
        },
    }
};