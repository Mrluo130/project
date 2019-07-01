// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {Button,Row,Col,Swipe,SwipeItem, Search,Lazyload ,List,Field,NavBar,Tab,Tabs,PullRefresh, stepper,Tabbar,TabbarItem,Cell, CellGroup,Dialog } from 'vant'
Vue.use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem).use(Search).use(Lazyload ).use(List).use(Field).use(NavBar).use(Tabs).use(Tab).use(PullRefresh).use(stepper).use(Tabbar).use(TabbarItem).use(Cell).use(CellGroup).use(Dialog)
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper, /* { default global options } */)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
