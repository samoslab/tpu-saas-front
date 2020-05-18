<template>
    <div class="myWrap">
        <div class="header">
            <div class="photoBox">
                <img @click="preview" v-bind:src="avatar" alt="photo">
            </div>
            <div class="name">{{username}}</div>
        </div>
        <!-- <router-link to="my-achievement">
      <div class="item">
        <van-icon name="bookmark" />
        <span class="spans">我的成就</span>
        <van-icon name="arrow" />
      </div>
        </router-link>-->
        <router-link to="my-recharge">
            <div class="item">
                <van-icon name="card"/>
                <span class="spans">我的资产</span>
                <van-icon name="arrow"/>
                <!-- <div>10.35元</div> -->
            </div>
        </router-link>
        <!-- <router-link to="my-cash">
      <div class="item">
        <van-icon name="column" />
        <span class="spans">提现地址</span>
        <van-icon name="arrow" />
      </div>
        </router-link>-->
        <router-link to="my-redpacket">
            <div class="item">
                <van-icon name="balance-list"/>
                <span class="spans">红包记录</span>
                <van-icon name="arrow"/>
            </div>
        </router-link>
        <router-link to="my-rechargeWithdrawal">
            <div class="item">
                <van-icon name="descending"/>
                <span class="spans">充提记录</span>
                <van-icon name="arrow"/>
            </div>
        </router-link>
        <router-link to="my-userSet">
            <div class="item">
                <van-icon name="setting"/>
                <span class="spans">用户设置</span>
                <van-icon name="arrow"/>
            </div>
        </router-link>

        <router-link to="message-record">
            <div class="item">
                <van-icon name="label-o"/>
                <span class="spans">我的消息</span>
                <van-icon name="arrow"/>
            </div>
        </router-link>

        <router-link to="my-feedback">
            <div class="item">
                <van-icon name="service"/>
                <span class="spans">我要反馈</span>
                <van-icon name="arrow"/>
            </div>
        </router-link>
        <div class="item" @click="logout">
            <van-icon name="stop"/>
            <span class="spans">退出登录</span>
            <van-icon name="arrow"/>
        </div>
        <van-image-preview
            v-model="show"
            :images="[avatar]"
            :show-index="false"
            @click="show = false"
        ></van-image-preview>

        <foot></foot>

        <go-home></go-home>
    </div>
</template>

<script src="./my.js">
</script>
<style lang="less" src="./my.less" scoped>
</style>
