const BASEURL = 'https://www.easy-mock.com/mock/5ce94369843fd568acd104cc/advertesPicture/';
const LOCALURL = "http://localhost:3000/"
const URL = {
  getShoppingMallInfo: BASEURL + 'Mrluo',
  getGoodsInfo: BASEURL + 'getGoodsInfo',
  registerUser:LOCALURL+'user/register',   //用户注册接口
  login:LOCALURL+'user/login' ,//用户登陆接口
  getDetailGoodsInfo:LOCALURL+'goods/getDetailGoodsInfo', //获取商品信息
  getCategoryList:LOCALURL+'goods/getCategoryList', //获取大分类商品
  getCategorySubList:LOCALURL+'goods/getCategorySubList',   //获取分类信息
  getGoodsListByCategorySubID:LOCALURL+'goods/getGoodsListByCategorySubID',   //得到小类商品信息
}
module.exports = URL