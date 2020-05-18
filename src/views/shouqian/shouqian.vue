<template>
    <div class="shouqian">
        <nav-bar
        title="收钱"
        />

        <!-- 云钱包 本地钱包 -->
        <div class="pay">
            <van-tabs v-model="active" color="#2D82FA">

                <van-tab title="云钱包">

                </van-tab>

                <van-tab title="本地钱包">

                    <!-- 复制地址 -->
                    <div class="balance">

                        <div class="balance_left">
                            {{walletAddress}}
                        </div>

                        <div 
                            class="copy_wallet"
                            v-clipboard:copy="walletAddress"
                            @click="$toast('已复制到剪切板')">
                            复制地址
                        </div>

                    </div>

                    <!-- 中间的二维码 币种  收款记录 等 -->
                    <div class="content">
                        
                        <!-- 中间二维码 -->
                        <div class="qr">
                            <div class="qr_title">
                                {{userName}}
                            </div>
                            <div class="qr_img">
                                <!-- 后端返回 用户的 收款二维码 -->
                                <i class="iconfont icon-erweima"></i>
                            </div>
                        </div>


                        


                        <!-- 币种 -->
                        <div class="item">
                            <div class="item_title">
                                币种
                            </div>
                            <van-dropdown-menu>
                                <van-dropdown-item v-model="payValue" :options="payType" />
                            </van-dropdown-menu>
                        </div>

                        <!-- 收款记录 -->
                        <div class="record">
                            收款记录
                        </div>
                        
                    </div>

                    
                </van-tab>

            </van-tabs>
        </div>

        

    </div>
</template>

<script src="./shouqian.js">
</script>

<style lang="less" src="./shouqian.less" scoped>
    
</style>