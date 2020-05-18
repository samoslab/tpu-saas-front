<template>
    <div class="bindSite c-content">
        <van-nav-bar 
        @click-left="onClickLeft"
        :left-arrow="true"
        title="活动详情"
        class="c-nav-bar">
        </van-nav-bar>

      
        <div class='bindSite_cen'>

            <div class='Audit'>
               <div class='Audit_cen'>
                    <div>
                       <div class="photo">
                            <img class="photoImg" :src="icon" alt="photo" />
                      </div> 
                    </div>

                    <div>
                        <p>通证：</p>
                        <span>{{token}}</span>
                    </div>
                    <div>
                        <p>标题：</p>
                        <span>{{title}}</span>
                    </div>
                      <div>
                        <p>时间：</p>
                        <span>{{create_at}}</span>
                    </div>
                
                    <div>
                        <p>规则：</p>
                        <span></span>
                        
                    </div>
                    <div>
                    <p>&nbsp;</p>{{rule}}

                     </div>
            

                  
                </div>
                   

            </div>

        </div>


         <!-- <van-button class='btn-left'  @click="follow" size="large">关注</van-button> -->
         <van-button class='btn-right'  @click="join" size="large">领通证</van-button>

  
</div>
                

  

</template>

<script>
import foot from "@/components/foot.vue";


export default {
  name: "send",
  components: {
    foot
  },
  data(){
    return {
      title:'',
      token:"",//
      join_num: '', //
      summary: '',
      rule: '',
      icon:"",//
      id:'',
      create_at:''
     
    }
  },
  methods:{
  
    onClickLeft(){
        this.$router.go(-1);
    },
    //服务费
    getActivity(){
       this.$post2("activity/Pub/event",{id:this.$route.query.id}).then(res => {
        console.log(res)
        this.icon = res.icon
        this.id = res.id
        this.title = res.title
        this.rule = res.rule
        this.join_num = res.join_num
        this.token = res.token
        this.summary = res.summary
        this.create_at = res.create_at

        
       
      });
    },

    follow() {

    },
  
    unfollow() {

    },
    join() {
          this.$post2("activity/index/join",{
        id:this.id,
      }).then(res => {
          console.log(res);
            this.$toast(res.msg);
         });
    }
    
  },
  mounted() {
  

    this.avatar = global.userInfo.avatar != '' ? /*'http://s.yqkkn.com/'+*/global.userInfo.avatar : global.defConfig.avatar;
    // this.auth = 0;
    this.getActivity();
  },
  created(){
   
  },
  watch: {
    //监听红包钱数
  
  },
};
</script>

<style scoped lang='less'>
 .btn{
    width:40%;
    height:0.9rem;
    line-height: 0.9rem;
    background:linear-gradient(45deg,rgba(210,29,46,1) 0%,rgba(231,60,50,1) 100%);
    opacity:0.9;
    border-radius:0.2rem;
    font-size:0.3rem;
    color:#fff;
    margin: 0 auto;
    text-align: center;
    float:left;
  }

.Audit{
    width: 100%;
    height: 100%;
    background: #f8f8f8;
    padding-top: 15px;
    .Audit_cen{
        // width: 100%;
        // height: 180px;
        border-bottom: 1px solid #ccc;
        margin-bottom: 10px;
        padding: 10px 10px;
        font-size: 16px;
        background: white;
        >div{
            display: flex;
            margin-bottom: 5px;
            >p{
                width: 100px;
                text-align: right;
            }
            >span{
                flex: 1;
                // overflow:hidden;
                // text-overflow:ellipsis;
                white-space:nowrap;
            }
        }
    }
}

.bindSite{
    font-size: 18px;
    width: 100%;
    height: 100%;
    .bindSite_cen{
        width: 100%;
        // height: 100%;
    }
    .btn-left{
          width:40%;
    height:0.9rem;
    line-height: 0.9rem;
        background: #00C0ED;
    opacity:0.9;
    border-radius:0.2rem;
    font-size:0.3rem;
    color:#fff;
    margin: 0 auto;
    text-align: center;
    float:left;

     

    }
     .btn-right{
        border: none;
        background: #00C0ED;
        color: white;
        position: absolute;
        bottom: 0;
     }
    .sign{
        margin-top: 10px;
        font-size: 14px;
        text-align: center;
        color: green;
    }
}
.c-nav-bar{
    span ,i{
        font-size: 24px !important;
    }
}
.ptitle{
    color:#999;
    text-align: center;
    line-height: 1rem;
    font-size: 0.25rem;
}

</style>
