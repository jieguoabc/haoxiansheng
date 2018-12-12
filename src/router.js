import Vue from 'vue'
import Router from 'vue-router'
//1:引入自定义组件
import  HomeContainer from "./components/tabbar/HomeContainer.vue"
import ShopContainer from "./components/tabbar/ShopContainer.vue"
import goodsinfo from "./components/goods/GoodInfo.vue"
import LoginContainer from "./components/home/LoginContainer.vue";

Vue.use(Router)
//2.配置访问自定义组件路径
export default new Router({
  routes: [
    {path:'/',redirect:"/home"},//重定向
    {path:'/home',component:HomeContainer},
    // {path:"/home/shop/:id",component:ShopContainer},
    {path:"/home/goodsinfo/:id",component:goodsinfo},
    {path:"/shop",component:ShopContainer},
    {path:"/home/login",component:LoginContainer},
  ]
})

