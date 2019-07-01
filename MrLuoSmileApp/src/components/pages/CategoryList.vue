<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="类别列表"/>
    </div>
      <van-row>
        <van-col span="6">
          <div id="leftNav">
            <ul>
              <li
                v-for="(item,index) in category"
                :key="index"
                @click="clickCategory(index,item.ID)"
                :class="{categoryActive:categoryIndex==index}"
              >{{item.MALL_CATEGORY_NAME}}</li>
            </ul>
          </div>
        </van-col>
        <van-col span="18">
          <div class="tabCategorySub">
            <van-tabs v-model="active" @click="onClickCategorySub">
              <van-tab v-for="(item,index) in categorySub" :key="index" :title="item.MALL_SUB_NAME"></van-tab>
            </van-tabs>
          </div>
          <div id="list-div">
            <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
              <van-list v-model="loading" :finished="finished" @load="onLoad">
                <div class="list-item" v-for="(item,index) in goodList" :key="index" @click="goGoodsInfo(item.ID)">
                  <div class="list-item-img">
                    <img :src="item.IMAGE1" width="100%" :onerror="errorImg">
                     <div class="list-item-text">{{item.NAME}}</div>
                    <div class="list-item-text">￥{{item.ORI_PRICE}}</div>
                  </div>
               
                </div>
              </van-list>
            </van-pull-refresh>
          </div>
        </van-col>
      </van-row>
    </div>
</template>

<script>
import axios from "axios";
import url from "@/axios/serviceAPI.config.js";
export default {
  data() {
    return {
      category: [],
      categoryIndex: 0,
      categorySub: [],
      active: 0,
      page: 1,
      goodList: [],
      categorySubId: "",
      loading: false,
      finished: false,
      isRefresh: false, //下拉加载
      errorImg:'this.src="' + require('@/assets/images/errorimg.png') + '"'   ,  //错误图片显示路径
    };
  },
  methods: {
    //获取商品的
    getCategory() {
      axios({
        url: url.getCategoryList,
        method: "get"
      })
        .then(res => {
          if (res.data.code == 200 && res.data.message) {
            this.category = res.data.message;
            this.getCategorySubByCategoryId(this.category[0].ID);
          } else {
            Toast("服务器错误，数据取得失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    clickCategory(index, categoryId) {
      this.categoryIndex = index;
      this.page = 1;
      this.finished = false;
      this.goodList = [];
      this.getCategorySubByCategoryId(categoryId);
    },
    //根据大类ID读取小类类别列表
    getCategorySubByCategoryId(categoryId) {
      axios({
        url: url.getCategorySubList,
        method: "post",
        data: { categoryId: categoryId }
      })
        .then(res => {
          if (res.data.code == 200 && res.data.message) {
            this.categorySub = res.data.message;
            this.active = 0;
            this.onLoad();
          } else {
            Toast("服务器错误，数据取得失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //商品列表的获取
    getGoodList() {
      axios({
        url: url.getGoodsListByCategorySubID,
        method: "post",
        data: {
          categorySubId: this.categorySubId,
          page: this.page
        }
      })
        .then(response => {
          if (response.data.code == 200 && response.data.message.length) {
            this.page++;
            this.goodList = this.goodList.concat(response.data.message);
          } else {
            this.finished = true;
          }
          this.loading = false;
          // console.log(this.finished);
        })
        .catch(error => {
          console.log(error);
        });
    },
    //点击获取子类商品信息的方法
    onClickCategorySub(index, title) {
      //console.log( this.categorySub)
      this.categorySubId = this.categorySub[index].ID;
      // console.log(this.categorySubId);
      this.goodList = [];
      this.finished = false;
      this.page = 1;
      this.onLoad();
    },
    //上拉加载
    onLoad() {
      setTimeout(() => {
        this.categorySubId = this.categorySubId ? this.categorySubId : this.categorySub[0].ID;
        this.getGoodList();
      }, 1000);
    },
    //下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.isRefresh = false;
        this.goodList = [];
        this.onLoad();
      }, 500);
    },
    //跳转到详情页面
    goGoodsInfo(id){
      this.$router.push({name:"Goods",params:{goodsId:id}})
    }
  },
  created() {
    this.getCategory();
  },
  mounted() {
    let winHeight = document.documentElement.clientHeight;
    document.getElementById("leftNav").style.height =
      winHeight - 46 - 50 + "px";
    document.getElementById("list-div").style.height =
      winHeight - 90 - 50 + "px";
  }
};
</script>
<style  scoped>
@import "../../assets/css/CategoryList.css";
</style>