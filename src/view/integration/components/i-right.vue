<template>
	<div class="right-content">
       <Collapse v-for="(obj,index)  in queryHistory" :key="index">
       	<Panel :name="index+1+''">
       		{{obj.query}}
       		<p slot="content">{{obj.response}}</p>
       	</Panel>
       </Collapse>		
	</div>
</template>

<script>
	export default{
		data(){
			return {
			queryHistory:[{"query":"问题1","response":""},{"query":"问题2","response":""},{"query":"问题3","response":""},{"query":"问题4","response":""}]	
			}
			
		}
	}
</script>

<style>
	.right-content{
		
	}
</style>
