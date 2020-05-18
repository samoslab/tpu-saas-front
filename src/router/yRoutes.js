let needRequiresAuth = true; // 是否需要检查 登录

export let yRoutes = [
    // 首页
    {
        path: "/",
        name: "default page",
        component: () =>
            import("../views/hongbao/fahongbao.vue"),
        meta: {
            requiresAuth: needRequiresAuth // 需要登录
        }
    },
    {
        path: "/home",
        name: "home",
        component: () =>
            import(/* webpackChunkName: "home" */ "../views/home/home.vue"),
        meta: {
            requiresAuth: needRequiresAuth // 需要登录
        }
    },
    {
        path: "/tpuschool",
        name: "tpuschool",
        component: () =>
            import("../views/tpuschool/tpuschool.vue"),
        meta: {
            requiresAuth: needRequiresAuth // 需要登录
        }
    },
    {
        path: "/ticket",
        name: "ticket",
        component: () =>
            import("../views/ticket/ticket.vue"),
        meta: {
            requiresAuth: needRequiresAuth // 需要登录
        }
    },
    {
        path: "/tpulive",
        name: "tpulive",
        component: () =>
            import("../views/tpulive/tpulive.vue"),
        meta: {
            requiresAuth: needRequiresAuth // 需要登录
        }
    },
    {
        path: "/liveroom",
        name: "liveroom",
        component: () =>
            import("../views/tpulive/room.vue"),
        meta: {
            requiresAuth: needRequiresAuth // 需要登录
        }
    },
    {
        path: "/thanks",
        name: "thanks",
        component: () =>
            import("../views/thanks/thanks.vue"),
        meta: {
            requiresAuth: needRequiresAuth // 需要登录
        }
    },
    {
        path: "/charit",
        name: "charit",
        component: () =>
            import("../views/charit/charit.vue"),
        meta: {
            requiresAuth: needRequiresAuth // 需要登录
        }
    },
    {
        path: "/track",
        name: "track",
        component: () =>
            import("../views/track/track.vue"),
        meta: {
            requiresAuth: needRequiresAuth // 需要登录
        }
    },
    {
        path: "/dig",
        name: "dig",
        component: () =>
            import("../views/dig/dig.vue"),
        meta: {
            requiresAuth: needRequiresAuth // 需要登录
        }
    },
    {
        path: "/team",
        name: "team",
        component: () =>
            import("../views/team/team.vue"),
        meta: {
            requiresAuth: needRequiresAuth // 需要登录
        }
    },
    // 新红包页面(旧的刷新就挂)
    {
        path: "/red",
        name: "red",
        component: () =>
            import(/* webpackChunkName: "red" */ "../views/red/red.vue"),
        meta: {
            requiresAuth: needRequiresAuth // 需要登录
        }
    },
    {
        path: "/fahongbao",
        name: "fahongbao",
        component: () =>
            import("../views/hongbao/fahongbao.vue"),
        meta: {
            requiresAuth: needRequiresAuth // 需要登录
        }
    },
    {
        path: "/caihongbao",
        name: "caihongbao",
        component: () =>
            import("../views/hongbao/openredpkt.vue"),
        meta: {
            // requiresAuth: needRequiresAuth // 需要登录
        }
    },
    {
        path: "/takehongbao",
        name: "takehongbao",
        component: () =>
            import("../views/hongbao/takehongbao.vue"),
        meta: {
            // requiresAuth: needRequiresAuth // 需要登录
        }
    },

    // 测试页面
    {
        path: "/test",
        name: "test",
        component: () =>
            import(/* webpackChunkName: "test" */ "../views/test/test.vue"),
    },

    // 付钱
    {
        path: "/fuqian",
        name: "fuqian",
        component: () =>
            import(/* webpackChunkName: "fuqian" */ "../views/fuqian/fuqian.vue"),
        meta: {
            requiresAuth: needRequiresAuth // 需要登录
        }
    },

    // 收钱
    {
        path: "/shouqian",
        name: "shouqian",
        component: () =>
            import(/* webpackChunkName: "shouqian" */ "../views/shouqian/shouqian.vue"),
        meta: {
            requiresAuth: needRequiresAuth // 需要登录
        }
    },

    // 转账
    {
        path: "/transfer",
        name: "transfer",
        component: () =>
            import(/* webpackChunkName: "transfer" */ "../views/transfer/transfer.vue"),
        meta: {
            requiresAuth: needRequiresAuth // 需要登录
        }
    },

    // 个人中心
    {
        path: "/geren",
        name: "geren",
        component: () =>
            import(/* webpackChunkName: "geren" */ "../views/ucenter/geren.vue"),
        meta: {
            requiresAuth: needRequiresAuth // 需要登录
        }
    },

    // 通讯录
    {
        path: "/tongxunlu",
        name: "tongxunlu",
        component: () =>
            import(/* webpackChunkName: "tongxunlu" */ "../views/tongxunlu/tongxunlu.vue"),
        meta: {
            requiresAuth: needRequiresAuth // 需要登录
        }
    },

    // 余额
    {
        path: "/yue",
        name: "yue",
        component: () =>
            import(/* webpackChunkName: "yue" */ "../views/yue/yue.vue"),
        meta: {
            requiresAuth: needRequiresAuth // 需要登录
        }
    },
    // 余额
    {
        path: "/card",
        name: "card",
        component: () =>
            import(/* webpackChunkName: "yue" */ "../views/card/card.vue"),
        meta: {
            requiresAuth: needRequiresAuth // 需要登录
        }
    },
    {
        path: "/more",
        name: "more",
        component: () =>
            import(/* webpackChunkName: "yue" */ "../views/more/more.vue"),
        meta: {
            requiresAuth: needRequiresAuth // 需要登录
        }
    },

    // 聊天窗口
    {
        path: "/liaotian",
        name: "liaotian",
        component: () =>
            import(/* webpackChunkName: "liaotian" */ "../views/liaotian/liaotian.vue"),
        meta: {
            requiresAuth: needRequiresAuth // 需要登录
        }
    },

    // 转账给单人
    {
        path: "/transferH",
        name: "transferH",
        component: () =>
            import(/* webpackChunkName: "transferH" */ "../views/transferH/transferH.vue"),
        meta: {
            requiresAuth: needRequiresAuth // 需要登录
        }
    },

    // 我的资产
    {
        path: "/coffer",
        name: "coffer",
        component: () =>
            import(/* webpackChunkName: "coffer" */ "../views/coffer/coffer.vue"),
        meta: {
            requiresAuth: needRequiresAuth // 需要登录
        }
    },

    // 红包记录
    {
        path: "/redRecode",
        name: "redRecode",
        component: () =>
            import(/* webpackChunkName: "redRecode" */ "../views/redRecode/redRecode.vue"),
        meta: {
            requiresAuth: needRequiresAuth // 需要登录
        }
    },

    // 充提记录
    {
        path: "/cashflow",
        name: "cashflow",
        component: () =>
            import(/* webpackChunkName: "cashflow" */ "../views/cashflow/cashflow.vue"),
        meta: {
            requiresAuth: needRequiresAuth // 需要登录
        }
    },

    // 个人设置
    {
        path: "/uSet",
        name: "uSet",
        component: () =>
            import(/* webpackChunkName: "uSet" */ "../views/uSet/uSet.vue"),
        meta: {
            requiresAuth: needRequiresAuth // 需要登录
        }
    },

    // 个人设置 => 设置手机号
    {
        path: "/sPhone",
        name: "sPhone",
        component: () =>
            import(/* webpackChunkName: "sPhone" */ "../views/uSet/sPhone/sPhone.vue"),
        meta: {
            requiresAuth: needRequiresAuth // 需要登录
        }
    },

    // 个人设置 => 设置登录密码
    {
        path: "/sPwd",
        name: "sPwd",
        component: () =>
            import(/* webpackChunkName: "sPwd" */ "../views/uSet/sPwd/sPwd.vue"),
    },

    // 个人设置 => 设置密码绑定
    {
        path: "/sPay",
        name: "sPay",
        component: () =>
            import(/* webpackChunkName: "sPay" */ "../views/uSet/sPay/sPay.vue"),
        meta: {
            requiresAuth: needRequiresAuth // 需要登录
        }
    },

    // 我的消息
    {
        path: "/myMsg",
        name: "myMsg",
        component: () =>
            import(/* webpackChunkName: "myMsg" */ "../views/myMsg/myMsg.vue"),
        meta: {
            requiresAuth: needRequiresAuth // 需要登录
        }
    },

    // 反馈
    {
        path: "/feedback",
        name: "feedback",
        component: () =>
            import(/* webpackChunkName: "feedback" */ "../views/feedback/feedback.vue"),
        meta: {
            requiresAuth: needRequiresAuth // 需要登录
        }
    },

    // 玩法
    {
        path: "/explain",
        name: "explain",
        component: () =>
            import(/* webpackChunkName: "explain" */ "../views/explain/explain.vue"),
        meta: {
            requiresAuth: needRequiresAuth // 需要登录
        }
    },
    {
        path: "/withdraw",
        name: "withdraw",
        component: () =>
            import(/* webpackChunkName: "explain" */ "../views/withdraw/withdraw.vue"),
        meta: {
            requiresAuth: needRequiresAuth // 需要登录
        }
    },
    {
        path: "/bindAddress",
        name: "bindAddress",
        component: () =>
            import(/* webpackChunkName: "explain" */ "../views/withdraw/bindAddress.vue"),
        meta: {
            requiresAuth: needRequiresAuth // 需要登录
        }
    },
]