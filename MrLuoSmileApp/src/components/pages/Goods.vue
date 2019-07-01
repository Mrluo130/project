<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="商品详情" left-text="返回" fixed='ture'   left-arrow @click-left="onClickLeft"/>
    </div>
    <div class="topimage-div">
      <img :src="goodsInfo.IMAGE1" width="100%">
    </div>
    <div class="goods-name">{{goodsInfo.NAME}}</div>
    <div class="goods-price">价格 ：￥{{goodsInfo.PRESENT_PRICE }}元</div>
    <div>
      <van-tabs swipeable sticky>
        <van-tab title="商品详情">
          <div class="detail" v-html="goodsInfo.DETAIL"></div>
        </van-tab>
        <van-tab title="评价">正在制作中</van-tab>
      </van-tabs>
    </div>
    <div class="goods-bottom">
      <div>
        <van-button size="large" type="primary" @click="addGoodsToCart">加入购物车</van-button>
      </div>
      <div>
        <van-button size="large" type="danger">直接购买</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/axios/serviceAPI.config.js";
import { Toast } from "vant";
import toMoney from "@/filter/moneyFilter.js";
export default {
  data() {
    return {
      goodsId: "00b417a0f3444bb6965f4ba2dbafbed0",
      goodsInfo: {}
    };
  },
  // filters: {
  //   moneyFilter(money) {
  //     return toMoney(money);
  //   }
  // },
  created() {
    this.goodsId = this.$route.query.goodsId
      ? this.$route.query.goodsId
      : this.$route.params.goodsId;
    this.getInfo();
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    getInfo() {
      axios({
        url: url.getDetailGoodsInfo,
        method: "post",
        data: {
          goodsId: this.goodsId
        }
      })
        .then(res => {
          console.log(res.data.message);
          if (res.data.code == 200 && res.data.message) {
            this.goodsInfo = res.data.message;
          } else {
            Toast("服务器错误，数据取得失败");
          }
          console.log(this.goodsInfo);
        })
        .catch(error => {
          console.log(error);
        });
    },
    addGoodsToCart() {
      //取出购物车的数据
      let cartInfo = localStorage.cartInfo
        ? JSON.parse(localStorage.cartInfo)
        : [];
      //判断购物车是否已经存在所选数据
      let isHaveGoods = cartInfo.find(cart => cart.goodsId == this.goodsId);
      if (!isHaveGoods) {
        let newGoodsInfo = {
          goodsId: this.goodsInfo.ID,
          name: this.goodsInfo.NAME,
          price: this.goodsInfo.PRESENT_PRICE,
          image: this.goodsInfo.IMAGE1,
          count: 1
        };
        cartInfo.push(newGoodsInfo); //添加到购物车
        localStorage.cartInfo = JSON.stringify(cartInfo); //操作本地数据
        Toast.success("添加成功");
      } else {
        //重新组成添加到购物车的信息
        Toast.success("已有此商品");
      }
      this.$router.push({ name: "Cart" }); //进行跳转
    }
  }
};
</script>

<style scoped>
@import "../../assets/css/Goods.css";
</style>