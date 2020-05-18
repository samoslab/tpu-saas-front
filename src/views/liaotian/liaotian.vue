<template>
  <div class="liaotian">
    <nav-bar title="红包大厅"></nav-bar>

    <!-- 聊天区域 -->
    <div class="content_wrap" @click="cancelAdd">
      <!-- 包裹这层 为了滚动 -->
      <div class="content_scroll">
        <!-- 每条聊天内容 + 头像 -->
        <template v-for="(item,index) in liaotianData">
          <!-- 公共模块 时间 公告 等 -->
          <div :key="index" v-if="item.type==='public'" class="public item">
            <span>{{item.msg}}</span>
          </div>

          <!-- 文本聊天 开始 .................................... -->
          <div :key="index" v-if="item.type==='text'" class="item" :class="item.isme?'me':''">
            <!-- 头像 -->
            <img :src="item.avatar" class="avatar" />
            <!-- 用户名 + 聊天内容 -->
            <div class="item_info">
              <div class="user_name">{{item.username}}</div>
              <div class="msg">{{item.msg}}</div>
            </div>
          </div>
          <!-- 文本聊天 结束 ```````````````````````````````````` -->

          <!-- 图片聊天 开始 .................................... -->
          <div :key="index" v-if="item.type==='img'" class="item" :class="item.isme?'me':''">
            <!-- 头像 -->
            <img :src="item.avatar" class="avatar" />
            <!-- 用户名 + 聊天内容 -->
            <div class="item_info">
              <div class="user_name">{{item.username}}</div>
              <img :src="item.imgSrc" class="img_msg" @load="imgLoaded" />
            </div>
          </div>
          <!-- 图片聊天 结束 ```````````````````````````````````` -->

          <!-- 转账 开始 .................................... -->
          <div :key="index" v-if="item.type==='zhuanzhang'" class="item" :class="item.isme?'me':''">
            <!-- 头像 -->
            <img :src="item.avatar" class="avatar" />

            <!-- 用户名 + 聊天内容 -->
            <div class="item_info">
              <div class="user_name">{{item.username}}</div>

              <router-link to="/test">
                <div class="transfer">
                  <div class="y">
                    <i class="iconfont icon-fukuan"></i>
                    <div class="y_info">
                      <span>转账</span>
                      <span>10.00元</span>
                    </div>
                  </div>
                  <div class="w">转账</div>
                </div>
              </router-link>
            </div>
          </div>
          <!-- 转账 结束 ```````````````````````````````````` -->

          <!-- 红包 开始 .................................... -->
          <div :key="index" v-if="item.type==='hongbao'" class="item" :class="item.isme?'me':''">
            <!-- 头像 -->
            <img :src="item.avatar" class="avatar" />
            <!-- 用户名 + 聊天内容 -->
            <div class="item_info">
              <div class="user_name">{{item.username}}</div>

              <router-link :to="{ path: '/caihongbao', query: { rid: item.rid ,app:'tpu'}}">
                <div class="hongbao">
                  <div class="y">
                    <i class="iconfont icon-hongbao"></i>
                    <div class="y_info">
                      <span>
                        {{item.token}}
                        红包
                      </span>
                      <span>已抢: {{item.opened}}/{{item.num}}</span>
                    </div>
                  </div>
                  <div class="w">{{item.wishing}}</div>
                </div>
              </router-link>
            </div>
          </div>
          <!-- 红包 结束 ```````````````````````````````````` -->
        </template>
      </div>
    </div>

    <!-- 文字编辑区  加号 发送 -->
    <div class="edit_por" :style="{
                height:editPorHeight+'rem',
            }">
      <div class="edit">
        <!-- <div class="edit_content">
          <van-field v-model="editMsg" />
          <van-icon name="add-o" @click="add" />
          <i class="iconfont icon-fasong" @click="sendMsg"></i>
        </div>-->

        <!-- 点击加号之后 展开的 发图区域 -->
        <div class="add" v-show="addVisible">
          <!-- 照片 -->
          <!-- <div class="item">
            <van-uploader :after-read="afterRead">
              <van-icon name="photo-o" />
            </van-uploader>
            <span>照片</span>
          </div>-->

          <!-- 转账 -->
          <!-- <div class="item">
            <router-link class="transfer" to="/transferH">
              <van-icon name="refund-o" />
            </router-link>
            <span>转账</span>
          </div>-->

          <!-- 转账 -->
          <div class="item">
            <router-link class="transfer" to="/fahongbao">
              <i class="iconfont icon-hongbao"></i>
            </router-link>
            <span>发包</span>
          </div>

          <div class="item">
            <router-link class="transfer" to="/coffer">
              <i class="iconfont icon-qiandai"></i>
            </router-link>
            <span>资产</span>
          </div>

          <div class="item">
            <router-link class="transfer" to="/explain">
              <i class="iconfont icon-shu"></i>
            </router-link>
            <span>玩法</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 悬浮在右上角的 两个导航 -->
    <manual />
  </div>
</template>

<script src="./liaotian.js">
</script>

<style lang="less" src="./liaotian.less" scoped>
</style>