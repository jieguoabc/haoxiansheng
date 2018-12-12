<template>
    <div class="app-goodinfo">
        <!-- 1.商品轮播区域 -->
        <div class="mui-card">
			<div class="mui-card-footer mui-card-media">
                <router-link to="/home"><span class="mui-icon mui-icon-arrowleft"></span></router-link>
				<a >商品详情</a>
				<a ><span class="mui-icon mui-icon-redo"></span></a>
			</div>
			<div class="mui-card-content" >
				<div class="mui-card-content-inner">
                    <swiper-box :list="info" ></swiper-box>
				</div>
			</div>
            <!-- title -->
			<div class="mui-card-footer">
				<p>{{product.title}}</p>
			</div>
            <div class="mui-card-footer">
				<h5>￥{{product.price}}</h5>
                <p>已售<span>{{product.sold>=10000?'10000+':'product.sold'}}</span></p>
			</div>
            <!-- 按钮 -->
            <div class="mui-card-footer" >
				<div class="mui-card-content-inner">
                    <div>
                        数量：
                       	<div class="mui-numbox" data-numbox-min='1' data-numbox-max='9'>
					    <button class="mui-btn mui-btn-numbox-minus" type="button" @click="goodSub">-</button>
					    <input id="test" class="mui-input-numbox" type="number" v-model="val" value="1"/>
					    <button class="mui-btn mui-btn-numbox-plus" type="button" @click="goodAdd">+</button>
				        </div>
                        <span>当前库存：{{product.count}}件</span>
                    </div>
				</div>
			</div>
		</div>
        
        <!-- 商品详情 -->
        <div class="app-detail">
            <div class="mui-card">
                <div class="mui-card-header mui-card-media">
                    <div class="mui-media-body">
                        <div class="navbar">
                            <div :class="DetailSeleted" @click="getDetail"><span>商品详情</span> </div>
                            <div :class="EvalSeleted" @click="getEval"><span>评价</span> </div>
                        </div>

                <!-- tab-container -->
                        <div class="evaluate">
                            <div v-if="i==50">
                                <img v-for="item in detail" :src="item.detail" :key="item.id" alt="">
                            </div>
                            <div v-else if="i!=50">
                                <p>暂无评论</p>
                            </div>
                        </div>
                    </div>
                </div>
		    </div>
                    <!-- 购物车、立即购买 -->
        
        </div>       
        <div class="fix-footer">
            <div  class="icon">
                <router-link to="/shop"> <p class="mui-icon mui-icon-email mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">{{item}}</span></p></router-link>
            </div>
            <div class="cart">
                <a href="#" @click.prevent="addCartTo">加入购物车</a>   
            </div>
            <div class="buy">
                <a href="#">立即购买</a>   
            </div>
        </div>

    </div>
</template>

<script>
// 引入轮播图组件
import swiper from "../sub/swiper.vue";


//引入Toast
import {Toast} from "mint-ui"
export default {
    data(){ return {
        info:[],
        product:{},
        detail:[],
        val:1,
        DetailSeleted:"is-selected",
        EvalSeleted:"",
        i:50,
        item:""
    }},
    components:{
        "swiper-box":swiper
    },
    methods:{ 
        getGoodInfo(){
            //商品列表将商品id传递商品详情
            this.$http.get("goodinfo?lid="+this.$route.params.id).then(result=>{
               this.product=result.body.product
               var res=result.body.pics
               console.log(res)
                for(var p of res){
                    if(p.img_url!=""){
                        this.info.push(p)
                    }
                }
                for(var d of res){
                    if(d.detail!=""){
                        this.detail.push(d)
                    }
                }
                })
        },
        goodSub(){
            if(this.val>1)
            this.val--
        } , 
        goodAdd(){
            if(this.val<=998)
            this.val++
        },
        addCartTo(){
            //console.log("添加至购物车")
            var id=this.$route.params.id;
            var count=this.val;
            //console.log(id,count)
            this.$http.get("add?pid="+id+"&count="+count).then(result=>{
                console.log(result)
                if(result.body.ok==1){
                    this.item++
                }
            })
        }, 
        getDetail(){
            this.EvalSeleted=""
            this.DetailSeleted="is-selected";
            this.i=50;
        },
        getEval(){
            this.DetailSeleted="";
            this.EvalSeleted="is-selected"
            this.i=1;
        },
        getItems(){                 
            this.$http.get('items').then((result)=>{
           this.item=result.body.length
        })
        }
    },
    created(){  
          this.getItems()
          this.getGoodInfo()
        console.log(this.$route.params.id) 
  },
      

    }


