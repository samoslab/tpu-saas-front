<template>
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

          <div class="sendName">
            来自
            <span class="em">{{sendName}}</span>
            的{{token}}红包
          </div>
          <div class="wishing">
            <span class="em">祝福语:{{wishing}}</span>
          </div>
          <div v-if="opened_redpkt" class="opened_tip">
            <span class="em">您获得：{{opened_amount}}个{{token}}</span>
          </div>

          <div class="wishing" v-if="secret">
            <span class="em">口令:{{secret}}</span>
          </div>

          <!-- <div class="secret" v-if="secret">口令：{{secret}}</div>
          <div class="secret" v-if="secret===''">
            <button class="btnopenbigger" @click="openHb">拆红包</button>
          </div>-->

          <div class="formBox">
            <div class="form-item">
              <!-- <div class="form-item-line1" v-if="secret">
                <div class="left">输入口令</div>
                <input
                  class="right"
                  style="width:70%"
                  v-model="kouLing"
                  type="text"
                  placeholder="请输入"
                />
              </div>-->

              <!-- <van-button round type="danger" size="normal" @click="openHb">开红包</van-button> -->
            </div>

            <div class="btn-groups">
              <!-- <div>
                <router-link to="/coffer">去提现</router-link>
              </div>-->
              <div>
                <router-link to="/fahongbao">
                  <van-button class="btnopenbigger" size="normal">发红包</van-button>
                </router-link>
              </div>

              <div v-if="opened_redpkt" class="opened_tip">
                <van-button class="btntip" size="large">您已拆红包</van-button>
              </div>
              <div v-else-if="secret==''">
                <van-button class="btnopenbigger" size="large" @click="openHongbao">拆红包</van-button>
              </div>
              <div v-else>
                <van-button class="btnopenbigger" size="large" @click="showDialog">拆红包</van-button>
              </div>

              <div>
                <router-link
                  :to="{ path: '/share', query: { rid: this.rid,app:this.app,from:this.me}}"
                >
                  <van-button class="btnopenbigger" size="normal">转红包</van-button>
                </router-link>
                <!-- 转发 -->
                <!-- <router-link to='/share'>转发</router-link> -->
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- <van-popup v-model="show" position="bottom" :overlay="true">
      <van-picker show-toolbar :columns="columns" @cancel="onCancel" @confirm="onConfirm" />
      </van-popup>-->

      <van-dialog v-model="popupShow" show-cancel-button title="请输入红包口令" :beforeClose="beforeClose">
        <van-field
          class="psdInput"
          v-model="kouLing"
          type="text"
          placeholder="请输入红包口令"
          autofocus="autofocus"
        />
      </van-dialog>

      <div class="geted">
        <div class="tittle">共{{allData.num}}个{{allData.token}}红包，已被领取{{allData.opened_num}}个</div>
        <ul class="scrollBox">
          <li v-for="item in history" :key="item.id">
            <div class="info">{{item.username}} 抢到{{item.amount}}个</div>

            <div class="info-right">{{item.created_at}}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script src="./openredpkt.js">
</script>
<style lang="less" src="./openredpkt.less" scoped>
</style>

