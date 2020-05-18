<template>
    <div class="wrap">

        <nav-bar title="发现更多"></nav-bar>

        <ul class="itemArr">
            <li v-for="(item,index) in dataArr" :key="index">
                <router-link :to="{path:item.path}">
                    <!--:to="{path:item.path}"-->
                    <div class="name" :class="{ 'disable': item.disable === 1 }">{{item.name}}</div>
                    <div class="wan">
                        马上参与
                        <van-icon name="arrow"/>
                    </div>
                </router-link>
            </li>
        </ul>



        <!-- <foot></foot> -->

        <!-- <go-home></go-home> -->
    </div>
</template>

<script src="./find.js">
</script>
<style lang="less" src="./find.less" scoped>
</style>