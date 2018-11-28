<template>
   
</template>

<script>
export default {
    data(){return {
        list:[
            {id:1,title:"小辣椒",now:"99.9",old:"1999.01",q:2},
             {id:2,title:"中辣椒",now:"19.9",old:"897.17",q:22},
             {id:3,title:"大辣椒",now:"29.9",old:"514991",q:71}
             ]
    }},
    methods:{
            getDetail(id){
                //参数:商品id
                //console.log(id)
                this.$router.push("/home/goodsinfo/"+id)
            }
        }
}
</script>

<style>
    
</style>
