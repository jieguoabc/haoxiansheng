<template>
 <div class="app-container">
    <!-- 顶部导航栏 -->
    <!-- 容器显示不同组件 -->
    <router-view></router-view>
	  <!-- 底部导航栏 -->


 </div>
</template>

<style>
   .app-container{
    max-width:500px;
    min-width: 320px;
    margin: 0 auto;
    margin-bottom: 50px;
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
