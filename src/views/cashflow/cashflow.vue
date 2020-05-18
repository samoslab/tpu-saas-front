<template>
  <div class="cashflow">
    <nav-bar title="充提记录"></nav-bar>

    <van-tabs v-model="active" color="#2D82FA" sticky>
      <van-tab title="充值记录">
        <div class="cash" v-for="(item,index) in rechargeList" :key="index">
          <div class="cash_text">
            <span>序号:</span>
            <span class="g">{{item.id}}</span>
          </div>

          <div class="cash_text">
            <span>通证:</span>
            <span class="g">{{item.token}}</span>
          </div>

          <div class="cash_text">
            <span>数量:</span>
            <span class="g">{{item.amount}}</span>
          </div>

          <div class="cash_text">
            <span>时间:</span>
            <span class="g">{{item.created_at}}</span>
          </div>
        </div>
      </van-tab>

      <van-tab title="提现记录">
        <div class="cash" v-for="(item,index) in cashOutList" :key="index">
          <div class="cash_text">
            <span>序号:</span>
            <span class="g">{{item.id}}</span>
          </div>

          <div class="cash_text">
            <span>通证:</span>
            <span class="g">{{item.token}}</span>
          </div>

          <div class="cash_text">
            <span>数量:</span>
            <span class="g">{{item.amount}}</span>
          </div>

          <div class="cash_text">
            <span>时间:</span>
            <span class="g">{{item.created_at}}</span>
          </div>

          <div class="cash_text">
            <span>状态:</span>
            <span class="g">{{item.status}}</span>
          </div>

          <div class="cash_text" v-if="item.txhash">
            <p class="g" @click="hashTx(item.token,item.txhash)" title="点击查看">
              <span>HASH</span>
              :{{item.txhash.substring(0,28)}}...
            </p>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script src="./cashflow.js">
</script>

<style lang="less" src="./cashflow.less" scoped>
</style>