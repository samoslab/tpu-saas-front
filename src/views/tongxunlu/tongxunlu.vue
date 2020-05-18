<template>
    <div class="tongxunlu">
        <nav-bar
            :left="false"
            title="通讯录">
            <template v-slot:you>
                <i class="iconfont icon-tianjiahaoyou"></i>
            </template>
        </nav-bar>

        <!-- 新的朋友 群聊 AMA活动 生活区 -->
        <div class="nav">

            <van-cell to="/test">
                <template slot="title">
                    <i class="iconfont icon-tianjiahaoyou r"></i>
                    <span class="custom-title">新的朋友</span>
                </template>
            </van-cell>

            <van-cell to="/test">
                <template slot="title">
                    <i class="iconfont icon-tongxunlu b"></i>
                    <span class="custom-title">群聊</span>
                </template>
            </van-cell>

            <van-cell to="/test">
                <template slot="title">
                    <i class="iconfont icon-fenlei g"></i>
                    <span class="custom-title">AMA活动</span>
                </template>
            </van-cell>

            <van-cell to="/test">
                <template slot="title">
                    <i class="iconfont icon-shoubing y"></i>
                    <span class="custom-title">生活区</span>
                </template>
            </van-cell>

        </div>

        <!-- 后端返回 通讯录 -->
        <van-index-bar :index-list="['A','B']">
            <van-index-anchor index="1">A</van-index-anchor>
            <van-cell title="A测试用户(点击进入聊天)" @click="toLiaotian" />
            <van-cell title="文本" />
            <van-cell title="文本" />

            <van-index-anchor index="2">B</van-index-anchor>
            <van-cell title="文本" />
            <van-cell title="文本" />
            <van-cell title="文本" />

            <van-index-anchor index="2">C</van-index-anchor>
            <van-cell title="文本" />
            <van-cell title="文本" />
            <van-cell title="文本" />

        </van-index-bar>



        <tab-bar></tab-bar>
    </div>
</template>

<script src="./tongxunlu.js">
</script>
<style lang="less" src="./tongxunlu.less" scoped>
</style>