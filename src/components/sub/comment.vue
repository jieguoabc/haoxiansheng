<template>
    <div class="app-comment">
        <h3>评论子组件</h3>
        <hr>
        <!-- 评论区域 -->
        <textarea  placeholder="请输入内容，最多120字" maxlength="120" v-model="msg"></textarea>
        <mt-button size="large" @click="postComment">发表评论</mt-button>
        <div class="cmt-list" >
            <div class="cmt-item" v-for="(item,i) in list" :key="item.id">
                <div class="cmt-info">第{{i+1}}楼 用户:{{item.user_name}}    发表时间：{{item.ctime|datetimeFilter}}</div>
                <div class="cmt-body">{{item.content}}</div>
            </div>
        </div>
        <mt-button size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
//单独引入Toast组件
import {Toast} from "mint-ui"
export default {
    data(){return{
        msg:"",//双向绑定用户的评论
        pageIndex:0,
        pageSize:5,
        list:[]
    }},
    props:["id"],
    methods:{
        getMore(){
           //1.页码自增
           this.pageIndex++
           //2.发送ajax  /getComment
           var p=this.pageIndex;
           var s=this.pageSize;
           var id=this.id;
           var url="getComment?id="+id+"&pno="+p+"&pageSize="+s
           //3.参数 id pno pageSize
           //4.获取返回数据保存list属性
            this.$http.get(url).then(result=>{
               //console.log(result)
               var row=this.list.concat(result.body.data);
               this.list=row
           })
           //5.显示模板中 
        },
        postComment(){
            //console.log(123)
            //1.获取新闻编号
            var nid=this.id
            console.log(nid)
            //2.获取评论内容
            var pmsg=this.msg
            //3.判断新闻评论的内容不能为空
            if(pmsg.trim().length==0){
                Toast("评论内容不能为空")
                return;
            }
            //4.发送post请求 
            var url="http://127.0.0.1:3000/postcomment"                      
            this.$http.post(url,{msg:pmsg,nid:nid}).then(result=>{
                Toast("发表成功")
                //考虑当前页码？
                this.pageIndex=0;
                this.list=[]
                //考虑list:[]
                this.getMore()
            })
            //5.获取服务器程序返回结果
            //6.提示用户评论成功
        }
    },
     created(){
         this.getMore()
     }  
}
</script> 

<style>
       .app-comment textarea{
       font-size:14px ;
       height:85px;
       margin:0
    }
    .app-comment .cmt-list{
        margin:15px 0;
    }
    .app-comment .cmt-list .cmt-item .cmt-info{
        line-height:30px;
        background:#ccc;
        font-size:14px;
    }
     .app-comment .cmt-list .cmt-body{
        line-height:35px;
       text-indent:2em;
    }
</style>

