<template>
  <div id="pos">
    <el-row>
      <el-col :span="7" class="pos-order" id="pos-list">
        <el-tabs>
          <el-tab-pane label="点餐" class="el-tab">
            <el-table :data="tableData" border>
              <el-table-column prop="goodsName" label="商品"></el-table-column>
              <el-table-column prop="count" label="量" width="50"></el-table-column>
              <el-table-column prop="price" label="金额" width="70"></el-table-column>
              <el-table-column label="操作" width="100" fixed="right">
                <template scope="scope">
                  <el-button type="text" size="small" @click="delSingleGoods(scope.row)">删除</el-button>
                  <el-button type="text" size="small" @click="addOrderList(scope.row)">增加</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div>数量：{{totalCount}}，总金额：{{totalMoney}}</div>
            <div class="div-btn">
              <el-button type="danger" @click="delAllGoods">全部删除</el-button>
              <el-button type="success" @click="checkout">结账</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="外卖" class="el-tab">外卖</el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="17">
        <div class="often-godds">
          <div class="title">常用商品</div>
          <div class="often-goods-list">
            <ul>
              <li v-for="(goods ,index) in oftenGoods" :key="index" @click="addOrderList(goods)">
                <span>{{goods.goodsName}}</span>
                <span class="o-price">{{goods.price}}</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="goods-type">
          <el-tabs>
            <el-tab-pane label="汉堡">
              <ul class="cookList">
                <li v-for="(goods ,index ) in type0Goods" :key="index" @click="addOrderList(goods)">
                  <span class="foodImg">
                    <img :src="goods.goodsImg" width="100%">
                  </span>
                  <span class="foodName">{{goods.goodsName}}</span>
                  <span class="foodPrice">{{"￥"+goods.price+"元"}}</span>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="小食">
              <ul class="cookList">
                <li v-for="(goods ,index ) in type1Goods" :key="index" @click="addOrderList(goods)">
                  <span class="foodImg">
                    <img :src="goods.goodsImg" width="100%">
                  </span>
                  <span class="foodName">{{goods.goodsName}}</span>
                  <span class="foodPrice">{{"￥"+goods.price+"元"}}</span>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="饮料">
              <ul class="cookList">
                <li v-for="(goods ,index ) in type2Goods" :key="index" @click="addOrderList(goods)">
                  <span class="foodImg">
                    <img :src="goods.goodsImg" width="100%">
                  </span>
                  <span class="foodName">{{goods.goodsName}}</span>
                  <span class="foodPrice">{{"￥"+goods.price+"元"}}</span>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="套餐">
              <ul class="cookList">
                <li v-for="(goods ,index ) in type3Goods" :key="index">
                  <span class="foodImg">
                    <img :src="goods.goodsImg" width="100%">
                  </span>
                  <span class="foodName">{{goods.goodsName}}</span>
                  <span class="foodPrice">{{"￥"+goods.price+"元"}}</span>
                </li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Pos",
  data() {
    return {
      tableData: [],
      oftenGoods: [],
      type0Goods: [],
      type1Goods: [],
      type2Goods: [],
      type3Goods: [],
      totalCount: 0,
      totalMoney: 0
    };
  },
  mounted: function() {
    var orderHeight = document.body.clientHeight;
    document.getElementById("pos-list").style.height = orderHeight + "px";
  },
  created() {
    axios
      .get(
        "https://www.easy-mock.com/mock/5b8b30dbf032f03c5e71de7f/kuaican/oftenGoods"
      )
      .then(res => {
        console.log(res);
        this.oftenGoods = res.data;
      })
      .catch(err => {
        alert("网络错误，不能访问");
      }),
      axios
        .get(
          "https://www.easy-mock.com/mock/5ce8bafa3d0e0c48f29a0141/mrluo/typeGoos"
        )
        .then(res => {
          // console.log(res.type0Goods)
          this.type0Goods = res.data.type0Goods;
          this.type1Goods = res.data.type1Goods;
          this.type2Goods = res.data.type2Goods;
          this.type3Goods = res.data.type3Goods;
        })
        .catch(err => {
          alert("网络错误，不能访问");
        });
  },
  methods: {
    addOrderList(goods) {
      //判断列表中是否有相应的数据
      let isHave = false;
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].goodsId == goods.goodsId) {
          isHave = true;
        }
      }
      //根据isHave判断订单列表中是否已经有此商品
      if (isHave) {
        let arr = this.tableData.filter(o => o.goodsId == goods.goodsId);
        arr[0].count++;
      } else {
        let newGoods = {
          goodsId: goods.goodsId,
          goodsName: goods.goodsName,
          price: goods.price,
          count: 1
        };
        this.tableData.push(newGoods);
      }
      this.getAllmoney();
    },
    //计算数量和金额
    getAllmoney() {
      (this.totalCount = 0), (this.totalMoney = 0);
      if (this.tableData) {
        this.tableData.forEach(i => {
          this.totalCount += i.count;
          this.totalMoney = this.totalMoney + i.price * i.count;
        });
      }
    },
    //删除单个商品
    delSingleGoods(goods) {
      console.log(goods);
      this.tableData = this.tableData.filter(o => o.goodsId != goods.goodsId);
       this.getAllmoney();
    },
    //删除所有商品
    delAllGoods(){
      this.tableData=[]
      this.totalCount=0
      this.totalMoney=0
    },
    //结算
    checkout() {
    if (this.totalCount!=0) {
        this.tableData = [];
        this.totalCount = 0;
        this.totalMoney = 0;
        this.$message({
            message: '结账成功，感谢你又为店里出了一份力!',
            type: 'success'
        });
 
    }else{
        this.$message.error('不能空结。老板了解你急切的心情！');
    }
 
}
  }
};
</script>
<style>
.pos-order {
  background-color: #f9fafc;
  border-right: 1px solid #c0ccda;
  height: 100%;
}
.div-btn {
  margin-top: 10px;
}
.el-tab {
  text-align: center;
}
.title {
  height: 20px;
  border-bottom: 1px solid #d3dce6;
  background-color: #f9fafc;
  padding: 10px;
}
.often-goods-list ul li {
  list-style: none;
  float: left;
  border: 1px solid #e5e9f2;
  padding: 10px;
  margin: 5px;
  background-color: #fff;
  cursor: pointer;
}
.o-price {
  color: #58b7ff;
}
.goods-type {
  clear: both;
}
.cookList li {
  list-style: none;
  width: 23%;
  border: 1px solid #e5e9f2;
  height: auot;
  overflow: hidden;
  background-color: #fff;
  padding: 2px;
  float: left;
  margin: 2px;
}
.cookList li span {
  display: block;
  float: left;
  cursor: pointer;
}
.foodImg {
  width: 40%;
}
.foodName {
  font-size: 18px;
  padding-left: 10px;
  color: brown;
}
.foodPrice {
  font-size: 16px;
  padding-left: 10px;
  padding-top: 10px;
}
</style>


