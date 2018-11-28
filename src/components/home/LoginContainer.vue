<template>
    <div class="app-login">
        <h3>这是登录页面</h3>
        <form action="">
            用户名： <input type="text"  name="uname" v-model="unameval">
            密码：<input type="password" name="upwd" v-model="upwdval">
            <input type="button" id="btn" value="登录" @click="btnSubmit">
        </form>
       
    </div>
</template>

<script>
import {Toast} from "mint-ui"
export default {                                                                                                      
    data(){return {
        unameval:"",
        upwdval:""
    }},
    methods:{
        btnSubmit(){
            this.$http.get("login?uname="+this.unameval+"&upwd="+this.upwdval).then(result=>{
               // console.log(result)
               if(result.body.code==1){
                Toast(result.body.msg);
                this.$router.push("/home")
               }else{
                 Toast(result.body.msg);  
               }
            })
        }
    },

}
</script>

<style>

</style>
