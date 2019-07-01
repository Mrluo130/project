<template>
  <div class="goods-info" >
    <div class="goods-image">
      <img v-lazy="goodsImage" width="90%" />
      <div class="goods-name">{{goodsName}}</div>
      <div class="goods-price">￥{{goodsPrice}}</div>
    </div>

  </div>
</template>

<script >

  export default ({
    props:['goodsImage','goodsName','goodsPrice',],
    data(){
      return {
      }
    }
  })
</script>

<style >
@import "../../assets/css/GoodsInfoComponent.css";
</style>