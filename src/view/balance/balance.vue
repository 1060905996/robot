<template>
	<div>
		<Input v-model="num"  placeholder="请求次数" style="width: 120px" />
		<i-button @click="query">请求</i-button>			
		<div v-for="(item) in resultList">
			{{item.id}} : <Progress :percent="item.percent" :status="item.color" />
		</div>
		
	</div>
</template>
<script>
export default{
	data:function(){
		return {
			num:'20',
			result:{},
			resultList : [],
		}
	},mounted() {
		console.log(123)
	},
	methods:{
		query(){
				var times = this.num,count=1;
				this.result={};
				for(var i =1 ;i <=times;i++){
					this.$http.post('http://localhost:8180/balance').then(function(data){
						var id = data.body.instanceId;
						var num=this.result[id];
						if(num==undefined){
							num = 1;
						}else{
							num++;
						}
						this.result[id]=num;
						count++;
						if(count==times){
							this.view(count);
							console.log(this.result);
						}
								
					}); 
				}
				
		},view(count){
			var result = this.result;
			this.resultList=[];
			for(var key in result){
				var num = result[key];
				if (num==undefined || isNaN(num)) num = 0;
				this.resultList.push({id:key+"  请求次数:"+num,percent:num/count*100,color:"normal"});
				
			}
		}
	},
}
</script>

<style>

</style>
