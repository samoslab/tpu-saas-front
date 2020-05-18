<template>
  <div class="red">
    <div class="wrap">
      <div class="get">
        <nav-bar title transparent />
        <div class="whiteBoxWrap">
          <div class="whiteBox">
            <div class="photoBox">
              <div class="photo">
                <img class="photoImg" src="http://s.yqkkn.com/tpu.png" alt="photo" />
              </div>
            </div>

            <div class="sendName">来自{{sendName}}的红包</div>

            <!-- <div class="secret" v-if="secret">口令：{{secret}}</div> -->
            <div class="secret secret_btn" v-if="secret===''" @click="openHb">
              <button class="btnopenbigger" @click="openHb">拆红包</button>
            </div>
          </div>

          <div class="formBox">
            <div class="form-item">
              <div class="form-item-line1" v-if="secret">
                <div class="left">输入口令</div>
                <input
                  class="right"
                  style="width:50%"
                  v-model="kouLing"
                  type="text"
                  placeholder="请输入"
                />
                <button class="btnopen" @click="openHb">拆红包</button>
              </div>
            </div>

            <div class="btn-groups">
              <div>
                <router-link to="/my-cash">去提现</router-link>
              </div>
              <div>
                <router-link to="/send">发红包</router-link>
              </div>
              <div>
                <router-link :to="{ path: '/share', query: { rid: this.rid}}">转发</router-link>
                <!-- 转发 -->
                <!-- <router-link to='/share'>转发</router-link> -->
              </div>
            </div>
          </div>
        </div>

        <div class="geted">
          <div class="tittle">共{{allData.num}}个{{allData.sendToken}}红包，已被领取{{allData.opened}}个</div>
          <ul class="scrollBox">
            <li v-for="item in history" :key="item.id">
              <div class="info">{{item.username}} 抢到了{{item.num}}个</div>

              <div class="info-right">{{item.ts}}</div>
            </li>
          </ul>
        </div>
      </div>
      <!-- <foot></foot> -->
    </div>
  </div>
</template>

<script src="./red.js">
</script>

<style lang="less" src="./red.less" scoped>
</style>