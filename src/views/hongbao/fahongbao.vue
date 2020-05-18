<template>
  <div class="wrap">
    <nav-bar title="发送红包"></nav-bar>

    <div class="whiteBoxWrap">
      <div class="whiteBox send">
        <div class="photoBox">
          <div class="photo">
            <img class="photoImg" :src="avatar" alt="photo" />
          </div>
        </div>

        <div class="formBox">
          <div class="form-item">
            <div class="form-item-line1">
              <div class="left">需要口令</div>
              <p class="right_radio">
                <van-radio-group class="charge_" v-model="auth">
                  <van-radio name="1" class="charge_z">需要</van-radio>
                  <van-radio name="0" class="charge_z">不需要</van-radio>
                </van-radio-group>
              </p>
            </div>
          </div>

          <div v-if="auth == 1">
            <div class="form-item">
              <div class="form-item-line1">
                <div class="left">设置口令</div>
                <input class="right" v-model="kouLing" type="text" ref="ipt" placeholder="请输入红包口令" />
              </div>
              <!-- <div class="form-item-line2">
                <div>小伙伴输入正确的口令就可以领红包</div>
              </div>-->
            </div>
          </div>

          <div class="form-item">
            <div class="form-item-line1">
              <div class="left">通证类型</div>
              <div class="right selectBi" @click="showPop">
                <div class="inlineBlock">{{value}}</div>
                <div class="sanjiao"></div>
              </div>
            </div>
          </div>
          <div class="form-item">
            <div class="form-item-line1">
              <div class="left">红包金额</div>
              <input v-model="amount" type="number" ref="iptsum" placeholder="请输入" />
            </div>
          </div>
          <div class="form-item">
            <div class="form-item-line1">
              <div class="left">红包个数</div>
              <input v-model="num" type="number" min="1" placeholder="请输入" />
            </div>
          </div>
          <div class="form-item">
            <div class="form-item-line1">
              <div class="left">红包类型</div>
              <p class="right_radio">
                <van-radio-group class="charge_" v-model="redtype">
                  <van-radio key="1" class="charge_z" name="1">随机</van-radio>
                  <van-radio key="2" class="charge_z" name="2">平分</van-radio>
                </van-radio-group>
              </p>
            </div>
          </div>

          <div class="form-item" style>
            <div class="form-item-line1">
              <div class="left">封面祝福语</div>
              <input class="right" v-model="wishing" type="text" placeholder="请输入" />
            </div>
          </div>

          <div v-if="showmore" class="more" @click="showMore">更多参数</div>
          <div v-if="showmore">
            <div class="form-item" style="display:none;">
              <div class="form-item-line1">
                <div class="left">服务费</div>
                <p class="right_radio">
                  <van-radio-group class="charge_" v-model="feetoken">
                    <van-radio
                      v-for="item in feetokensetToken"
                      :key="item"
                      class="charge_z"
                      :name="item"
                    >{{item}}</van-radio>
                  </van-radio-group>
                </p>
              </div>
            </div>
            <div class="form-item" style="display:none;">
              <div class="form-item-line1">
                <div class="left">是否公开</div>
                <p class="right_radio">
                  <van-radio-group class="charge_" v-model="ispublic">
                    <van-radio key="public" class="charge_z" name="1">公开</van-radio>
                    <van-radio key="private" class="charge_z" name="0">私密</van-radio>
                  </van-radio-group>
                </p>
              </div>
            </div>
          </div>

          <div v-if="showmore" class="more" @click="showMore" style="display:none;">收起更多</div>
          <!-- <div class="banner">
            <img src="@/assets/imgs/banner.jpg" alt="banner" />
          </div>-->
        </div>
      </div>

      <!-- <div class="tip" v-if="tipShow">
        您的余额已不足，建议
        <router-link to="my">充值</router-link>
      </div>-->
      <div class="pay" style>
        余额：{{currentTokenBalance}}个{{currentToken}}
        <span class="tip" v-if="tipShow">
          ,不足支付红包金额,去
          <router-link to="coffer">充值</router-link>
        </span>
      </div>

      <!-- <div class="pay" style>需支付{{paymoney}}个{{feetoken}}服务费</div> -->
      <div class="btn" @click="showPassword">生成红包</div>
      <div class="sendBtm" style="display:none;">
        <span>
          <router-link to="my-redpacket">我的记录</router-link>
        </span>
        <span>|</span>
        <span>联系客服</span>
      </div>
      <div class="titleInfo">{{info}}</div>
    </div>

    <van-popup v-model="show" position="bottom" :overlay="true">
      <van-picker show-toolbar :columns="columns" @cancel="onCancel" @confirm="onConfirm" />
    </van-popup>

    <van-dialog v-model="popupShow" show-cancel-button title="请输入交易密码" :beforeClose="beforeClose">
      <van-field
        class="psdInput"
        v-model="psd"
        type="password"
        placeholder="请输入交易密码"
        autofocus="autofocus"
      />
    </van-dialog>

    <van-dialog v-model="popupShowTip" show-cancel-button title="提示">
      <!-- <van-field
          class="psdInput"
          v-model="psd"
          placeholder="请输入密码"
      />-->
      <p class="popuptip">
        余额不足，请&nbsp;
        <router-link to="my">充值</router-link>
      </p>
    </van-dialog>

    <!-- 发红包 红包广场 发现 我 -->
    <!-- <foot></foot> -->

    <!-- 我写的 返回 我的首页 -->
    <!-- <go-home></go-home> -->
  </div>
</template>

<script src="./fahongbao.js">
</script>
<style lang="less" src="./fahongbao.less" scoped>
</style>
