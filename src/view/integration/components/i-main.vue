<template>
	<div class="content">
		<div class="main">
			<div class="main-tab">
				<Tabs value="name1">
					<TabPane label="标签一" name="name1">标签一的内容</TabPane>
					<TabPane label="标签二" name="name2">标签二的内容</TabPane>
					<TabPane label="标签三" name="name3">标签三的内容</TabPane>
				</Tabs>		
			</div>
			<div class="main-history">
				<iRight></iRight>
			</div>
		</div>
		<iFooter/> 
		
	</div>
	
</template>

<script>
	import iFooter from "@/view/integration/components/i-footer.vue";
	import iRight from "@/view/integration/components/i-right.vue";
	export default{
		name:"imain",
		components:{
			iFooter,
			iRight
		},
		data(){
			return {}
		}
	}
</script>

<style scoped="scoped">
	.content {
	    overflow: auto;
	    height: 100%;
	}
	.main{
		height: 77%;
		/* background-color: #01AAED; */
	}
	.main-tab{
		width: 85%;
		background-color: #01AAED;
		height: 100%;
		display: inline-block;
	}
	.main-history{
		width: 15%;
		background-color: #3D9CE4;
		float: right;
		display: inline-block;
		height: 100%;
	}
</style>