</script>

<style>
.app-container .app-goodinfo{
    background-color:#f2f2f2;
}
 /* 轮播图 */
.app-container .app-goodinfo .mui-card .mui-card-content .mint-swipe{
    height: 375px;
}
.app-container .app-goodinfo .mui-card{
    margin: 0;
    margin-bottom:10px;
}
.app-container .app-goodinfo .mui-card .mui-card-content-inner,
.app-container .app-goodinfo .mui-card .mui-card-header{
    padding:0;
}
.app-container .app-goodinfo .mui-card .mui-card-footer a{
    color:black;
    font-family: "宋体";
    font-size: 12px;  
}
/* 购买数量 */
.app-container .app-goodinfo .mui-card .mui-card-footer:last-child{
    padding:10px 0;
}

.app-container .app-goodinfo .mui-card .mui-card-footer{
    padding:5px;
}
.app-container .app-goodinfo .mui-card .mui-card-footer p{
    color:black;
}
.app-container .app-goodinfo .mui-card .mui-card-footer h5{
    color:red;
}
/* 详情 */
.app-container .app-goodinfo  .mint-tab-item .mint-tab-item-label{
    margin:0 20px;
    color:#8FBA44;
    font-size:14px;
}
.app-container .app-goodinfo .mui-card .mui-media-body{
margin:0;
padding-bottom:40px;
}

.app-container .app-goodinfo .mui-card .mui-media-body .is-selected {
    padding-bottom: 10px;
    border-bottom: 4px solid #8FBA44;
}
/* 商品详情 */
.app-container .app-goodinfo .app-detail .mui-card{
    margin:0;
}
.app-container .app-goodinfo .app-detail .mui-card .mui-media-body .navbar{
    display:flex;
    justify-content: space-around;
    padding-top:20px;
    border-bottom:1px solid #ccc;
    margin-bottom: 10px;
}
.app-container .app-goodinfo .app-detail .mui-card .mui-media-body .navbar div{
  padding-bottom: 10px;
    color:#8FBA44;
    width:100px; 
    text-align: center;
}
.app-container .app-goodinfo .app-detail .mui-card .mui-media-body .navbar div .is-selected{
    border-bottom: 4px solid #8FBA44; 
}
.app-container .app-goodinfo .app-detail .mui-card .mui-media-body .mint-tab-container p{
    text-align: center ;
    padding:20px
}
/* 商品详情图片 */
.app-container .app-goodinfo .mui-card .mui-media-body  img{
    width:100%;
}
.app-container .app-goodinfo .app-detail .mui-card .mui-media-body .evaluate{
    text-align: center;
    font-size: 14px;
    padding:5px 0 40px 0;
}
/* 购物车  立即购买 */
.app-container .app-goodinfo .fix-footer{
    max-width:500px;
    min-width: 320px;
    background-color: #fff;
    display: flex;
    position: fixed;
    z-index: 10;
    bottom:0;
    width:100%;
    border-top:1px solid #ccc;
    color:rgb(141, 138, 138);
    font-size:14px;
}
.app-container .app-goodinfo .fix-footer .cart,.app-container .app-goodinfo .fix-footer .buy{
    width:40%;
}
.app-container .app-goodinfo .fix-footer .icon{
    width:20%;
    text-align: center;
    padding-top:10px;
}
.app-container .app-goodinfo .fix-footer .icon .mui-badge{
    position: absolute;
    left:14%;
}
.app-container .app-goodinfo .fix-footer .cart a{
    border-top:1px solid #8FBA44;
    border-left:1px solid #8FBA44;
    color:#8FBA44;
    text-align: center;
    display:block;
    padding:14px 0;
}
.app-container .app-goodinfo .fix-footer .buy a{
    background-color: #8FBA44;
    color:white;
    display:block;
    text-align: center;
    padding:14px 0;
    
}
</style>
