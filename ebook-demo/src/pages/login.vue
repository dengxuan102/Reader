<template>
  <div class="login">
    <p class="login-title">
      <span class="login-title_left">Muke</span>
      <span class="login-title_right">Wang</span>
    </p>
    <div class="section">
      <input
        class="section-input"
        v-model="form.account"
        placeholder-class="input-holder"
        placeholder="请输入您的账号"
      />
    </div>
    <div class="section">
      <input
        class="section-input"
        v-model="form.pasword"
        placeholder-class="input-holder"
        placeholder="请输入您的密码"
      />
    </div>
    <button class="btn" @click="login">登录</button>
    <p class="login-text">版权所有@dx所有</p>
  </div>
</template>

<script>
import store from "../store";
export default {
  data() {
    return {
      isHidden: false,
      isPassword: true,
      logs: [],
      form: {
        account: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      if (!this.form.account && !this.form.password) {
        return false;
        alert("请填写账号密码");
      }
      const that = this;
      setTimeout(() => {
        {
          store.commit("login", {
            account: that.form.account,
            password: that.form.password
          });
        }
        store.commit("setMemberInfo", {
          userStatus: 1,
          vipLevel: 0
        });
        that.$router.push("./index.vue");
      }, 500);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/global";
.login {
  font-size: px2rem(100);
}
</style>
