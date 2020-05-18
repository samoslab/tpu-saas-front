<template>
    <div class="WalletSite c-content">
        <van-nav-bar 
        @click-left="onClickLeft"
        :left-arrow="true"
        title="提现"
        class="c-nav-bar">
        </van-nav-bar>

        <div class='site'>
            <div v-for='(item,index) in arr' :key='index' >
                <p>
                    <em>
                        <img :src="item.icon" alt="">
                    </em>
                    <em>{{index}}</em>
                </p>
                <span @click='doWithdraw(item,index)'>{{item.address == '' ? '' : '提现'}}</span>

                <span @click='skipSite(item,index)'>{{item.address == '' ? '绑定地址' : '查看地址'}}</span>
            </div>
        </div>

        <!-- <Loading v-if='flag'></Loading> -->
    </div>
</template>

<script>

// import axios from 'axios';
// import Loading from '../Loading';

export default {
    name: 'WalletSite',
    // components: { Loading },
    data() {
        return {
            Title:'提现地址',
            arr:[],
            flag: true
        }
    },
    created(){
        this.getSiteName();
    },
    methods:{
        getSiteName(){
            // 'http://api.yqkkn.com/pay/index/getWithdrawAddress'
             this.$post2("pay/index/getWithdrawAddress", {

            }).then((res)=>{
                this.arr= res
            }).catch((err)=>{
                 console.log(err)
            })
            // let url = window.globalData.config.domain + '/user/getTokenList';
            // axios.post(url,{
            //     cmd:'123',
            //     body:{
            //         accessToken: localStorage.token,
            //         appid:localStorage.appid,
            //         uid:localStorage.uid
            //     }
            // }).then( (res) => {
            //     // console.log(res.data);
            //     this.flag = false;
            //     this.arr = res.data;
            // })
        },
        skipSite(item,elem){
            if( item.address === '' || item.address === null || item.address === undefined ){
                this.$router.push({path:'/cash-bindSite',query:{num:elem}})
            }else if( item !== '' ){
                let data = JSON.stringify(item)
                console.log(data)
                this.$router.push({path:'/cash-coin',query:{data:elem,obj:data}})
            }

        },
        doWithdraw(item,elem){
            this.$router.push({path:'/cash-extract',query:{ token:elem }});
        },
        onClickLeft() {
            this.$router.go(-1);
        },
    }

}
</script>

<style scoped lang='less'>
.WalletSite{
    height: 100%;
    font-size: 16px;
    background: #efeef4;
    .site{
        padding: 0 24px;    
        padding-bottom: 32px;
        background: #efeef4;
        >div{
            width: 100%;
            height: 80px;
            background: white;
            margin-top: 32px;
            border-radius: 16px;
            display: flex;
            line-height: 80px;
            color: black;
            p{
                flex:1;
                display: flex;
                margin-left: 30px;
                em{
                    display: flex;
                    align-items: center;
                    img{
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                        align-items: center;
                        margin-right: 10px;
                    }
                }
            }
            span{
                background:url('../../assets/imgs/my/arrows.png') no-repeat right;
                background-size: 24px;
                padding-right: 30px;
                margin-right: 8px;
            }
        }
    }
}
.c-nav-bar{
    span ,i{
        font-size: 24px !important;
    }
}
</style>
