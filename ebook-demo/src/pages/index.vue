<template>
  <div>
    {{this.$store.state.count}}
    {{this.$store.getters.countAdd}}
    {{memberInfo}}
    <button
      @click="countAdd"
    >Add</button>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      
    };
  },
  computed: {
    ...mapState([]),
    ...mapGetters(["memberInfo"])
  },
  mounted() {
    console.log(this.userStatus, this.vipLevel);
  },
  methods: {
    countAdd() {
      const v = 10;
      this.$store.commit("countAdd", v);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
