import qs from "qs";
import axios from "axios";
import { logout } from "@/router";
import Vue from "vue";

function open() {
    var loadBox = document.getElementById("loadModel");
    loadBox ? (loadBox.style.display = "block") : null;
}

function close() {
    var loadBox = document.getElementById("loadModel");
    loadBox ? (loadBox.style.display = "none") : null;
}

// function open() {
//     var loadBox = document.getElementById("loadModel");
//     loadBox.style.display = "block";
// }

// function close() {
//     var loadBox = document.getElementById("loadModel");
//     loadBox.style.display = "none";
// }

axios.interceptors.request.use(
    function (config) {
        //在发送请求之前做一些事情
        return config;
    },
    function (error) {
        // 请求错误做一些事情
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    function (response) {
        //对响应数据做一些处理
        return response;
    },
    function (error) {
        // 对响应失败做一些处理
        return Promise.reject(error);
    }
);

//post封装
export function postAjaxv(url, data = {}) {
    open();
    return new Promise((resolve, reject) => {
        axios
            .post(url, data, {
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                    "crossDomain": true,
                    "x-auth": localStorage.accessToken,
                    'x-app': "tpu"
                }
            })
            .then(
                response => {
                    close();
                    resolve(response.data);
                },
                err => {
                    close();
                    reject(err);
                }
            );
    });
}

//post封装
export function postAjax(url, data = {}) {
    open();
    return new Promise((resolve, reject) => {
        axios
            .post(url, qs.stringify(data), {
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    "Content-Type": "application/x-www-form-urlencoded",
                    // "Access-Control-Allow-Credentials": true,
                    // "crossDomain": true,
                    "x-auth": localStorage.accessToken,
                    'x-app': "tpu"
                }
            })
            .then(
                response => {
                    close();
                    resolve(response.data);
                },
                err => {
                    close();
                    reject(err);
                }
            );
    });
}

export function postAjax2(url, data = {}) {
    open();
    return new Promise((resolve, reject) => {
        if (!/^http/.test(url)) {
            url = global.domain.domain + url;
        }
        axios
            .post(url, qs.stringify(data), {
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    "Content-Type": "application/x-www-form-urlencoded",
                    "x-auth": localStorage.accessToken,
                    'x-app': "tpu"

                }
            })
            .then(
                response => {
                    close();
                    let d = response.data;
                    if (d.code == 0) {
                        resolve(response.data.result);
                    } else {
                        Vue.prototype.$toast(response.data.msg);
                        if (d.code == 1000) {
                            logout();
                            return;
                        }
                        reject(response.data.msg);
                    }
                },
                err => {
                    close();
                    Vue.prototype.$toast(err.message);
                    reject(err);
                    if (err.response.status == 1000) {
                        logout();
                        return;
                    }
                }
            );
    });
}

export function postAjax3(url, data = {}) {
    open();
    return new Promise((resolve, reject) => {
        if (!/^http/.test(url)) {
            url = global.domain.domain + url;
        }
        axios
            .post(url, qs.stringify(data), {
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    "Content-Type": "application/x-www-form-urlencoded",
                    "x-auth": localStorage.accessToken,
                    'x-app': "tpu"

                }
            })
            .then(
                response => {
                    close();
                    let d = response.data;
                    if (d.code == 0) {
                        resolve(response.data);
                    } else {
                        Vue.prototype.$toast(response.data.msg);
                        if (d.code == 403) {
                            logout();
                            return;
                        }
                        reject(response.data.msg);
                    }
                },
                err => {
                    close();
                    Vue.prototype.$toast(err.message);
                    reject(err);
                    if (err.response.status == 403) {
                        logout();
                        return;
                    }
                }
            );
    });
}



//get封装
export function getAjax(url, data = {}) {
    open();
    return new Promise((resolve, reject) => {
        axios
            .get(url, data, {
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    "Content-Type": "application/json"
                }
            })
            .then(
                response => {
                    close();
                    resolve(response.data);
                },
                err => {
                    close();
                    reject(err);
                }
            );
    });
}

//保存登录信息
export function saveLoginSession(res) {



    global.accessToken = res.accessToken;
    global.userInfo = res;
    global.defaultToken = res.defaultToken;

    localStorage.accessToken = res.accessToken;
    localStorage.app = res.app;
    localStorage.phone = res.phone;
    localStorage.openid = res.openid;
    localStorage.userInfo = JSON.stringify(res);
}