import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

// component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
let needRequiresAuth = true; // 是否需要检查 登录

// 引入 我自己的 routes
import { yRoutes } from "./yRoutes.js";
const routes = [


    {
        path: "/plaza",
        name: "plaza",
        component: () =>
            import(/* webpackChunkName: "plaza" */ "../views/plaza/plaza.vue"),
        meta: {
            requiresAuth: needRequiresAuth
        }
    },
    {
        path: "/openredpkt",
        name: "openredpkt",
        component: () =>
            import(/* webpackChunkName: "openredpkt" */ "../views/openredpkt/openredpkt.vue"),
        meta: {
            requiresAuth: needRequiresAuth
        }
    },
    {
        path: "/find",
        name: "find",
        component: () =>
            import(/* webpackChunkName: "find" */ "../views/find/find.vue"),
        meta: {
            requiresAuth: needRequiresAuth
        }
    },
    //我
    {
        path: "/my",
        name: "my",
        component: () => import(/* webpackChunkName: "my" */ "../views/my/my.vue"),
        meta: {
            requiresAuth: needRequiresAuth
        }
    },
    //我的成就
    {
        path: "/my-achievement",
        name: "my-achievement",
        component: () => import("../views/my-menu/achievement.vue"),
        meta: {
            requiresAuth: needRequiresAuth
        }
    },
    //充币地址
    {
        path: "/my-recharge",
        name: "my-recharge",
        component: () => import("../views/my-menu/recharge-address.vue"),
        meta: {
            requiresAuth: needRequiresAuth
        },
        beforeEnter: (to, from, next) => {
            console.log(global.accessToken);
            if (!global.accessToken) {
                next("/login");
            } else {
                next();
            }
        }
    },
    //充币码
    {
        path: "/recharge-coin",
        name: "recharge-coin",
        component: () => import("../views/my-menu/recharge/Coin.vue"),
        meta: {
            requiresAuth: needRequiresAuth
        }
    },

    //注册
    {
        path: "/register",
        name: "register",
        component: () => import("../views/login/Register.vue")
    },
    //登录
    {
        path: "/login",
        name: "login",
        component: () => import("../views/login/Login.vue")
    },
    //分享页面
    {
        path: "/share",
        name: "share",
        component: () => import("../views/share/share.vue")
        // meta: {
        //   requiresAuth: true
        // }
    },
    //活动
    {
        path: "/events",
        name: "events",
        component: () => import("../views/my-menu/activity/index.vue")
        // meta: {
        //   requiresAuth: true
        // }
    },
    //活动详情
    {
        path: "/showactivity",
        name: "showactivity",
        component: () => import("../views/my-menu/activity/showactivity.vue")
        // meta: {
        //   requiresAuth: true
        // }
    },


    ...yRoutes,
];



const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    // console.log("router", to);
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!checkUser()) {
            next(); // 暂时关闭 登录
            next({
                path: "/login",
                query: {
                    redirect: to.fullPath
                }
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;

function checkUser() {
    if (localStorage.accessToken) {
        return true;
    } else {
        let info = getUserInfo();
        if (!info) {
            return false;
        }
        return true;
    }
}

function getUserInfo() {
    try {
        let st = localStorage.userInfo;
        console.log(st);
        let res = JSON.parse(localStorage.userInfo);
        global.accessToken = res.accessToken;
        global.userInfo = res;
        global.defaultToken = res.defaultToken;
        return res;
    } catch (e) {
        return null;
    }
}

export function logout() {
    global.accessToken = null;
    global.userInfo = null;
    global.defaultToken = null;

    localStorage.removeItem("defaultToken")
    localStorage.removeItem("accessToken")
    localStorage.removeItem("app")
    localStorage.removeItem("phone")
    localStorage.removeItem("userInfo");
    router.push({ path: "/login" });
}
