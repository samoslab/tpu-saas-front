import Vue from "vue";
import "./plugins/axios";
import App from "./App/App.vue";
// import VueSocketIO from 'vue-socket.io';
import router from "./router";
import store from "./store";
import "./utils/registerServiceWorker";

// export const SocketInstance = socketio();
//  Vue.use(VueSocketIO, SocketInstance)

// Vue.use(new VueSocketIO({
//     debug: true,
//     connection: "http://127.0.0.1:9901/?x-auth=" + localStorage.getItem("accessToken") + "&app=tpu",
//     vuex: {
//         store,
//         actionPrefix: 'SOCKET_',
//         mutationPrefix: 'SOCKET_'
//     },
//     options: { path: "/" } //Optional options
// }));




// 自定义组件 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

import tabBar from "@/components/tabBar/tabBar.vue";
Vue.component("tab-bar", tabBar);
import yButton from "@/components/yButton/yButton.vue";
Vue.component("y-button", yButton);
import goHome from "@/components/goHome/goHome.vue";
Vue.component("go-home", goHome);
import navBar from "@/components/navBar/navBar.vue";
Vue.component("nav-bar", navBar);


// 自定义组件 ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

// v-clipboard ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
import vClipBoard from "vue-clipboard2";
Vue.use(vClipBoard);

// v-clipboard ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑


import VueQrcodeReader from 'vue-qrcode-reader';
Vue.use(VueQrcodeReader);


//页面缩放
import "./utils/until.js";

// 主域
import domain from "./utils/url.js";
global.domain = domain;

// 公共方法
import utils from "./utils/until.js";
Vue.prototype.$utils = utils;

// 网络请求封装
import { postAjax, postAjax2, postAjax3, saveLoginSession } from "./utils/http.js";
Vue.prototype.$post = postAjax;
Vue.prototype.$post2 = postAjax2;
Vue.prototype.$post3 = postAjax3;
Vue.prototype.$saveLoginSession = saveLoginSession;

// 导入 sha256加密 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
import { SHA256 } from "./utils/SHA256.js";
Vue.prototype.$SHA256 = SHA256;

// 初始化CSS
import "./assets/css/common.css";

// 导入 weixin-js-sdk
import wx from "weixin-js-sdk";
Vue.prototype.wx = wx;

Vue.config.productionTip = false;

// 导入 vant Ui ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
import {
    Popup,
    DatetimePicker,
    Picker,
    Field,
    Dialog,
    Toast,
    Icon,
    NavBar,
    PullRefresh,
    Button,
    Cell,
    CellGroup,
    RadioGroup,
    Radio,
    Tab,
    Tabs,
    Uploader,
    ImagePreview,
    List,
    Collapse,
    Divider,
    CollapseItem,
    IndexBar,
    IndexAnchor,
    ActionSheet,
    Loading,
    Search,
    Tag,
    DropdownMenu,
    DropdownItem,
} from "vant";
Vue.use(IndexBar);
Vue.use(ActionSheet);
Vue.use(IndexAnchor);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(List);
Vue.use(Popup);
Vue.use(Picker);
Vue.use(Field);
Vue.use(Dialog);
Vue.use(Toast);
Vue.use(Icon);
Vue.use(NavBar);
Vue.use(PullRefresh);
Vue.use(Button);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Uploader);
Vue.use(ImagePreview);
Vue.use(Divider);
Vue.use(DatetimePicker);
Vue.use(Loading);
Vue.use(Search);
Vue.use(Tag);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
// 导入 vant Ui ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑




new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
