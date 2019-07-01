<template>
  <div>
    <div class="main-div">
      <router-view/>
    </div>
    
    <van-tabbar v-model="active" @change="changeTabbar(active)" route='true'>
      <van-tabbar-item icon="shop" >首页</van-tabbar-item>
      <van-tabbar-item icon="records">列表页</van-tabbar-item>
      <van-tabbar-item icon="cart">购物车页</van-tabbar-item>
      <van-tabbar-item icon="contact" >会员中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      nowPath: ""
    };
  },
  created() {
    this.changeTabBarActive();
  },
  updated() {
    this.changeTabBarActive();
  },
  methods: {
    changeTabBarActive() {
      this.nowPath = this.$route.path;
      switch (this.nowPath) {
        case "/main":
          this.active = 0;
          break;
        case "/categoryList":
          this.active = 1;
          break;
        case "/cart":
          this.active = 2;
          break;
        case "/member":
          this.active = 3;
          break;
      }
    },
    changeTabbar(active) {
      switch (active) {
        case 0:
          this.$router.push({ name: "ShoppingMall" });
          break;
        case 1:
          this.$router.push({ name: "CategoryList" });
          break;
        case 2:
          if (localStorage.userInfo) {
             this.$router.push({ name: "Cart" });
          } else {
             this.$router.push({ name: "Login" });
          }
          break;
        case 3:
             if (localStorage.userInfo) {
             this.$router.push({ name: "Member" });
          } else {
             this.$router.push({ name: "Login" });
          }
          break;
      }
    }
  }
};
</script>

<style scoped>
</style>