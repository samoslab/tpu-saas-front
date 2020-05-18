// 这里写改变state 的方法 this.$store.commit("方法名",payload)
export default{
    // 网络请求后 把data.json 增加 到 state内
    addData(state,payload){
        // Object.assign(state,payload); 混入是无效的 vue视图不更新
        Object.keys(payload).forEach(key=>{
            // 这里this 是Store实例 里面有个_vm 是Vue实例
            this._vm.$set(state,key,payload[key])
        })
    },
};