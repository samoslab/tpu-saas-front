<template>
    <div class="transferH">
        <nav-bar
            title="转账到对方账户"
            >
        </nav-bar>

        <!-- 对方信息 -->
        <div class="him_info">
            <!-- 头像 -->
            <img 
                src="https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3743111107,1940472030&fm=111&gp=0.jpg" 
                class="avatar"
                >
            <!-- 用户名 -->
            <div class="user_name">
                对方的用户名
            </div>
            <!-- 手机号 -->
            <div class="tel">
                188****9988
            </div>
        </div>

        <!-- 转账金额 -->
        <div class="transfer_num">
            <div class="title">
                转账金额
            </div>
            <div class="num">
                <van-cell-group>
                    <van-field v-model="num" />
                </van-cell-group>
                samo
            </div>
            <div class="remarks">
                <van-cell-group>
                    <van-field v-model="remarks" placeholder="添加备注" />
                </van-cell-group>
            </div>
        </div>


        <y-button
            @click="transferMoney"
            blue>
            <template v-slot:content>
                确认转账
            </template>
        </y-button>

        
    </div>
</template>

<script src="./transferH.js">
</script>

<style lang="less" src="./transferH.less" scoped>
    
</style>