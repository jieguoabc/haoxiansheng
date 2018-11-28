src/components/testContainer.vue
<template>
    <div id="app-testContainer">
        <h1>testContainer.vue</h1>
        <h2>生命周期</h2>
        <h2>当前vue 实例创建后自动触发事件</h2>
        <h2>事件调用一些函数（钩子函数）</h2>
        <input type="button" value="修改" @click="msg='ok'">
        <p id="h3">{{msg}}</p>
    </div>    
</template>
<script>
export default {
    data(){
        return{msg:"脚手架"}
    },
    methods:{
        show(){
            console.log("执行 show 方法")
        }
    },
    beforeCreate(){
        //生命周期第一个函数，实例被创建之前，会执行
        //注意：执行函数时  data 和methods还没有初始化
       // console.log(this.msg)   //undefined
       // this.show()   //报错
    },
    created(){
        //生命周期第二函数，实例被创建之后
        //注意：执行函数时 data和method初始化好了
        //最早操作data和methods
       // this.show()
      //  console.log(this.msg)
    },
    beforeMount(){
        //生命周期第三函数，模板已经在内存中编辑完成，但是尚未把模板渲染到页面
        var h3=document.getElementById("h3")
        //console.log(h3)   //null
       // console.log(h3.innerText)  //报错
    },
    mounted(){
        //生命周期第四个函数，模板已经在内存中编辑完成，
        //把模板渲染页面结束
        //mounted实例创建最后一个生命周期函数，当执行完mounted表示实例已经完全创建好了，如果没有其他的操作，
        var h3=document.getElementById("h3")
        console.log(h3)
        console.log("4:"+h3.innerText)
    },
    beforeUpdate(){
        //第二个事件
        //当执行beforeUpdate  页面中显示数据是旧的   而  dataz中数据是新的
        console.log("内存中Data变量"+this.msg)
        var h3=document.getElementById("h3");
        console.log("模板中数据"+h3.innerHTML)
    },
    updated(){
        console.log("6:内存中的Data:"+this.msg)
        var h3=document.getElementById("h3")
        console.log("6模板中数据:"+h3.innerHTML)
    }
}
</script>
<style>

</style>
