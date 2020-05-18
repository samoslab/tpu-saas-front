<template>
   <div class="c-content">
        <van-nav-bar 
        @click-left="onClickLeft"
        :left-arrow="true"
        title="红包记录"
        class="c-nav-bar">
        </van-nav-bar>
        <div class='recordss'>
            <van-tabs v-model="active">
                <van-tab title="我发出的">
                    <TopUp></TopUp>
                </van-tab>
                <van-tab title="我收到的">
                    <Extract></Extract>
                </van-tab>
            </van-tabs>
        </div>
   </div>
</template>

<script>

import TopUp from './money/putmoney';
import Extract from './money/getmoney'

export default {
    name: '',
    components:{ TopUp , Extract },
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
.recordss{
    .van-tabs__wrap{
        width: 100%;
        position: fixed !important;
        top: 46px;
    }
}

.recharge-withdrawal-record{
    .van-tabs__wrap{
        width: 100%;
        position: fixed !important;
        top: 46px;
    }
}
</style>

