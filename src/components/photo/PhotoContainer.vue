<template>
    <div class="app-photo">
        <div class="mui-card" >
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
                    <ul class="photo-list">
                        <li v-for="item in list" :key="item.id">
                            <img v-lazy="item.img_url"  alt="">
                        </li>
                    </ul>		
				</div>
			</div>
		</div>	 
    </div>
</template>

<script>

export default {
    data(){return {
        list:[]
    }},
    methods:{
        getImageList(){
            this.$http.get("imagelist").then(result=>{
                this.list=result.body
            })
        }
    },
    created(){
        this.getImageList()
    }
}
</script>

<style>
.photo-list{
    list-style: none;
    background: #333;
    padding-left:0
}
 .app-photo .photo-list img{
     width:100%
 } 
 /* lazyload组件专用样式 */
 .photo-list li img[lazy=loading]{
     width:100%;
     height:100px;
     margin:auto;
 }  
</style>
