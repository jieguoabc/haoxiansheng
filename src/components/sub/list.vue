<template>
    <div class="app-goodslist ">
        <div class="goods-item" v-for="item in list" :key="item.lid" @click="getDetail(item.lid)">
            <img :src="item.img_url" alt=""  >
            <p class="title">{{item.title}}</p>
            <p class="price">￥{{item.price}}</p> 
        </div>       
    </div>
</template>

<script>
export default {
    data(){return{}},
    props:["list"],
    methods:{
        getDetail(lid){
            //编程式跳转方式
            //this.$router.push("/home/shop?id=15")
            this.$router.push("/home/goodsinfo/"+lid)           
        }
    }
}
</script>

<style>
     /* 商品清单 */
    .app-homeContainer .app-goodslist{
        display:flex;  /*最外层设置弹性布局*/
        flex-wrap:wrap; /*子元素换行*/
        justify-content: space-between; /*两端对齐*/
        padding:7px;
        background-color:#F2F2F2;
    }
    .app-homeContainer .app-goodslist .goods-item{
        width:49%;
        margin:4px 0;
        padding:2px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background: white;
    }
    .app-homeContainer .app-goodslist .goods-item img{
        width:100%;
    }
    .app-homeContainer .app-goodslist .goods-item  p.title{
        font-size: 12px ;
        font-family: "宋体";
        color:black;
    }
    .app-homeContainer .app-goodslist .goods-item .price{
        color:red;
        font-size:18px;
         margin-left:10px;
         font-weight: bold;
    }
</style>
