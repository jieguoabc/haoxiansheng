<template>
    <div class="app-newInfo">
        <h3>{{info.title}}</h3>
        <div>{{info.content}}</div>
        <!-- 保存评论子组件 3：调用子组件 -->
        <comment-box :id="this.id"></comment-box>
    </div>
</template>
<script>
//引入子组件
import comment from "../sub/comment.vue"
export default {
    data(){return {
        info:{},id:this.$route.query.id
    }},
    created(){
       // console.log(this.$route.query.id)
       this.getNewsInfo()
    },
    methods:{
        getNewsInfo(){
            //发送ajax请求获取当前新闻详细信息
            this.$http.get("http://127.0.0.1:3000/newsinfo")
            .then(result=>{
               // console.log(result)
            this.info=result.body
        })
        }
    },
    //注册子组件
    components:{
        "comment-box":comment
    }
    
}

</script>
<style>

</style>


