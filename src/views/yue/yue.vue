<template>
    <div class="yue">
        <nav-bar
            title=" "
            >
            <template v-slot:you>
                <router-link to="/test">
                    明细
                </router-link>
            </template>
        </nav-bar>

        <!-- 账户余额 -->
        <div class="balance">
            <div class="balance_title">
                账户余额(元)
            </div>
            <div class="balance_num">
                10.00
            </div>
        </div>

        <van-cell title="充值" is-link to="/test" />
        <van-cell title="提现" is-link to="/test" />
        <van-cell title="集分宝" is-link to="/test" />

        

    </div>
</template>

<script src="./yue.js">
</script>

<style lang="less" src="./yue.less" scoped>
    
</style>