<template>
  <div class="coffer">
    <nav-bar title="我的资产"></nav-bar>

    <!-- 云端/本地 切换 -->
    <van-tabs v-model="active" color="#2D82FA">
      <van-tab title="云端资产">
        <div class="card_wrap">
          <!-- 蓝色卡牌 总资产 -->
          <div class="card">
            <!-- <div>总资产</div>
            <div class="balance">
              <p v-show="balanceShow">￥{{(money*1+frozen*1).toFixed(3)}}</p>
              <p v-show="!balanceShow">***,***</p>
              <van-icon name="eye-o" @click="hideBalance" v-show="balanceShow" />
              <van-icon name="closed-eye" @click="hideBalance" v-show="!balanceShow" />
            </div>-->
            <div class="total">资产总额:￥{{(money*1+frozen*1).toFixed(3)}}</div>

            <div class>可用资产:￥{{money}}</div>
            <div class>冻结资产:￥{{frozen}}</div>
          </div>
        </div>

        <!-- 各种 货币 的列表 -->
        <div class="money_wrap">
          <div class="money" v-for="(item,index) in tokenSet" :key="index">
            <!-- 头像 -->
            <div class="avatar">
              <img :src="item.icon" />
            </div>
            <!-- 具体 余额 -->
            <div class="money_detail">
              <div class="money_detail_scale">
                <p style="font-weight: 700;">{{item.token}}</p>
                <p>1 {{item.token}} = ¥ {{item.price.cny}}</p>
              </div>

              <div class="money_detail_num">
                <p>
                  {{(item.amount*1).toFixed(3)}}
                  /{{(item.frozen*1).toFixed(3)}}
                </p>
                <p>
                  ¥ {{(item.amount *
                  item.price.cny).toFixed(3)}}
                </p>
              </div>
            </div>
            <div class="btnGroup">
              <div @click="deposit(item)">充值</div>
              <!-- <div @click="toRechage" style="display:hidden;">记录</div> -->
              <div @click="withdraw(item)">提现</div>
            </div>
          </div>
        </div>
      </van-tab>

      <van-tab title="本地资产">
        <div class="local_card_wrap">
          <!-- 蓝色卡牌 总资产 -->
          <div class="card">
            <!-- <div>总资产</div>
            <div class="balance">
              <p v-show="balanceShow">￥{{(money*1+frozen*1).toFixed(3)}}</p>
              <p v-show="!balanceShow">***,***</p>
              <van-icon name="eye-o" @click="hideBalance" v-show="balanceShow" />
              <van-icon name="closed-eye" @click="hideBalance" v-show="!balanceShow" />
            </div>-->
            <div class="total">功能整合中</div>

            <!-- <div class>可用资产:整合中</div>
            <div class>冻结资产:整合中</div>-->
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script src="./coffer.js">
</script>

<style lang="less" src="./coffer.less" scoped>
</style>