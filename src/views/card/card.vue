<template>
  <div class="container">
    <div class="cardWrap">
      <img :src="dataURL " alt />
      <div class="card-switch">
        <span style="float: right">切换为统一二维码-名片</span>
      </div>
      <div class="card" ref="cardCanvas">
        <div class="card-info">
          <div class="card-imgwrap">
            <div v-if="0"></div>
            <!-- 你去控制显示隐藏，有图片就用上面注释的这个 -->
            <!-- <img src="img/u297.png" alt="" /> -->
            <div class="card-empty" v-else>
              <img class="card-empty-img1" v-if="cardSaveTxtStatus === 2" src />
              <p v-if="cardSaveTxtStatus === 2">上传头像</p>
              <img class="card-empty-img2" v-if="cardSaveTxtStatus === 1" src />
            </div>
          </div>
          <div class="card-detail">
            <div class="name" v-if="cardSaveTxtStatus === 1">12312321</div>
            <div class="edit-name" v-else-if="cardSaveTxtStatus === 2">
              <input value="12312321" style="height:17px" />
            </div>
            <div>集团专属渠道</div>
            <div>中国移动通信集团附件有限公司厦门分公司</div>
            <div>
              <img src /> 厦门市莲前西路233号移动通信大楼
            </div>
            <div class="tel">
              <img src />13211111111
            </div>
          </div>
        </div>
        <div class="card-bottom">
          <div class="txt">
            为企业提供基础通信、营销管理等
            <br />一站式解决方案
          </div>
        </div>
        <div class="card-save" ref="cardSave">
          <div class="card-saveTxt" v-if="cardSaveTxtStatus === 1" @click="editCard">编辑</div>
          <div class="card-saveTxt" v-if="cardSaveTxtStatus === 2" @click="saveCard">保存</div>
        </div>
        <div class="card-code">
          <div class="code-img">
            <img src alt />
          </div>
          <div>
            <span class="triangle-up"></span>扫码了解
          </div>
        </div>
      </div>

      <div class="cardWrap-txt">
        <div>修改名片</div>
        <div class="grey" @click="saveImage()">点击保存图片</div>
      </div>
    </div>
  </div>
</template>
 
<script>
import html2canvas from "html2canvas";
export default {
  data: function() {
    return {
      dataURL: "",
      cardUserName: "", // 当前商户的昵称
      currentQrCode: "", // 当前名片的二维码数据
      cardSaveTxtStatus: 1 // 名片右上角编辑按钮状态 1-不可编辑 2-可编辑
    };
  },
  mounted: function() {},
  watch: {
    $route(val) {}
  },
  methods: {
    /* 保存图片的方法（即按钮点击触发的方法）
      第一个参数为需要保存的div的id名
      第二个参数为保存图片的名称 */
    saveImage(divText, imgText) {
      let canvasID = this.$refs.cardCanvas;
      let removeDiv = this.$refs.cardSave;
      canvasID.removeChild(removeDiv);
      html2canvas(canvasID, {
        backgroundColor: null // 解决生成的图片有白边
      }).then(canvas => {
        canvasID.appendChild(removeDiv);
        let dataURL = canvas.toDataURL("image/png");
        this.dataURL = dataURL;
        this.saveFile(dataURL, "wahaha");
      });
    },
    editCard(name) {
      // 点击编辑按钮
      this.cardSaveTxtStatus = 2; // 可编辑状态
      this.cardUserName = name;
    },
    saveCard() {
      // 点击保存按钮
      this.cardUserName = "1231231312";
      this.cardSaveTxtStatus = 1;
    },
    saveFile(data, filename) {
      let saveLink = document.createElementNS(
        "http://www.w3.org/1999/xhtml",
        "a"
      );
      saveLink.href = data;
      saveLink.download = filename;
      let event = document.createEvent("MouseEvents");
      event.initMouseEvent(
        "click",
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );
      saveLink.dispatchEvent(event);
    }
  }
};
</script>
 
<style lang="less" scoped>
.container {
  width: 100%;
  height: calc(~"(100vh - 40px)");
  background: #fff;

  img[lazy="loading"] {
    padding: 40%;
  }
  img {
    width: 100%;
    /*border-radius: 10px;*/
  }
}
</style>
 
<style  scoped>
.cardWrap {
  padding: 10px 6% 10px;
  background: #fff;
}
.card {
  position: relative;
}
.card-info {
  background: linear-gradient(#1899de, #fbfdff);
  padding: 30px 0 30px 20px;
}
.card-bottom {
  height: 46px;
  padding: 5px 0;
  background: #0d6391;
  color: #fff;
  text-align: center;
  font-size: 12px;
  box-sizing: border-box;
}
.card-bottom .txt {
  width: 200px;
  line-height: 18px;
}
.card-save {
  position: absolute;
  right: 0;
  top: 0px;
  width: 0;
  height: 0;
  font-size: 10px;
  color: #fff;
  border-width: 0px 45px 45px 0;
  border-style: solid;
  border-color: transparent #009900;
}
.card-saveTxt {
  width: 45px;
  height: 45px;
  transform-origin: bottom center;
  transform: rotate(45deg);
  position: absolute;
  display: inline-block;
  width: 45px;
  right: -37px;
  top: 3px;
}
.cardWrap-txt {
  margin-top: 20px;
  font-size: 14px;
  line-height: 20px;
  color: #333333;
  text-align: center;
}
.cardWrap-txt .grey {
  color: #cccccc;
}
.card-code {
  position: absolute;
  right: 6%;
  bottom: 4px;
  color: #fff;
  font-size: 12px;
  text-align: center;
}
.code-img {
  display: inline-block;
  height: 54px;
  width: 54px;
  line-height: 54px;
  text-align: center;
  background: #fff;
}
.code-img img {
  height: 48px;
  width: 48px;
  vertical-align: middle;
}
.triangle-up {
  display: inline-block;
  margin-right: 4px;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 10px solid #fff;
}
.card-imgwrap {
  width: 65px;
  height: 86px;
  float: left;
  margin-right: 10px;
}
.card-imgwrap > img {
  width: 100%;
  height: 100%;
}
.card-empty {
  width: 100%;
  height: 100%;
  background: #fff;
  text-align: center;
  color: #333;
  font-size: 10px;
  vertical-align: middle;
}
.card-empty .card-empty-img1 {
  width: 56px;
}
.card-empty .card-empty-img2 {
  margin-top: 10px;
  width: 65px;
}
.card-detail {
  color: #666;
  font-size: 10px;
  line-height: 17px;
  overflow: hidden;
}
.card-detail img {
  width: 12px;
  vertical-align: middle;
}
.card-detail .name,
.card-detail .tel {
  color: #333;
}
.card-detail .edit-name {
  z-index: 999;
}
.card-switch {
  top: 15px;
  line-height: 13px;
  font-size: 13px;
  position: relative;
}
</style>