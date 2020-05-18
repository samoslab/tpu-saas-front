
export default {
    name: "home",
    data() {
        return {
            navList: [   // 红包... 12个选项 的数据
                {
                    name: "红包",
                    src: require("@/assets/logo.png"),
                    to: "/liaotian",
                    icon: "hongbao",
                    class: "active"
                },

                {
                    name: "印迹",
                    src: require("@/assets/logo.png"),
                    to: "/track",
                    icon: "jiaoyin",
                    class: "inactive"

                },
                {
                    name: "票务",
                    src: require("@/assets/logo.png"),
                    to: "/ticket",
                    icon: "huochepiao",
                    class: "inactive"

                },
                {
                    name: "学院",
                    src: require("@/assets/logo.png"),
                    to: "/tpuschool",
                    icon: "xuexiao",
                    class: "inactive"

                },
                {
                    name: "挖矿",
                    src: require("@/assets/logo.png"),
                    to: "/dig",
                    icon: "wakuang",
                    class: "inactive"

                },

                // {
                //     name: "接龙",
                //     src: require("@/assets/logo.png"),
                //     to: "/test",
                //     icon: "paobu",
                //     class: "inactive"

                // },
                // {
                //     name: "公益",
                //     src: require("@/assets/logo.png"),
                //     to: "/charit",
                //     icon: "gongyi",
                //     class: "inactive"

                // },

                // {
                //     name: "发现",
                //     src: require("@/assets/logo.png"),
                //     to: "/find",
                //     icon: "faxian",
                //     class: "inactive"

                // },
                // {
                //     name: "卡券",
                //     src: require("@/assets/logo.png"),
                //     to: "/plaza",
                //     icon: "kaquan",
                //     class: "inactive"

                // },
                // {
                //     name: "项目直播",
                //     src: require("@/assets/logo.png"),
                //     to: "/tpulive",
                //     icon: "live",
                //     class: "inactive"

                // },


                // {
                //     name: "支持我们",
                //     src: require("@/assets/logo.png"),
                //     to: "/test",
                //     icon: "kaixin",
                //     class: "active"

                // },
                // {
                //     name: "感谢",
                //     src: require("@/assets/logo.png"),
                //     to: "/thanks",
                //     icon: "paobu",
                //     class: "active"

                // },
                {
                    name: "更多",
                    src: require("@/assets/logo.png"),
                    to: "/more",
                    icon: "shenglue",
                    class: "active"

                },
            ],
        };
    },
    created() {

        // if ((typeof (localStorage.phone) == "undefined" || localStorage.phone == 0 || localStorage.phone == "") && localStorage.openid) {

        //     this.$router.push("/sPhone?bindPhone=1");
        // }
    }



};