const express=require("express");
const app  = express();
app.engine("html",require("express-art-template"));
// 公开资源
app.use("/",express.static("./dist"));
app.get("/",(req,res)=>{
    res.render("./dist/index.html");
})
.listen(3000,()=>{
    console.log("服务器3000端口 已开启");
});

// WebSocket连接  ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
let WebSocket = require('ws');
let server = new WebSocket.Server({
    host: 'localhost',
    port: 2333
})


server.on('connection', (client) => {     // client 一个个的 客户端们
    // console.log("一个客户端连接了过来");
    // server.clients 所有客户端 的数组
    // 服务器 收 客户端 的 消息
    client.on('message', str => {   //这里收消息 必须是 字符串
        // 收到消息了 广播出去
        server.clients.forEach(item=>{
            item.send(str);
        });
    });

    // 服务器 给 客户端 发
    // client.send("从服务器 发给 客户端的消息");
    // server.clients.forEach(item=>{  // 是会给自己发的
    //     item.send(JSON.stringify(info));
    // })


    client.on("close",()=>{ //这里没有e  打印e 会报错 并中断
    });

});



