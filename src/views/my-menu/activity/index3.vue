<template>
   <div class="c-content">
        <van-nav-bar 
        @click-left="onClickLeft"
        :left-arrow="true"
        title="活动屋"
        class="c-nav-bar">
        </van-nav-bar>
        <div class='recharge-withdrawal-record'>
            <van-tabs v-model="active">
                <van-tab title="过往活动">
                    <ActivityList></ActivityList>
                </van-tab>
                <van-tab title="最新活动">
                </van-tab>
            </van-tabs>
        </div>
   </div>
</template>

<script>

import ActivityList from '../Record/ActivityList';

export default {
    name: '',
    components:{ ActivityList  },
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

