
import HBlist from "./HBlist.js";   // 同上

import manual from "@/components/manual/manual.vue";


import BScroll from "better-scroll";
export default {
    name: "liveroom",
    data() {
        return {
            title: "项目直播",
            username: "",        // 用户名
            uid: "",//自己的UID
            avatar: "",          // 用户头像
            phoneNum: "",        // 用户电话

            editMsg: "",         // 聊天框输入的内容
            scroll: null,        // 聊天滚动区域
            addVisible: true,   // 点击加号之后 展开的 发图区域
            editPorHeight: 1.2,  // edit_por 高度
            ws: null,            // 用来 实例 WS协议
            sid: 0, //当前websocket的连接id
            topic_id: 0,


            consoleData: [], // 控制台日志
            messageData: [], // 消息记录
            instance: WebSocket, // ws instance
            address: 'ws://127.0.0.1:9501', // 链接地址
            alert: {
                class: 'success',
                state: false,
                content: '',
                timer: undefined
            },
            content: '',
            heartBeatSecond: 1,
            heartBeatContent: 'PING',
            autoSend: false,
            autoTimer: undefined,
            sendClean: false,
            recvClean: false,
            recvDecode: false,
            connected: false,
            recvPause: false

        };
    },
    // sockets: {
    //     //查看socket是否渲染成功
    //     connect() {
    //         console.log("链接成功");
    //     },
    //     disconnect() {
    //         console.log("断开链接");
    //     },//检测socket断开链接 
    //     reconnect() {
    //         console.log("重新链接");
    //     },
    //     //客户端接收后台传输的socket事件
    //     message(data) {
    //         this.$notify({
    //             title: '新消息',
    //             message: data,
    //             type: 'warning',
    //             duration: 10000
    //         });
    //         console.log("data", data);//接收的消息
    //     }
    // },

    created() {

        // this.checkWs();
    },
    mounted() {
        // 设置聊天滚动区域
        this.scroll = new BScroll(".content_wrap", {
            scrollY: true,
            click: true,

        });
        this.topic_id = this.$route.query.topic_id;


        // 等后端 ws 弄好
        // this.checkWs();


        // 获取个人 用户名 头像 电话
        this.getUserInfo();

        this.imgLoaded();
        // this.$socket.emit('connect', 1);
        // this.joinInChatRoom();


    },
    methods: {
        checkWs() {
            console.log("checkWs");

            if (!this.ws) {
                this.connectWs();
            } else if (this.ws.readyState == 2) {
                this.connectWs();
            }
        },
        // 连接 ws
        connectWs() {
            console.log("connectWs");
            this.ws = new WebSocket("ws://127.0.0.1:9901/?x-auth=" + localStorage.getItem("accessToken"));
            // 连接服务器
            // 刚打开连接时
            this.ws.onopen = () => {
                // this.sid = this.ws;
                // 发送消息 只能是字符串
                // let cmd = {
                //     "act":""
                // }
                let message = {
                    "cmd": 1,
                    "body": {
                        "accessToken": localStorage.accessToken,
                    }
                }
                this.ws.send(JSON.stringify(message));

                console.log(this.ws);

            };
            // 接收 来自 客户端 的消息时
            this.ws.onmessage = (e) => {    // e.data 里就是数据
                console.log(e);
                let o = JSON.parse(e.data);
                if (o.ok == 0) {
                    let cmd = o.cmd;
                    if (cmd == 1) {
                        this.sid = 1;
                    } else {
                        this.getMsg(e.result);
                    }
                } else {
                    this.$toast(o.msg);
                }

            };
            this.ws.onclose = function () {
                // 关闭 websocket
                this.sid = 0;
                console.log("连接已关闭...");
            };
            this.ws.onerror = (e) => {
                this.sid = 0;
                console.log("连接错误...");
                console.log(e);

            }



        },
        // 发送给服务器方法 封装
        postMsg(message) {

            this.$socket.emit(JSON.stringify(message));

            // if (this.sid) {
            //     if (this.ws) {
            // this.ws.send(JSON.stringify(message));
            //     } else {
            //         console.log("ws failed");
            //     }
            // } else {
            //     console.log("failed");
            // }

        },
        // 从服务器 接受数据 方法 封装
        getMsg(str) {
            let obj = JSON.parse(str);
            if (obj.username === this.username) {
                obj.isme = true;
                obj.username = "我";
            }
            this.liaotianData.push(obj);
            this.chatGoBottom();
        },
        // 我刚进入聊天室
        // joinInChatRoom() {
        //     let data = {
        //         type: "public",
        //         isme: false,
        //         avatar: "",
        //         msg: `${this.username}进入了聊天室`,
        //         imgSrc: "",
        //         username: this.username,
        //     };
        //     // 发给服务器
        //     this.postMsg(data);
        // },




        // 图片加载完
        imgLoaded() {
            this.$nextTick(() => {
                this.scroll.refresh();
                let chatContentHeight = this.scroll.maxScrollY;
                this.scroll.scrollTo(0, chatContentHeight, 0);
            });
        },
        // 把聊天区域 拉到最底部
        chatGoBottom() {
            // 必须加nextTick 才能 发完消息 到最底
            this.$nextTick(() => {
                this.scroll.refresh();
                let chatContentHeight = this.scroll.maxScrollY;
                this.scroll.scrollTo(0, chatContentHeight, 200);
            });
        },

        // 点击 小飞机 发送消息
        sendMsg() {
            if (this.editMsg === "") {
                return;
            }
            // this.liaotianData.push({
            //     type: "text",
            //     isme: true,
            //     avatar: "https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=216605226,3652567530&fm=111&gp=0.jpg",
            //     msg: this.editMsg,
            //     imgSrc: "",
            //     username: "我",
            // });

            // 等有 ws 后 用下面这段

            let message = {
                "cmd": 2,
                "body": {
                    "accessToken": localStorage.accessToken,
                    "data_type": "text",
                    "topic_id": this.topic_id,
                    "msg": this.editMsg
                }
            }

            this.postMsg(message);
            // this.$socket.emit(data);


            this.editMsg = "";
            this.chatGoBottom();
        },

        // 点击 加号 下方隐藏区域 展示
        add() {
            this.addVisible = !this.addVisible;
            if (this.addVisible) {
                this.editPorHeight = 2;
            } else {
                this.editPorHeight = 1.2;
            }
            this.chatGoBottom();
        },
        // 点击 空白区域 隐藏 下方 加号区
        cancelAdd() {
            this.addVisible = true;
            // this.editPorHeight = 1.2;
            this.editPorHeight = 2;

            this.chatGoBottom();
        },

        // 选完图片  点完确定
        afterRead(file) {
            this.liaotianData.push({
                type: "img",
                isme: true,
                avatar: "https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=216605226,3652567530&fm=111&gp=0.jpg",
                msg: "",
                imgSrc: file.content,
                username: "我",
            });

            // 等有 ws 后 用下面这段
            // let data = {
            //     type:"img",
            //     isme:false,
            //     avatar:"https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=216605226,3652567530&fm=111&gp=0.jpg",
            //     msg:"",
            //     imgSrc:file.content,
            //     username:this.username,
            // }
            // this.postMsg(data);

            this.chatGoBottom();
            this.cancelAdd();
        },

        // 个人数据(用户名 电话 头像)
        getUserInfo() {
            this.userInfo = JSON.parse(localStorage.userInfo);
            this.username = this.userInfo.username;
            this.phoneNum = this.userInfo.phone;
            this.uid = this.userInfo.uid;
            this.avatar =
                this.userInfo.avatar != ""
                    ? /*'http://s.yqkkn.com/'+*/ this.userInfo.avatar
                    : global.defConfig.avatar;
        },
    },
    mixins: [HBlist],
    components: {
        manual,
    }
};