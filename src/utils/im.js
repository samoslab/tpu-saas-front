
// document.addEventListener('deviceready', function() {
//     im.init();
// });
window.addEventListener('beforeunload', function() {
    im.uninit();
});
let im = {
    sid: null,
    lArr: [],
    init() {
        document.addEventListener('deviceready', ()=> {
            CordovaWebsocketPlugin.wsConnect({
                url: window.globalData.config.socketDomain + "?accessToken=" + window.globalData.config.accessToken,
                pingInterval: 30000,
                timeout: 10000
            },
                (recvEvent)=> {
                console.log(recvEvent);
                console.log("Received callback from WebSocket: "+recvEvent["callbackMethod"]);
                if(recvEvent["callbackMethod"] == "onMessage"){
                    this.onMessage(recvEvent.message);
                }
                if(recvEvent["callbackMethod"] == "onClose"){
                    this.onClose(recvEvent.message);
                }
                if(recvEvent["callbackMethod"] == "onFail"){
                    this.onFail(recvEvent.message);
                }
                },
                (success)=> {
                    console.log("Connected to WebSocket with id: " + success.webSocketId);
                    this.sid = success.webSocketId;
                },
                (error)=> {
                    console.log("Failed to connect to WebSocket: "+
                                "code: "+error["code"]+
                                ", reason: "+error["reason"]+
                                ", exception: "+error["exception"]);
                    this.onFail(error)            
                }
            );
        });
    },
    uninit() {
        CordovaWebsocketPlugin.wsClose(this.sid);
    },
    onMessage(msg){
        // console.log("--msg-> --- " , msg)
        let m = JSON.parse(msg)
        this.lArr.forEach(n=> {
            n.onMessage(m);
        })
    },
    onClose() {
        console.log("im socket close")
    },
    onFail(){
        console.log("im socket fail, reconnect in 15 second")
        setTimeout(()=>{
            this.init();
        }, 15000);
    },
    sendMsg(arg) {
        // console.log("==> ", arg)
        let message = {
            "action":1002,
            "body": {
                "accessToken":  window.globalData.config.accessToken,
                "data_type": arg.data_type,
                "topic_id": arg.topic_id, 
                "data": arg.data
            }
        }
        CordovaWebsocketPlugin.wsSend(this.sid, JSON.stringify(message));
    },
    addListener(o) {
        this.lArr.push(o);
    },
    removeListener(id) {
        let idx = this.lArr.findIndex(n=>n.id == id);
        if(idx > -1){
            this.lArr.splice(idx, 1);
        }
    }
}

export default im;