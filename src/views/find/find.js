
import foot from "@/components/foot.vue";
export default {
    name: "find",
    components: {
        foot
    },
    data() {
        return {
            dataArr: [
                {
                    path: "/events",
                    name: "活动屋",
                    disable: 0
                },
                {
                    path: "",
                    name: "砸金蛋",
                    disable: 1
                },
                {
                    path: "",
                    name: "答题红包",
                    disable: 1
                },
                {
                    path: "",
                    name: "爱情誓言",
                    disable: 1
                }
            ]
        };
    },
    methods: {
        getAlert() {
            this.$toast("敬请期待");
        }
    }
};