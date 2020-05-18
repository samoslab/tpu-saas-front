<template>
  <div class="redRecode">
    <nav-bar title="红包记录"></nav-bar>

    <van-tabs v-model="active" color="#2D82FA" sticky>
      <van-tab title="我发出的">
        <div class="send_red" v-for="(item,index) in sendRedList" :key="index">
          <div class="send_red_text">
            <span>红包:</span>
            <span class="g">{{item.amount}}个{{item.token}}</span>
          </div>

          <!-- <div class="send_red_text">
            <span>红包口令:</span>
            <span class="g">{{item.secret}}</span>
          </div>-->

          <!-- <div class="send_red_text">
            <span>领取情况:</span>
            <span class="g">{{item.opened_num}}/{{item.num}}</span>
          </div>-->

          <div class="send_red_text">
            <span>时间:</span>
            <span class="g">{{item.created_at}}</span>
          </div>
        </div>
      </van-tab>

      <van-tab title="我收到的">
        <div class="send_red" v-for="(item,index) in receiveRedList" :key="index">
          <div class="send_red_text">
            <span>红包:</span>
            <span class="g">{{item.amount}}个{{item.token}}</span>
          </div>

          <!-- <div class="send_red_text">
            <span>红包来源:</span>
            <span class="g">{{item.username}}</span>
          </div>-->

          <div class="send_red_text">
            <span>时间:</span>
            <span class="g">{{item.created_at}}</span>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script src="./redRecode.js">
</script>

<style lang="less" src="./redRecode.less" scoped>
</style>