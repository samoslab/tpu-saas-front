<template>
   <div class="c-content">
        <van-nav-bar 
        @click-left="onClickLeft"
        :left-arrow="true"
        title="充提记录"
        class="c-nav-bar">
        </van-nav-bar>
        <div class='recharge-withdrawal-record'>
            <van-tabs v-model="active">
                <van-tab title="充值记录">
                    <Deposit></Deposit>
                </van-tab>
                <van-tab title="提现记录">
                    <Withdraw></Withdraw>
                </van-tab>
            </van-tabs>
        </div>
   </div>
</template>

<script>

import Deposit from './Record/Deposit';
import Withdraw from './Record/Withdraw'

export default {
    name: '',
    components:{ Deposit , Withdraw },
    data() {
        return {
            active: 0
        }
    },
    methods:{
        onClickLeft(){
            this.$router.go(-1);
        }
    }
}
</script>

<style scoped lang='less'>
.record{
    width: 100%;
    height: 100%;
}
.c-nav-bar{
     width: 100%;
        position: fixed !important;
        height: 46px;
        // top: 46px;
}
</style>

<style lang='less'>
.recharge-withdrawal-record{
    .van-tabs__wrap{
        width: 100%;
        position: fixed !important;
        top: 46px;
    }
}
</style>

