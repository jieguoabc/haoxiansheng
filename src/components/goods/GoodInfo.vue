<template>
    <div class="app-goodinfo">
        <!-- 1.商品轮播区域 -->
        <div class="mui-card">
			<div class="mui-card-footer mui-card-media">
                <a><span class="mui-icon mui-icon-arrowleft"></span></a>
				<a >商品详情</a>
				<a ><span class="mui-icon mui-icon-redo"></span></a>
			</div>
			<div class="mui-card-content" >
				<div class="mui-card-content-inner">
                    <swiper-box :list="info"></swiper-box>
				</div>
			</div>
            <!-- title -->
			<div class="mui-card-footer">
				<p>{{product.title}}</p>
			</div>
            <div class="mui-card-footer">
				<h5>￥{{product.price}}</h5>
                <p>已售<span>{{product.sold}}</span></p>
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
        <mt-navbar v-model="selected">
        <mt-tab-item id="1" :class="green-border">option A</mt-tab-item>
        <mt-tab-item id="2">option B</mt-tab-item>
        </mt-navbar>

<!-- tab-container -->
<mt-tab-container v-model="selected">
  <mt-tab-container-item id="1" >
    <mt-cell v-for="n in 10" :title="'content ' + n" />
  </mt-tab-container-item>
  <mt-tab-container-item id="2">
    <mt-cell v-for="n in 4" :title="'content ' + n" />
  </mt-tab-container-item>

</mt-tab-container>


        <div class="mui-card">
			<div class="mui-card-header mui-card-media">
                <div class="mui-media-body">
					<p>发表于 2016-06-30 15:30</p>
				</div>
			</div>
			<div class="mui-card-content" >
                <img src="" alt="" width="100%"/>
			</div>
			<div class="mui-card-footer">
				<a class="mui-card-link">Like</a>
				<a class="mui-card-link">Comment</a>
				<a class="mui-card-link">Read more</a>
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
         val:1,
         selected:""
    }},
    components:{
        "swiper-box":swiper
    },
    methods:{ 
        getGoodInfo(){
            //商品列表将商品id传递商品详情
            this.$http.get("goodinfo?id="+this.$route.params.id).then(result=>{
               this.product=result.body.product
              var res=result.body.pics
                for(var p of res){
                    if(p.img_url!=""){
                        this.info.push(p)
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
            this.$http.get("addCart?pid="+id+"&count="+count).then(result=>{
                if(result.body.code == 1){
                    //1.4更新购物车中商品数量
                    //修改Vuex中共享数据
                    this.$store.commit("increment",count)
                }else{
                    Toast(result.body.msg)
                }
            })
        }     
    },
    created(){  
        this.getGoodInfo()
        console.log(this.$route.params.id)
    }

}
</script>

<style>
.app-container .app-goodinfo{
    background-color:#f2f2f2;
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
 /* 轮播图 */
.app-container .app-goodinfo .mui-card .mui-card-content .mint-swipe{
    height: 375px;
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
    padding-bottom: 10px;
    color:#8FBA44;
    font-size:14px;
    border-bottom: 4px solid #8FBA44;
}
.app-container .app-goodinfo  .mint-tab-item-label.mint-tab-item{
    border-bottom: 1px solid #f2f2f2;
    padding-bottom: 0;
}
</style>
