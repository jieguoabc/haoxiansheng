import Vue from 'vue'
import App from './App.vue'
import router from './router'

import'mint-ui/lib/style.css'

Vue.config.productionTip = false
//5: 设置请求的根路径 
//Vue.http.options.root = "http://127.0.0.1/vue_ser/";
//6:全局设置post 时候表音的数据组织格式为 application/x-www-form-urlencoded
//Vue.http.options.emulateJSON = true;
// 导入 MUI 的样式表， 和 Bootstrap 用法没有差别
import './lib/mui/css/mui.css'
// 导入 MUI 的样式表，扩展图标样式，购物车图标
// 还需要加载图标字体文件
import './lib/mui/css/icons-extra.css'
//①引入组件mintiui库Header
//1.引入指定的组件

//局部引入mint-ui
/*import {Button,Header,Swipe,SwipeItem,Lazyload} from "mint-ui";
//2.注册到当前项目中
Vue.component(Header.name,Header);
Vue.component(Swipe.name,Swipe);
Vue.component(SwipeItem.name,SwipeItem)
Vue.component(Button.name,Button)
Vue.use(Lazyload);
*/
//完整引入mint-ui
import MintUI from "mint-ui"
Vue.use(MintUI)


//②引入vue-resource  发送ajax
//1.引入vue-resource 库所有组件
import VueResource from "vue-resource"
//2.将所有组件注册
Vue.use(VueResource)

//配置VueResource 服务器根目录
Vue.http.options.root="http://127.0.0.1:3000/"
//修改请求头 POST
//Vue.http.options.emulateJSON=true

//创建过滤器...日期格式对象
Vue.filter("dateFilter",function(val){
  var date=new Date(val)
  var y=date.getFullYear();
  var m=date.getMonth()+1
  var d=date.getDate()
  m<10&&(m="0"+m);
  d<10&&(d='0'+d);
  return `${y}-${m}-${d}`
})
//3.创建过滤器
Vue.filter("datetimeFilter",function(val){
  var date=new Date(val)
  var y=date.getFullYear();
  var m=date.getMonth()+1
  var d=date.getDate()
  var h=date.getHours()
  var mi=date.getMinutes()
  var s=date.getSeconds()
  m<10&&(m="0"+m);
  d<10&&(d='0'+d);
  return `${y}-${m}-${d} ${h}:${mi}:${s}`
})
//4.创建Vuex实例对象
  //4.1下载安装Vuex npm i vuex -D
  //4.2引入Vuex
  import Vuex from "vuex"
  //4.3注册Vue实例
  Vue.use(Vuex)
  //4.4创建Vuex实例对象
var store=new Vuex.Store({
  state:{count:0},//购物车中商品数量
  mutations:{
    increment(state,c){
      state.count+=parseInt(c)
    },
    substract(state){
      state.count--
    }
  },
  getters:{
    optCount:function(state){
      return state.count
    }
  }
});
//5.注册Vue实例


new Vue({
  router,
  render: h => h(App),store
}).$mount('#app')

