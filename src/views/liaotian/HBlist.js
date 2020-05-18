const HBlist = {
    data() {
        return {

        };
    },
    methods: {
        // 获取 红包列表
        getRoom() {
            this.$post2("/im/index/hongbaoSquare").then(res => {
                let isme = false;
                // let j = 1;
                // while (j < 10) {


                for (var i = 0; i < res.length; i++) {
                    isme = res[i].sender === this.uid;
                    if (res[i].type == 5) {//红包
                        if (!res[i].wishing) {
                            res[i].wishing = "恭喜发财";
                        }
                        let o = {
                            type: "hongbao",
                            isme,
                            amount: res[i].amount,
                            avatar: res[i].avatar || global.defConfig.avatar,
                            num: res[i].num,
                            opened: res[i].opened_num,
                            token: res[i].token,
                            secret: res[i].secret,
                            wishing: res[i].wishing,

                            username: res[i].username,
                            create_at: res[i].create_at,
                            rid: res[i].msg
                        };
                        this.liaotianData.push(o);
                    }
                }
                //     j++;
                // }

                this.chatGoBottom();
            }).catch((e) => {

            });
        },


        // 获取 假红包列表
        getFakerRoom() {
            let res = [
                {
                    rid: "SAMO.202003102003-125",
                    uid: 1,
                    token: "SAMO",
                    amount: 5,
                    num: 2,
                    secret: "^_^",
                    create_at: "2020-03-10 20:03:00 ",
                    opened: 0,
                    avatar: "http://s2.yqkkn.com/static/images/35/a1/5d8b9c7886638.png",
                    username: "TPUChain"
                },
                {
                    rid: "SAMO.202003102002-124",
                    uid: 1,
                    token: "SAMO",
                    amount: 2,
                    num: 2,
                    secret: "天王盖地虎",
                    create_at: "2020-03-10 20:02:06 ",
                    opened: 0,
                    avatar: "http://s2.yqkkn.com/static/images/35/a1/5d8b9c7886638.png",
                    username: "TPUChain"
                },
                {
                    rid: "SAMO.202003101925-123",
                    uid: 1,
                    token: "SAMO",
                    amount: 1,
                    num: 1,
                    secret: "^_^",
                    create_at: "2020-03-10 19:25:25 ",
                    opened: 0,
                    avatar: "http://s2.yqkkn.com/static/images/35/a1/5d8b9c7886638.png",
                    username: "TPUChain"
                }
            ];
            let isme = false;
            for (var i = 0; i < res.length; i++) {
                isme = res[i].username === this.username;
                let o = {
                    type: "hongbao",
                    isme,
                    amount: res[i].amount,
                    avatar: res[i].avatar || global.defConfig.avatar,
                    num: res[i].num,
                    opened: res[i].opened,
                    token: res[i].token,
                    secret: res[i].secret,
                    username: res[i].username,
                    create_at: res[i].create_at,
                    rid: res[i].rid
                };
                this.liaotianData.push(o);
            }
        },
    },
    created() {
        this.getRoom();

    }
};

export default HBlist;