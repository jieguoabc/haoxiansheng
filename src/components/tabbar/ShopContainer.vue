<template>
    <div class="app-shop">
        <!-- 顶部标题 -->
        <header class="mui-bar mui-bar-nav">
			<router-link to="/home" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></router-link>
			<h5 id="title" class="mui-title">购物车</h5>
		</header>
        <!-- 删除，全选 -->
        <div class="check">
			<div><input type="checkbox" @change="allCheck"  v-model="checkAll"/>全选</div>
            <button type="button" class="mui-btn mui-btn-danger mui-btn-outlined">
                <span class="mui-icon mui-icon-trash" @click="del()">删除</span>	
            </button>
        </div>
        <!-- 2.商品列表 -->
        <div class="cart-item">
            <div class="mui-card" v-for="(item) in cartlist" :key="item.id" id="item.iid">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<!-- 2.1mui 左侧图片 右侧文字 -->
                        <ul class="mui-table-view">
                            <li class="mui-table-view-cell mui-media"  >
                                    <div class="item-check"><input type="checkbox" @change="oneChange()" v-model="item.selected" /><img class="mui-media-object mui-pull-left" :src="item.img_url"></div>
                                    <div class="mui-media-body">
                                        <div>{{item.title}}</div>
                                        <div class='mui-ellipsis'>
                                            <div class="mui-numbox" data-numbox-min='1' data-numbox-max='9'>
                                                <button class="mui-btn mui-btn-numbox-minus" type="button" @click="cartSub(item.iid)">-</button>
                                                <input id="test" class="mui-input-numbox" type="number" :value="item.count" />
                                                <button class="mui-btn mui-btn-numbox-plus" type="button" @click="cartAdd(item.iid)">+</button>
                                            </div>
                                            
                                        </div>
                                        <div class="price">￥{{item.price}}</div>
                                    </div>
                            </li>
                        </ul>
                        <!-- 2.3mui 数字按钮 -->

					</div>
				</div>
				
			</div>
        </div>
           <div class="mui-card-footer">
               <p class="count">合计：<span>￥{{getSubTotal()}}</span></p>
               <button type="button" class="mui-btn mui-btn-danger">
					去结算
				</button>
            </div> 
    </div>
    
</template>
<script>
import swiper from "../sub/swiper.vue";
export default {
    data(){return{
       cartlist:[],//购物车列表
        imglist:[],
        checkAll:true
    }},
    methods:{
        cartSub(id){
           //console.log("-"+id)
           //1.获取数组中每个元素
           for(var item of this.cartlist){
            //2.判断参数中id与当前元素id是否相同
            if(item.iid==id){
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
            if(item.iid==id){
            //3.当前元素数量加1
            item.count++
            break;
            }
           }
        },  
        getCartList(){
            this.$http.get("items").then(result=>{
                this.cartlist=result.body
                console.log(result)
                // this.cartlist=result.body
                for(var i=0;i<result.body.length;i++){
                    this.cartlist[i].selected=true                
                }
            })
            console.log(this.cartlist)
        },
        del(){
            console.log(this.check)
            for(var i=0;i<this.cartlist.length;i++){
                if(this.cartlist[i].selected==true){
                    this.$http.get("update?iid="+this.cartlist[i].iid).then((res)=>{
                    console.log(res)
                    this.getCartList()  
                    });
                }
            }  
        },
        allCheck(){
            
            for(var i=0;i<this.cartlist.length;i++){
                this.cartlist[i].selected=this.checkAll
            }
        },
        oneChange(){
            var result=true
            for(var i=0;i<this.cartlist.length;i++){
                result=result&&this.cartlist[i].selected
            }
            this.checkAll=result  
        },
        getSubTotal(){
            var totalPrice=0;
                for(var tmp of this.cartlist){ 
                    if(tmp.selected){
                        totalPrice=totalPrice+tmp.price*tmp.count;
                    }
                }
                return totalPrice.toFixed(2)
        }
    },
    created(){ 
        this.getSubTotal()
        this. getCartList()
        //console.log(this.$route.query.id)
        //console.log(this.$route.params.id)
    },
    components:{
        "swiper-box":swiper
    }

}
</script>
<style>

.app-container .app-shop .mui-bar{
    position: relative;
     max-width:500px;
    min-width: 320px;
     padding-bottom:50px;
     overflow-x:hidden;
     background-color:#fff;
     box-shadow:none;
     border-bottom: 1px solid #ddd;
}
.app-container .app-shop .check{
    padding:10px;
    display: flex;
    justify-content: space-between;
    border-bottom:1px solid #ddd;
    
}
.app-container .app-shop .check button{
    height:30px;
    padding:6px 18px;
    
    border:1px solid rgb(192, 190, 190);
}
.app-container .app-shop .check div{
    font-size: 14px;
    display: flex;
    align-items: center;
}
.app-container .app-shop .check input{
    display: block;
    margin-right: 10px;
    width:20px;
    height: 20px;
}
.app-shop .mui-bar a,.app-shop .mui-bar h5,.app-container .app-shop .check div{
    color:black;
}
/* 商品列表 */
.app-container .app-shop .cart-item{
    background-color:rgb(247, 240, 240) ;
    padding-top:5px;
}
.app-container .app-shop .cart-item .mui-card{
    margin:0;
    margin-bottom: 5px;
}
.app-container .app-shop .cart-item .mui-card .mui-card-content-inner{
    padding-right: 0;
    padding-left:0;
}
.app-container .app-shop .cart-item .mui-card .mui-card-content-inner img{
    height: 100px;
    max-width: 100px !important;
}
.app-container .app-shop .cart-item .mui-card .mui-card-content-inner .mui-table-view-cell{
    display: flex;
    justify-content: space-between
}
.app-container .app-shop .cart-item .mui-card .mui-card-content-inner .mui-table-view-cell .mui-media-body{
    display: flex;
    flex-direction: column;
    justify-content:space-around;
    width:140px;
}
.app-container .app-shop .cart-item .mui-card .mui-card-content-inner .mui-table-view-cell .mui-media-body .price{
    color:red;
}
.app-container .app-shop .cart-item .mui-card .mui-card-content-inner .mui-table-view-cell .item-check{
    display: flex;
    align-items: center;
}
.app-container .app-shop .cart-item .mui-card .mui-card-content-inner .mui-table-view-cell .item-check input{
    display: block;
    margin-right: 10px;
    width:20px;
    height: 20px;
}
/* 合计 */
.app-container .app-shop .mui-card-footer .count span{
    color:red;
}
.app-container .app-shop .mui-card-footer{
    width:100%;
    background-color:#fff;
    position: fixed;
    bottom:0;
}
</style>

