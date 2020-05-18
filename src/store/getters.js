// 这里写 store 的计算属性
export default{
    // 主界面背景
    appBackground(state,getters){//App 背景
        return {
            backgroundImage:`url(${state.bg})`,
            backgroundPosition:"100% 100%",
            backgroundSize:"contain",
        };
    },
};