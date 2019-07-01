<template >
  <div class="djfkdf">
    <div class="search-bar">
      <van-row>
        <van-col span="3" class="icon iconfont icon-search"></van-col>
        <van-col span="16">
          <input type="text" class="search-input">
        </van-col>
        <van-col span="5">
          <van-button size="mini">查找</van-button>
        </van-col>
      </van-row>
    </div>
      <div class="swiper-area">
        <van-swipe :autoplay="3000" class="red">
          <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
            <img :src="banner.image" width="100%">
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="ad-banner">
        <img v-lazy="adBanner.PICTURE_ADDRESS" width="100%">
      </div>
      <div class="type-bar">
        <div v-for="(cate,index) in category" :key="index">
          <img v-lazy="cate.image" width="90%">
          <span>{{cate.mallCategoryName}}</span>
        </div>
      </div>
      <!--Recommend goods area-->
      <div class="recommend-area">
        <div class="recommend-title">商品推荐</div>
        <div class="recommend-body">
          <swiper :options="swiperOption">
            <swiper-slide
              v-for=" (item ,index) in recommendGoods"
              :key="index"
              class="swiper-slide"
            >
              <div class="recommend-item" @click="goGoodsInfo(item.goodsId)">
                <img :src="item.image" width="80%">
                <div>{{item.goodsName}}</div>
                <div>￥{{item.price}} (￥{{item.mallPrice}})</div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>

      <!--floor one area-->
      <FloorComponent :floorData="floor1" :floorTitle="floorName.floor1"></FloorComponent>
      <FloorComponent :floorData="floor2" :floorTitle="floorName.floor2"></FloorComponent>
      <FloorComponent :floorData="floor3" :floorTitle="floorName.floor3"></FloorComponent>

      <!-- 热卖商品 -->
      <div class="hot-area">
        <div class="hot-title">热卖商品</div>
        <div class="hot-goods">
          <van-list>
            <van-row gutter="20">
              <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
                <div @click="goGoodsInfo(item.goodsId)">
                  <goods-info
                    :goodsImage="item.image"
                    :goodsName="item.name"
                    :goodsPrice="item.price"
                  ></goods-info>
                </div>
              </van-col>
            </van-row>
          </van-list>
        </div>
      </div>
  </div>
</template>
<script  >
import axios from "axios";
import FloorComponent from "../common/floorComponent";
import goodsInfo from "../common/goodsInfoComponent";
import url from "@/axios/serviceAPI.config.js";
export default {
  data() {
    return {
      swiperOption: {
        slidesPerView: 3
      },
      //轮播图
      bannerPicArray: [],
      //商品类别标签栏
      category: [],
      //广告图片
      adBanner: [],
      //推荐商品
      recommendGoods: [],
      //楼层1
      floor1: [],
      //楼层2
      floor2: [],
      //楼层3
      floor3: [],
      //楼层的标题
      floorName: {},
      //热卖商品
      hotGoods: []
    };
  },
  components: { FloorComponent, goodsInfo },
  created() {
    axios({
      url: url.getShoppingMallInfo,
      methed: "get"
    })
      .then(res => {
        if (res.status == 200) {
          this.category = res.data.data.category;
          this.bannerPicArray = res.data.data.slides;
          this.adBanner = res.data.data.advertesPicture;
          this.recommendGoods = res.data.data.recommend;
          this.floor1 = res.data.data.floor1;
          this.floor2 = res.data.data.floor2;
          this.floor3 = res.data.data.floor3;
          this.floorName = res.data.data.floorName;
          this.hotGoods = res.data.data.hotGoods;
        }
      })
      .catch(err => {
        alert("数据请求失败");
      });
  },
  methods: {
    goGoodsInfo(id) {
      this.$router.push({ name: "Goods", params: { goodsId: id } });
    }
  }
};
</script>
<style scoped>
@import "../../assets/css/ShoppingMall.css";
</style>



