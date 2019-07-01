<template>
  <div>
    <div>
      <van-nav-bar title="会员中心"/>
    </div>
    <div class="top">
      <div>
        <img src="@/assets/logo.png" class="top-img">
      </div>
      <div>
        <p>{{userName}}</p>
      </div>
    </div>
    <div class="login">
      <div>
        <van-button type="warning" @click="jumpRouter(0,true)">我要登录</van-button>
      </div>
      <div>
        <van-button type="primary" @click="jumpRouter(1,true)">我要注册</van-button>
      </div>
    </div>
    <div class="sdd">
      <van-cell-group>
        <van-cell
          v-for="(item,index) in settingList"
          :key="index"
          :title="item"
          @click="jumpRouter(index,false)"
          is-link
        />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { Toast ,Dialog} from "vant";
export default {
  data() {
    return {
      settingList: [
        "会员卡",
        "地址管理",
        "我的订单",
        "会员权益",
        "联系我们",
        "退出账号"
      ],
      userName: ""
    };
  },
  created() {
    // if (localStorage.userInfo) {
    //  this.userName=localStorage.userInfo.
    // }else{
    //   this.userName='未登录'
    // }
  },
  methods: {
    jumpRouter(index, typy) {
      if (typy) {
        if (index == 0) {
          if (localStorage.userInfo) {
            Toast("您已经登录,请勿重复登录！");
          } else {
            this.$router.push({ name: "Login" });
          }
        } else {
          this.$router.push({ name: "Register" });
        }
      } else {
        switch (index) {
          case 0:
            Toast("会员卡");
            break;
          case 1:
            Toast("地址管理");
            console.log();
            break;
          case 2:
            Toast("我的订单");
            break;
          case 3:
            Toast("会员权益");
            break;
          case 4:
            Toast("联系我们");
            break;
          case 5:
           Dialog.confirm({
        title: "退出账号",
        message: "确定要退出登录吗？",
        closeOnClickOverlay:true
      })
        .then(() => {
         localStorage.clear()
         this.$router.push('/main')
        })
        .catch(() => {
          
        });
            break;
        }
      }
    },

  }
};
</script>

<style scoped>
@import "../../assets/css/Member.css";
</style>