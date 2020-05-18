<template>
  <div class="c-reg-box">
    <div class="c-reg-nav">
      <div>
        <a
          href="javascript:;"
          :class="{active:activeTab=='phone'}"
          @click="setActive('phone')"
        >手机号注册</a>
      </div>
      <div>
        <a href="javascript:;" :class="{active:activeTab=='mail'}" @click="setActive('mail')">邮箱注册</a>
      </div>
    </div>
    <components :is="regType"></components>
  </div>
</template>

<script>
import RegPhone from "@/components/login/RegPhone.vue";
import RegMail from "@/components/login/RegMail.vue";
export default {
  name: "register",
  components: {
    RegPhone,
    RegMail
  },
  data() {
    return {
      regType: RegPhone,
      activeTab: "phone"
    };
  },
  methods: {
    setActive(tab) {
      this.activeTab = tab;
      if (tab === "phone") {
        this.regType = RegPhone;
      } else if (tab == "mail") {
        this.regType = RegMail;
      }
    }
  }
};
</script>
<style lang="less">
@import url("../../assets/css/login.less");
</style>