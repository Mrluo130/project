<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="购物车"/>
    </div>
    <div class="card-title">
      <van-button size="small" type="danger" @click="clearCart" plain>清空购物车</van-button>
    </div>
    <div class="cart-list">
      <div class="cart-row" v-for="(item,index) in cartInfo" :key="index">
        <div class="cart-img">
          <img :src="item.image" width="100%" :onerror="errImg">
        </div>
        <div class="cart-text">
          <div class="cart-goods-name">{{item.name}}</div>
          <div class="cart-control">
            <van-stepper v-model="item.count"/>
          </div>
        </div>
        <div class="cart-goods-price">
          <div>￥{{item.price}}</div>
          <div>x{{item.count}}</div>
          <div class="allPrice">￥{{item.price*item.count}}</div>
        </div>
      </div>
    </div>
    <div class="totalMoney">商品总价：￥ {{totalMoney }}</div>
  </div>
</template>

<script>
import toMoney from "@/filter/moneyFilter.js";
export default {
  data() {
    return {
      cartInfo: [],
      isEmpty: false,
      errImg: 'this.src="' + require("@/assets/images/errorimg.png") + '"' //错误图片显示路径
    };
  },
  created() {
    this.getCartInfo();
  },

  methods: {
    //获取购物车数据
    getCartInfo() {
      //判断本地是否有数据
      if (localStorage.cartInfo) {
        this.cartInfo = JSON.parse(localStorage.cartInfo);
      }
      console.log("this.cartInfo" + JSON.stringify(this.cartInfo));
      this.isEmpty = this.cartInfo.length > 0 ? true : false;
    },
    //清空购物车
    clearCart() {
      localStorage.removeItem("cartInfo");
      this.cartInfo = [];
    }
  },
  // filters: {
  //   moneyFilter(money) {
  //     return toMoney(money);
  //   }
  // },
  computed: {
    totalMoney() {
      let allMoney = 0;
      this.cartInfo.forEach((item, index) => {
        allMoney += item.price * item.count;
      });

      localStorage.cartInfo = JSON.stringify(this.cartInfo);

      return allMoney;
    }
  }
};
</script>

<style scoped>
  @import "../../assets/css/Cart.css";
</style>