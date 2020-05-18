import { logout } from "@/router/index.js";
export default {
    name: "geren",
    data() {
        return {
            avatar: "",
            username: "",
            phoneNum: "",
        };
    },
    created() {
        this.getUserInfo();
    },
    methods: {
        // 点击 退出登录
        logoutHandle() {
            this.$post2("user/api/passport/logout", {})
                .then(res => {
                    logout();
                });
        },

        // 个人数据(用户名 电话 头像)
        getUserInfo() {
            console.log(localStorage.userInfo);
            if (localStorage.userInfo) {
                this.userInfo = JSON.parse(localStorage.userInfo);
                console.log(this.userInfo);
                this.username = this.userInfo.username;
                this.phoneNum = this.userInfo.phone;
                this.avatar =
                    this.userInfo.avatar != ""
                        ? /*'http://s.yqkkn.com/'+*/ this.userInfo.avatar
                        : global.defConfig.avatar;
            } else {
                logout();
            }

        },
    },
};