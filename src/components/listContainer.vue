<template>
    <div id="app-list">
        <h1>用户列表</h1>
        <table>
            <tr>
                <th>编号</th>
                <th>姓名</th>
                <th>年龄</th>        
            </tr>
            <tr v-for="item in list" :key="item.id">
                <td>{{item.id}}</td>
                <td>{{item.name}}</td>
                <td>{{item.age}}</td>
            </tr>
        </table>
    </div>
</template>
<script>
export default {
    data(){
        return{list:[{id:1,name:"tom",age:23},{id:2,name:"jerry",age:21},{id:3,name:"marry",age:13}]}
    }
}
</script>
<style>
   th,td{
        border:1px solid red
    }
</style>

