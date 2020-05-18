import axios from "axios";
export function request(config){
    // 创建 axios 实例 (不是用 new axios)
    const instance=axios.create({
        baseURL:"/",
        timeout:2000,
    });

    // axios拦截器

    // 请求拦截
    instance.interceptors.request.use(config=>{
        // 这里会对 配置信息 拦截 要return 出去 配置信息 网络请求才能继续
        if(!config.url){
            console.log("请求的是null 或 undefined");
            return;
        }
        return config;
    },err=>{
        // 请求拦截失败
    });
    // 响应拦截(数据回来了)
    instance.interceptors.response.use(res=>{
        // 这里可以 处理 请求来的数据 要return 网络请求的地方 才能获取到数据
        return res;
    },err=>{
        // 响应拦截失败
    });

    return instance(config);
    // return出去的是个 Promise实例  网络请求的地方 可以.then
};