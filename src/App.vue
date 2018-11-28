<template>
 <div class="app-container">
    <!-- 顶部导航栏 -->
    <!-- 容器显示不同组件 -->
    <router-view></router-view>
	  <!-- 底部导航栏 -->
    <nav class="mui-bar mui-bar-tab">
		<router-link to="/home" class="mui-tab-item mui-active">
			<span class="mui-icon mui-icon-home"></span>
			<span class="mui-tab-label">首页</span>
		</router-link>
        <router-link to="/home/login" class="mui-tab-item" >
			<span class="mui-icon mui-icon-bars"></span>
			<span class="mui-tab-label">分类</span>
		</router-link>
		<router-link to="/shop" class="mui-tab-item" href="#tabbar-with-chat">
			<span class="mui-icon mui-icon-email mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">{{$store.getters.optCount}}</span></span>
			<span class="mui-tab-label">购物车</span>
		</router-link>
		<a class="mui-tab-item" href="#tabbar-with-map">
			<span class="mui-icon mui-icon-contact"></span>
			<span class="mui-tab-label">我的</span>
		</a>
	</nav>

 </div>
</template>

<style>
   .app-container{

     padding-bottom:50px;
     overflow-x:hidden;
     background-color:#fff
   }

 .mui-bar-tab .mui-tab-item-tao.mui-active {
    color: #007aff;
 }
.mui-bar-tab .mui-tab-item-tao {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item-tao .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-tao .mui-icon~.mui-tab-label {
   font-size:11px;
   display:block;
   overflow:hidden;
   text-overflow:ellipsis;

}
</style>
