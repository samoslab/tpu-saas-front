
export default {
    name: "navBar",
    data() {
        return {

        };
    },
    props: {
        title: {
            type: String,
            default: "默认文字",
        },
        left: {
            type: Boolean,
            default: true,
        },
        transparent: {
            type: Boolean,
            default: false,
        }
    },
    methods: {
        routerBack() {
            this.$router.back(-1);
        },
        onClickUc() {
            this.$router.push({ path: "/home" });
        }
    }
};