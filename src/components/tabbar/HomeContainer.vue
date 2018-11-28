<template>
    <div class="app-homeContainer">
        <!-- 顶部导航1： 标题-->
         <div> <img   src="../../img/logo.png" alt=""> </div>
        <!-- 搜索 -->    
        <input type="text" value="" placeholder="请输入搜索关键词" />
        <!-- 轮播图2： -->
        <mt-swipe :auto="2000">
            <mt-swipe-item v-for="item in list" :key="item.id">
                <img  :src="item.img_url" alt="">
            </mt-swipe-item>
        </mt-swipe>
        <div class="serve">
            <p><img src="http://127.0.0.1:3000/img/icon/time24.png" alt=""><span>24小时内无忧退换</span></p>
            <p><img src="http://127.0.0.1:3000/img/icon/send.png" alt=""><span>满19免配送费</span></p>
            <p><img src="http://127.0.0.1:3000/img/icon/speed.png" alt=""><span>极速1小时达</span></p>
        </div>
        <!-- 导航行-->
		<ul class="mui-table-view mui-grid-view mui-grid-9">
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                <router-link to="/home/newslist">
                    <img src="http://127.0.0.1:3000/img/class.png" alt="" >            
                    <div class="mui-media-body">商品分类</div>
                </router-link>
            </li>            
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                <!-- <a href="#" @click.stop.prevent="jumpShop()"> -->
                    <router-link to="/home/goodslist">
                        <img src="http://127.0.0.1:3000/img/order.png" alt="">
                        <div class="mui-media-body">商品</div>
                    </router-link>
                <!-- </a> -->
            </li>
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                <a href="#">
                    <img src="http://127.0.0.1:3000/img/help.png" >
                    <div class="mui-media-body">点餐</div>
                </a>
            </li>                 
		</ul> 
        <!--今日爆品-->
        <div class="fruit">
			<p><img src="http://127.0.0.1:3000/img/icon/tuijian.png" alt=""><span>今日爆品</span></p>
            <p>更多&gt;&gt;</p>
        </div>
        <!-- 商品列表-水果 -->
        <list-box :list="fruitList"></list-box>
        <!--百味坚果-->
        <div class="fruit">
			<p><img src="http://127.0.0.1:3000/img/icon/tuijian.png" alt=""><span>百味坚果</span></p>
            <p>更多&gt;&gt;</p>
        </div>
        <!-- 商品列表-坚果 -->
        <list-box :list="nutList"></list-box>

    </div>
</template>
<script>
import list from "../sub/list.vue";
export default {
    data(){
        return {
            list:[],//创建data属性保存数据
            value:"1",
            fruitList:[],
            nutList:[],
            }
    },
    components:{
        "list-box":list
    },
    methods:{
        getImage(){
            //发送ajax请求并且获取图片列表并且显示
            var url="http://127.0.0.1:3000/imagelist";
            this.$http.get(url).then((result)=>{
                this.list=result.body//获取返回数据保存到res中
                //console.log(result.body)
            })
        },
        getList(){
            var url="http://127.0.0.1:3000/goods";
            this.$http.get(url).then(res=>{
                this.fruitList=res.body.slice(0,28)
                this.nutList=res.body.slice(28)
            })
        },


    },
    created(){
        this.getImage();
        this.getList();
    }
}
</script>
<style>
    .app-homeContainer{
        max-width:500px;
        min-width: 320px;
        margin: 0 auto;
    }
    .app-homeContainer>div:first-child{
      background: #fff;
      border-bottom: 1px solid #ddd;
      padding-bottom: 15px;
      margin-bottom: 10px;
      
    }
    .app-homeContainer>div>img{
        display: block;
        margin:auto;
    }
    .app-homeContainer>input{
       display:block;
       width:90% !important;
       margin: auto;
       padding-left:30px !important;
       border-radius: 40px !important;
       font-size:12px !important;
       border:0 !important;   
       background-color:#F7F7F7 !important;
       height: 34px !important;
        background: url(http://127.0.0.1:3000/img/search.jpg) no-repeat;
        background-position: 5px
    }
    /* 图片轮播设置高度 */
    .app-homeContainer .mint-swipe{
        height:250px;
    }
    .app-homeContainer .mint-swipe img{
        width:100%;
    }
    .app-homeContainer .mint-swipe-indicator{
        background-color:rgb(252, 152, 152);
        opacity: .5;
    }
    .app-homeContainer .mint-swipe-indicator.is-active{
        background-color:red;
        opacity: .5;
    }
    /* 服务 */
    .app-homeContainer .serve{
        display:flex;
        justify-content: space-around;
        border-bottom: 1px solid #ddd;
        margin-top:10px;
    }
    .app-homeContainer .serve p{
        display:flex;
        align-items: center;
    }
    .app-homeContainer .serve p span{
        padding-left: 5px;
        color:black;
        font-size: 10px;
    }
    /*三格样式*/
    .app-homeContainer .mui-table-view.mui-grid-view.mui-grid-9{
    background:#fff;
    border:0
    }
    .app-homeContainer .mui-table-view.mui-grid-view.mui-grid-9 li{
    border:0
    }
    .app-homeContainer .mui-grid-view.mui-grid-9 img{
      width:40px;
      height:40px;
    }
    .app-homeContainer .mui-table-view.mui-grid-view.mui-grid-9 div.mui-media-body{
     font-size:13px;
     }
     /* 今日爆品 */
    .app-homeContainer .fruit{
        display: flex;
        justify-content: space-between
     }
    .app-homeContainer .fruit p{
         display: flex;
         align-items: center;
     }
     .app-homeContainer .fruit p span{
         color:black;
     }
</style>

