<template>
  <div class="fuqian">
    <nav-bar title="付钱" />

    <!-- 云支付 本地支付 -->
    <div class="pay">
      <van-tabs v-model="active" color="#2D82FA">
        <van-tab title="云支付">
          <!-- 账户余额 -->
          <div class="balance">
            <div class="balance_left">
              <i class="iconfont icon-fukuan"></i>
              <span>账户余额</span>
            </div>

            <div class="balance_num">{{currentBalance}}{{currentToken}}</div>
          </div>

          <!-- 转出地址 数量 支付类型 button 等内容 -->
          <div class="content">
            <!-- 转出地址 -->
            <div class="address item">
              <div class="address_title item_title">
                <span>转出地址</span>
                <div class="address_title_book">
                  <i class="iconfont icon-qingdan"></i>
                  地址簿
                </div>
              </div>
              <van-field v-model="address" placeholder="单行输入" />
            </div>

            <!-- 数量 -->
            <div class="item">
              <div class="item_title">数量</div>
              <van-field v-model="num" placeholder="输入金额" />
            </div>

            <!-- 支付类型 -->
            <div class="item">
              <div class="item_title">支付类型</div>
              <van-dropdown-menu>
                <van-dropdown-item v-model="payValue" :options="payType" />
              </van-dropdown-menu>
            </div>
          </div>

          <!-- 蓝色支付 按钮 -->
          <y-button blue @click="pay">
            <template v-slot:content>支付</template>
          </y-button>
        </van-tab>

        <van-tab title="本地支付">
          <div class="localpay">整合中</div>
        </van-tab>
      </van-tabs>
    </div>

    <!-- 支付 弹出层 -->
    <van-popup v-model="payPopup" position="bottom" @closed="payPopupCancel">
      <!-- 标题 -->
      <van-nav-bar :title="popupTitle" right-text="取消" @click-right="payPopupCancel" />
      <!-- 内容 -->
      <div class="content">
        <span class="type">{{payValue}}</span>
        <span class="num">{{num}}</span>
      </div>

      <!-- 输入密码框 -->
      <div class="content">
        <van-field type="password" v-show="keyShow" v-model="key" placeholder="请输入密码" />
      </div>

      <!-- 下一步按钮 -->
      <y-button blue @click="nextCommit">
        <template v-slot:content>下一步</template>
      </y-button>
    </van-popup>
  </div>
</template>

<script src="./fuqian.js">
</script>

<style lang="less" src="./fuqian.less" scoped>
</style>