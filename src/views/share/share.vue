<template>
  <div class="wrap" id="captureId">
    <div class="get">
      <nav-bar title transparent />

      <div class="whiteBoxWrap" v-show="firstFlag">
        <div class="whiteBox">
          <div class="photoBox">
            <div class="photo">
              <img class="photoImg" :src="avatar" alt="photo" />
            </div>
          </div>

          <div class="sendName">来自{{sendName}}的红包</div>
          <div class="sendNum">总额 {{amount}} {{sendToken}}</div>
          <div class="codeBox">
            <!-- <img src="" alt="" /> -->
            <div id="qrcode" ref="qrcode"></div>
          </div>
        </div>

        <!-- <div class="longBtn" v-if="!s" @click="openHb">拆红包</div> -->
        <y-button @click="toOpenHB">
          <template v-slot:content>拆红包</template>
        </y-button>

        <!-- <div class="longBtn" @click="sendShape">发送给朋友</div> -->
        <y-button @click="sendShape">
          <template v-slot:content>发送给朋友</template>
        </y-button>
        <!-- <div class="longBtn" @click="toImg">保存成分享图</div> -->
        <y-button @click="toImg">
          <template v-slot:content>保存成分享图</template>
        </y-button>
      </div>

      <!-- 生成的保存图 -->
      <van-popup v-model="shareImgShow">
        <img class="share_img" :src="dataURL" alt v-show="firstFlag" />
        <span>长按上面的图 保存到本地</span>
      </van-popup>
      <!-- <div class="share_wrap">
                <img 
                class="share_img"
                :src="dataURL" alt 
                v-show="firstFlag"
                >
                <span>
                    长按上面的图 保存到本地
                </span>
      </div>-->
    </div>

    <!-- <foot></foot> -->
  </div>
</template>

<script src="./share.js">
</script>

<style lang="less" src="./share.less" scoped>
</style>
