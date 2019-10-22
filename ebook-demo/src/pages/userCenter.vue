<template>
  <div></div>
</template>

<script>
import store from "../store";
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      vipList: []
    };
  },
  computed: {
    ...mapState(["userInfo"]),
    ...mapGetters(["memberInfo"])
  },
  mounted() {
    this.vipList = [
      { name: "普通会员", charge: "10.00", vipLevel: 0, userStatus: 0 },
      { name: "VIP1会员", charge: "50.00", vipLevel: 1, userStatus: 1 },
      { name: "VIP3会员", charge: "100.00", vipLevel: 3, userStatus: 2 },
      { name: "VIP9会员", charge: "1000.00", vipLevel: 9, userStatus: 2 },
      { name: "VIP12会员", charge: "10000.00", vipLevel: 12, userStatus: 2 }
    ];
  },
  methods: {
    recharge() {},
    upgrade() {},
    buy(e) {
      store.dispatch("buyVip", e);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
