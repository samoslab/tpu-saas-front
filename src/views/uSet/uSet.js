
export default {
    name: "uSet",
    data() {
        return {
            columns: [],             // 默认通证 的选项 内容
            tongzhengShow: false,    // 默认通证 选项 是否显示

            nickname: "",            // 设置的 昵称
            nicknameShow: false,     // 昵称 弹出层 是否显示

            avatarShow: false,       // 头像 弹出层 是否显示
            fileList: "",            // 头像地址
        };
    },
    created() {
        // console.log(localStorage.userInfo);

        let st = JSON.parse(localStorage.userInfo);

        this.nickname = st.username;
    },
    methods: {
        // 默认通证 选完 点 确定 后
        TZConfirm(value) {   // SAMO HAI GALT NULS TPU ...
            this.$post2("user/index/setDefaultToken", {
                token: value
            })
                .then(res => {
                    this.$toast("设置成功");
                });
            this.tongzhengShow = false;
        },
        // 默认通证 选完 点 取消 后
        TZCancel() {
            this.tongzhengShow = false;
        },


        // 设置昵称 确定
        nicknameConfirm() {
            if (this.nickname == "") {
                this.$toast("昵称不能为空");
                return;
            } else {
                this.$post2("user/api/index/setNickname", {
                    nickname: this.nickname
                }).then(res => {
                    let obj = JSON.parse(localStorage.userInfo);
                    obj.username = this.nickname;
                    global.defConfig.username = this.nickname;
                    localStorage.setItem("userInfo", JSON.stringify(obj));
                    this.$toast("昵称设置成功");
                });
            }
        },


        // 设置头像 确定
        avatarConfirm() {
            this.$post2("user/api/index/setAvatar", {
                avatar: this.fileList
            })
                .then(res => {
                    let obj = JSON.parse(localStorage.userInfo);
                    obj.avatar = res.url;
                    global.defConfig.avatar = res.url;
                    localStorage.setItem("userInfo", JSON.stringify(obj));
                    this.$toast("设置头像成功");
                })
                .catch(err => {
                    this.$toast(err);
                });
        },
        // 头像上传
        afterRead(file) {
            this.fileList = file.content;
        },
    }
};