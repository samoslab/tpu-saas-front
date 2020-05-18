// store里的 基础state数据
const state = {
    message: "尹力小哥哥最帅"
};

// 配置信息
import Vue from "vue";
import Vuex from "vuex";

// 另外仨抽离出去了
import mutations from "./mutations.js";
import getters from "./getters.js";
import actions from "./actions.js";


Vue.use(Vuex);

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,

    // 模块不咋用
    modules: {}
});