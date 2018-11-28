<template>
    <div class="app-newslist">
        <h3>新闻列表</h3>
		<ul class="mui-table-view">	
			<li v-for="item in list" :key="item.id" class="mui-table-view-cell mui-media">	
				<router-link :to="'/home/newsinfo?id='+item.id">	
				    <img class="mui-media-object mui-pull-left" :src="item.img_url">		
				    <div class="mui-media-body">		
							{{item.title}}
				        <p class='mui-ellipsis'><span>{{item.ctime|datetimeFilter}}</span><span>点击: {{item.point}} 次</span></p>			
				    </div>		
				</router-link>	
			</li>
		</ul>
        <mt-button type="primary" size="large" @click="getMore()" >加载更多</mt-button>
    </div>
</template>
<script>
export default {
    data(){
        return{
            list:[],
            pageIndex:0,//属性显示当前页数0
            pageSize:5,//页大小
            hasMore:true,//是否存在下一页数据
            pageCount:2//总页数
        }
    },
    methods:{
        getMore(){
            this.pageIndex++;
            //判断是否有下一页数据
            this.hasMore=this.pageIndex <= this.pageCount
            //如果没有下一页数据函数停止
            if(!this.hasMore){return}
            this.$http.get( "http://127.0.0.1:3000/newslist"+"?pno="+this.pageIndex+"&pageSize="+this.pageSize)
                .then(result=>{
                   //console.log(result)
                   var rows=this.list.concat(result.body.data)
                   this.list=rows
                   //保存总页数
                   this.pageCount=result.body.pageCount
            })
        },
    },
    created(){
        this.getMore()
    }
}
</script>
<style>
.app-newslist .mui-table-view li .mui-media-body .mui-ellipsis{
    display:flex;
    font-size:12px;
    color:#226aff;
    justify-content: space-between
}
</style>


