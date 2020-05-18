import foot from "@/components/foot.vue";
import { logout } from "@/router/index.js";
export default {
    name: "my",
    components: {
        foot
    },
    data() {
        return {
            images: ["http://s.yqkkn.com/tpu.png"],
            show: false,
            username: "",
            userInfo: "",
            avatar: ""
        };
    },
    methods: {
        preview() {
            this.show = true;
        },
        logout() {
            this.$post2("user/api/passport/logout", {}).then(res => {
                logout();
            });
        }
    },
    //window.localStorage
    created() {
        // console.log('window.localStorage++++' + localStorage.userInfo)
        this.userInfo = JSON.parse(localStorage.userInfo);
        // console.log(this.userInfo)
        this.username = localStorage.phone;//username;
        //http://s.yqkkn.com/samo.png
        //this.userInfo.avatar
        this.avatar =
            this.userInfo.avatar != ""
                ? /*'http://s.yqkkn.com/'+*/ this.userInfo.avatar
                : global.defConfig.avatar;
        // this.avatar = 'http://s.yqkkn.com/samo.png'
        // this.userInfo.map(item =>{return {'name':item.username}})
    }
};
