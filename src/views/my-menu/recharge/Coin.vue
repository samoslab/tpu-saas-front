<template>
  <div class="coin c-content">
    <!-- <van-nav-bar
      @click-left="onClickLeft"
      @click-right="onClickRight"
      :left-arrow="true"
      :title="data[1]"
      class="c-nav-bar"
    >-->
    <nav-bar :title="data[1]" @click-right="onClickRight">
      <van-icon name="wap-home-o" slot="right" />
    </nav-bar>

    <!-- <van-icon name="wap-home-o" slot="right" />
    </van-nav-bar>-->

    <div class="coin_cen">
      <div class="coin_title">
        <div>
          <span class="avater" style="margin-right: 20px;">
            <img :src="icon" alt />
          </span>
          <span>{{data[0]}} {{data[1]}}</span>
        </div>
        <div>
          <span>
            打币地址:
            <i class="site">{{address}}</i>
          </span>
        </div>
        <div>
          <span>
            最小存入:
            <i class="site">{{deposit_min}}&nbsp;{{data[1]}}</i>
          </span>
        </div>
        <div class="code">
          <div id="qrcode" ref="qrcode"></div>
        </div>
        <div class="btn">
          <van-button class="btn1" :data-clipboard-text="address" @click="copy" size="large">复制地址</van-button>
          <!-- <van-button class='btn2' size="large">保存到相册</van-button> -->
        </div>
      </div>
    </div>

    <!-- <Loading v-if='flag'></Loading> -->
  </div>
</template>

<script>
// 复制地址插件
import Clipboard from "clipboard";
// 地址转换二维码插件
import QRCode from "qrcodejs2";
// import axios from 'axios';
// import Loading from '../../Loading';

export default {
  name: "coin",
  // components: { Loading },
  data() {
    return {
      data: this.$route.query.data,
      icon: this.$route.query.icon,
      Site: "",
      address: "",
      deposit_min: 0,
      flag: true
    };
  },
  created() {
    this.site();
  },
  methods: {
    onClickRight() {
      this.$router.push({ path: "/coffer" });
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
    },
    qrcode(address) {
      // console.log(address)
      new QRCode("qrcode", {
        width: 150, // 设置宽度，单位像素
        height: 150, // 设置高度，单位像素
        text: address // 设置二维码内容或跳转地址
      });
    },
    site() {
      this.$post2("pay/api/index/getDepositAddress", {
        token: this.data[1]
      })

        .then(res => {
          this.address = res.address;
          this.deposit_min = res.deposit_min;
          this.$nextTick(() => {
            this.qrcode(res.address);
          });
        })
        .catch(err => {
          this.$dialog.alert({
            message: "不支持通证类型"
          });
        });
    },
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped lang='less'>
.coin {
  width: 100%;
  height: 100%;
  font-size: 18px;
  .coin_cen {
    width: 100%;
    height: 100%;
    padding-top: 20px;
    .coin_title {
      > div {
        height: 50px;
        display: flex;
        padding: 0 30px;
        span {
          height: 40px;
          line-height: 40px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .avater {
          border-radius: 50%;
          width: 40px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .code {
        width: 100%;
        height: 300px;
        border-top: 1px dashed #ddd;
        padding: 0;
        position: relative;
      }
      .btn {
        display: block;
        margin: 0;
        .btn1,
        .btn2 {
          margin-top: 10px;
          border: none;
          text-align: center;
          border-radius: 10px;
          color: white;
          background: #00c0ed;
        }
      }
    }
  }
}
.c-nav-bar {
  span,
  i {
    font-size: 24px !important;
  }
}
</style>
<style>
#qrcode {
  width: 150px;
  height: 150px;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
#qrcode > img {
  width: 100%;
  height: 100%;
}
</style>


db.platform_token_setting.insert({  "app" : "tpu", "mainchain" : "NULS", "token" : "NULS", "contract" : "", "icon" : "http://s.yqkkn.com/nuls2.png", "precisoin" : 3, "name" : "NULS", "deposit_fee" : 0, "deposit_fee_type" : 1, "deposit_min" : 1, "enable" : 0, "precision" : 3, "redpkt_fee" : 0.002, "redpkt_fee_type" : 2, "redpkt_min" : 1, "unit" : 8, "withdraw_fee" : 0.05, "withdraw_fee_type" : 1, "withdraw_min" : 1 })

