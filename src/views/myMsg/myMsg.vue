<template>
    <div class="myMsg">
        <nav-bar
            title="我的消息">
        </nav-bar>

        <div class="lists">

            <van-list v-model="loading" 
            :finished="finished" 
            finished-text="没有更多了"
            @load="onLoad">

                <van-collapse v-model="str" accordion>
                    <van-cell v-for="item in list" :key="item.create_at">
                        <van-collapse-item :name="item.create_at">

                            <div slot="title" class="deliteInfo">
                                <div class="images">
                                    <img :src="item.avatar" alt>
                                </div>
                                <div class="conten">
                                    <p>{{item.username}}</p>
                                    <p>{{item.create_at}}</p>
                                </div>
                            </div>

                            {{item.msg}}

                        </van-collapse-item>
                    </van-cell>
                </van-collapse>

            </van-list>


        </div>

    </div>
</template>

<script src="./myMsg.js">
</script>

<style lang="less" src="./myMsg.less" scoped>
    
</style>