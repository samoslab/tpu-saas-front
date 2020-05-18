<template>
  <div class="Set c-content">
    <van-nav-bar @click-left="onClickLeft" :left-arrow="true" title="设置" class="c-nav-bar"></van-nav-bar>
    <div>
      <div class="cen_wallet">
        <div class="xtoken_rt" v-for="(item,index) in arr" :key="index" @click="skip(index)">
          <p>{{item.title}}</p>
          <span></span>
        </div>
      </div>
    </div>
    <userName v-if="isShow" @clone="clone"></userName>
    <userImg v-if="showImg" @cloneImg="cloneImg"></userImg>
    <userPhone v-if="showphone" @clonephone="clonephone"></userPhone>
    <van-popup v-model="show" position="bottom" :overlay="true">
      <van-picker show-toolbar :columns="columns" @cancel="onCancel" @confirm="onConfirm" />
    </van-popup>
  </div>
</template>

<script>
import userImg from "./userSet/userimg";
import userName from "./userSet/username";
import userPhone from "./userSet/setphone";
export default {
  name: "",
  data() {
    return {
      showphone: false,
      show: false,
      isShow: false,
      showImg: false,
      columns: [],
      arr: [
        { title: "手机号" },
        { title: "登录密码" },
        { title: "交易密码" },
        { title: "默认通证" },
        { title: "昵称设置" },
        { title: "头像设置" }
      ],
      showIndex: ""
    };
  },
  methods: {
    clonephone() {
      this.showphone = false;
    },
    cloneImg() {
      this.showImg = false;
    },
    onCancel() {
      this.show = false;
    },
    onConfirm(value) {
      this.$post2("user/api/index/setDefaultToken", {
        token: value
      }).then(res => {
        this.$toast("设置成功");
        console.log(res);
      });
      this.show = false;
      console.log("确认");
    },
    skip(index) {
      if (index === 5) {
        this.showImg = true;
      } else if (index === 4) {
        this.isShow = true;
      } else if (index === 3) {
        this.show = true;
        this.$post2("user/api/index/tokenset", {}).then(res => {
          this.columns = res.token_set.map(val => {
            return val.token;
          });
        });
      } else if (index == 2) {
        console.log("shezhi");
        this.$router.push({ path: "/sPay" });
      } else if (index == 1) {
        this.$router.push({ path: "/setpassword" });
      } else if (index == 0) {
        this.$router.push("/setPhone");
      }
    },
    clone() {
      this.isShow = false;
    },
    onClickLeft() {
      this.$router.go(-1);
    }
  },
  components: { userName, userImg, userPhone }
};
</script>

<style scoped lang='less'>
.Set {
  font-size: 16px;
  .cen_wallet {
    width: 100%;
    height: 100%;
    background: white;
    > div {
      width: 100%;
      height: 48px;
    }
    .xtoken_rt {
      border-bottom: 1px solid #eeeff4;
      line-height: 48px;
      display: flex;
      p {
        font-size: 14px;
        flex: 1;
        padding-left: 24px;
      }
      span {
        width: 32px;
        height: 48px;
        display: inline-block;
        background: url("../../assets/imgs/my/arrows.png") no-repeat center;
        background-size: 16px;
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
