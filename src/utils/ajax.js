/*
ajax 异步无刷请求数据 类似定外卖
1 浏览器                        手机
2 ajax对象                      饿了么app
3 ajax.open("GET",url,true)     打开app挑外卖
4 ajax.send();                  下单
5 onreadystatechange 事件 4成功  监听外卖信息
6 status == 200 404...          开门验货
*/
/**
 * 
 * @param {*} method GET or POST
 * @param {*} url 地址
 * @param {*} data 数据
 * @param {*} cb 回调函数
 * @param {*} flag true异步
 */
function ajaxFunc(method,url,data,cb,flag){
    const xhr=null;
    if(window.XMLHttpRequest){
        xhr=new XMLHttpRequest();//2创建ajax对象
    }else{//兼容IE
        xhr=new ActiveXObject("Microsoft.XMLHttp");
    }
    method=method.toUpperCase();
    if(method=="GET"){
        xhr.open(method,url+"?"+data,flag);
        xhr.send();
    }else if(method=="POST"){
        xhr.open(method,url,flag);//3
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.send(data);//4下单
    }
    
    // xhr.responseText 返回的值
    xhr.onreadystatechange=function(e){
        if(xhr.readyState==4){
            if(xhr.status==200){
                cb(xhr.responseText);
            }
        }
    };
}






/*
xhr.readyState属性
0 == 未初始化 未调用send()
1 == 读取中 已调用send() 正在发送请求
2 == 已读取 send()执行完成 接受到响应内容
3 == 交互中 正在解析响应内容
4 == 完成 响应内容解析完成(＾－＾)V
每次变化都会触发xhr.onreadystatechange事件

xhr.responseText    字符串形式的响应数据
xhr.responseXML     XML形式的响应数据
xhr.status          服务器返回状态码 200 404
xhr.statusText      服务器返回状态文本信息 
*/


