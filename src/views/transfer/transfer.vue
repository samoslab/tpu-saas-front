<template>
    <div class="transfer">
        <nav-bar 
            title="转账"
            :left="false">
        </nav-bar>

        <!-- 搜索框 -->
        <van-search
            v-model="searchValue"
            shape="round"
            background="#eee"
            placeholder="搜索"
            input-align="center"
            />
        
        <!-- 转账给 朋友 账户 银行卡 -->
        <div class="content">
            
            <router-link
                to="/test">
                <div class="router_text">
                    <i class="iconfont icon-tongxunlu"></i>
                    <span>转账给我的朋友</span>
                </div>
                <span class="time">
                    {{transferTime}}
                </span>
            </router-link>

            <router-link
                to="/test">
                <div class="router_text">
                    <i class="iconfont icon-fukuan"></i>
                    <span>转到账户</span>
                </div>
                <span class="time">
                    {{transferTime}}
                </span>
            </router-link>

            <router-link
                to="/test">
                <div class="router_text">
                    <i class="iconfont icon-yinhangka"></i>
                    <span>转到银行卡</span>
                </div>
                <span class="time">
                    {{transferTime}}
                </span>
            </router-link>

        </div>


        <!-- 最近 -->
        <div class="recently">
            <div class="recently_title">
                最近
            </div>
            <router-link
                to="/test">
                <div class="router_text">
                    <!-- 头像 -->
                    <img src="~assets/logo.png">
                    <!-- 用户信息 -->
                    <div class="user_info">
                        <div class="user_name">
                            用户名
                        </div>
                        <div class="user_tel">
                            188****9988
                        </div>
                    </div>
                </div>
            </router-link>

            <router-link
                to="/test">
                <div class="router_text">
                    <!-- 头像 -->
                    <img src="~assets/logo.png">
                    <!-- 用户信息 -->
                    <div class="user_info">
                        <div class="user_name">
                            用户名
                        </div>
                        <div class="user_tel">
                            188****9988
                        </div>
                    </div>
                </div>
            </router-link>
            
        </div>
        



        <tab-bar></tab-bar>
    </div>
</template>

<script src="./transfer.js">
</script>

<style lang="less" src="./transfer.less" scoped>
    
</style>