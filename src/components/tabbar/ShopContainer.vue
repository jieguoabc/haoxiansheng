<template>
    <div class="app-shop">
        <!-- 1.图片轮播 -->
        <swiper-box :list="imglist"></swiper-box> 
            <!-- 2.商品列表 -->
            <div class="mui-card">
				<div class="mui-card-header">商品列表</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<!-- 2.1mui 左侧图片 右侧文字 -->
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell mui-media"  v-for="(item) in cartlist" :key="item.id">
                            <a href="javascript:;">
                                <img class="mui-media-object mui-pull-left" src="">
                                <div class="mui-media-body">
                                    {{item.title}}
                                    <div class='mui-ellipsis'>
                                        <span>{{item.price}}</span>
                                        <div class="mui-numbox" data-numbox-min='1' data-numbox-max='9'>
                                            <button class="mui-btn mui-btn-numbox-minus" type="button" @click="cartSub(item.id)">-</button>
                                            <input id="test" class="mui-input-numbox" type="number" :value="item.count" />
                                            <button class="mui-btn mui-btn-numbox-plus" type="button" @click="cartAdd(item.id)">+</button>
                                        </div>
                                        </div>
                                </div>
                            </a>
                        </li>
                    </ul>
                        <!-- 2.3mui 数字按钮 -->

					</div>
				</div>
				<div class="mui-card-footer">小计<span class="count">{{getSubTotal}}</span></div>
			</div>
    </div>
</template>
<script>
import swiper from "../sub/swiper.vue";
export default {
    data(){return{
       cartlist:[],//购物车列表
        imglist:[],
       
    }},
    computed:{//计算属性
        getSubTotal(){
         //计算商品累计和并返回
         //1.创建临时变量
         //2.创建循环
         //3.计算累加和
         //4.返回累加结果
         var sum=0;
         for(var item of this.cartlist){
             sum+=item.price*item.count
         }  
         return sum 
        }       
    },
    methods:{
        cartSub(id){
           //console.log("-"+id)
           //1.获取数组中每个元素
           for(var item of this.cartlist){
            //2.判断参数中id与当前元素id是否相同
            if(item.id==id){
            if(item.count<2)return;
            //3.当前元素数量加1
            item.count--
            break;
            }
           }
        },
        cartAdd(id){
            //console.log("+"+id)
            for(var item of this.cartlist){
            //2.判断参数中id与当前元素id是否相同
            if(item.id==id){
            //3.当前元素数量加1
            item.count++
            break;
            }
           }
        },  
        getImageList(){
            this.$http.get("imagelist").then(result=>{
                this.imglist=result.body
            })
        },
        getCartList(){
            this.$http.get("shopCart").then(result=>{
                this.cartlist=result.body
            })
        }
    },
    created(){ 
        this. getImageList()
        this. getCartList()
        //console.log(this.$route.query.id)
        //console.log(this.$route.params.id)
    },
    components:{
        "swiper-box":swiper
    }

}
</script>

