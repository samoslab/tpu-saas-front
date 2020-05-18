<template>
  <div class="wrap">
    <nav-bar title="邀请奖励"></nav-bar>

    <van-tabs v-model="active" color="#2D82FA" sticky>
      <van-tab title="我的邀请">
        <div>
          <van-field v-model="link" name="邀请链接" label="邀请链接" placeholder="邀请链接" />
          <van-field v-model="inviteCode" name="邀请码" label="邀请码" placeholder="邀请码" />

          <div style="margin: 16px;"></div>
        </div>

        <div class="op_container">
          <van-button
            plain
            type="info"
            class="btn1 leftBtn"
            :data-clipboard-text="link"
            @click="copy"
            size="small"
          >复制邀请地址</van-button>
          <!-- <van-button type="info" size="small"></van-button> -->

          <van-button plain type="info" class="btn2 rightBtn" @click="inviteFace" size="small">面对面邀请</van-button>

          <!-- <van-button class='btn2' size="large">保存到相册</van-button> -->
        </div>

        <div class="codeBox" id="captureId">
          <!-- <img src="" alt="" /> -->
          <h3>扫码邀请</h3>
          <div id="qrcode" ref="qrcode"></div>
        </div>

        <van-divider>我的奖励</van-divider>
        <van-field v-model="inviteNum" name="邀请人数" label="邀请人数" placeholder="邀请人数" />

        <van-field v-model="reward" name="邀请奖励" label="邀请奖励" placeholder="邀请奖励" />

        <van-divider>排行榜</van-divider>
      </van-tab>

      <van-tab title="我的奖励">
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

    <!-- 生成的保存图 -->
    <van-popup v-model="shareImgShow">
      <img class="share_img" :src="dataURL" alt v-show="firstFlag" />
    </van-popup>
  </div>
</template>

<script>
import Clipboard from "clipboard";
import QRCode from "qrcodejs2";
import html2canvas from "html2canvas";
import { Divider } from "vant";

export default {
  name: "team",
  props: ["num"],
  data() {
    return {
      active: 0, // 我发布/收到 切换
      loading: false,
      finished: false,
      LoadingFlag: true,
      sendPage: 1,
      refcode: "",
      link: "",
      firstFlag: true,
      dataURL: "",
      shareImgShow: false,
      receivePage: 1,
      inviteCode: 0,
      inviteNum: 0,
      reward: 0,
      inviteList: [],
      sendRedList: [], // 我发出的红包 数据 列表
      receiveRedList: [] // 我收到的红包 数据 列表
    };
  },
  watch: {},
  methods: {
    getInviteCode() {
      this.$post2("user/api/Index/getMyInviteCode", {})
        .then(res => {
          this.link = res.link;
          this.inviteCode = res.refcode;
          this.qrcode();
        })
        .catch(err => {
          this.showAlert(err);
        });
    },
    showAlert(msg) {
      this.$dialog.alert({
        title: "提示",
        message: msg
      });
    },
    inviteFace() {
      let c = document.getElementById("captureId");
      c.style.display = "block";
      c.style.visibility = "visible";

      html2canvas(document.querySelector("#captureId"))
        .then(canvas => {
          let imgUrl = canvas.toDataURL("image/png");
          this.dataURL = imgUrl;
          this.shareImgShow = true;
        })
        .catch(error => {
          console.log(error);
        });
    },
    qrcode() {
      let canvaswidth = this.$refs.qrcode.clientWidth * 1;
      //  let     canvaswidth = window.getComputedStyle(this.$refs.qrcode).height;

      // console.log(canvaswidth);
      let qrcode = new QRCode("qrcode", {
        width: canvaswidth, // 设置宽度，单位像素
        height: canvaswidth, // 设置高度，单位像素
        text: this.link // 设置二维码内容或跳转地址
      });
    },

    copy() {
      var clipboard = new Clipboard(".btn1");
      clipboard.on("success", e => {
        this.$dialog.alert({
          message: "复制成功"
        });
        // 释放内存
        clipboard.destroy();
      });
    }
  },
  created() {
    this.getInviteCode();
  }
};
</script>

<style lang="less" scoped>
// 我写的less
.wrap {
  // 保存出来的分享图
  .van-popup {
    border-radius: 15px;
    background: darkolivegreen;
    padding: 5px;

    width: 70%;
    display: flex;
    flex-direction: column;
    .share_img {
      width: 100%;
    }
    span {
      text-align: center;
      font-size: 0.3rem;
    }
    #qrcode {
      padding: 0.2rem;
    }
  }
}
.op_container {
  margin: 0 auto;
  text-align: center;
  // flex-direction: row;
  display: flex;
  justify-content: center; /* 水平居中 */
}
.codeBox {
  width: 2.73rem;
  height: 3rem;
  text-align: center;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(229, 229, 229, 1);
  margin: 0 auto;
  img {
    width: 90%;
  }
}

#captureId {
  visibility: hidden;
  float: left;
  margin-top: -10rem;
}
.leftBtn {
  width: 35%;
  margin-left: 10px;
  float: left;
  margin-right: 1rem;
}
.rightBtn {
  width: 35%;
  margin-right: 10px;
  float: right;
}
</style>