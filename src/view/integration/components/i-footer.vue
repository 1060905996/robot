<template>
	<div class="content"> 
		<div class="footer-box">
			当前事件
			<div class="footer-box-context">
				参数: <p></p>
				结果: <p></p>
			</div>
		</div>
		
		<div class="footer-box">
			当前事件
			<div class="footer-box-context">
				参数: <p></p>
				结果: <p></p>
			</div>
		</div>
		
		<div class="footer-box">
			当前事件
			<div class="footer-box-context">
				参数: <p></p>
				结果: <p></p>
			</div>
		</div>
		
	</div>
</template>

<script>
	export default{
		name:"ifooter",
		data(){
			return {
				  columns1: [
                    {
                        title: 'Name',
                        key: 'name'
                    }],
				  data1: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    }],
			}
		}
	}
</script>

<style scoped="scoped">
	.content {
	    overflow: hidden;
	    height: 20%;
	}
	
	.footer-box{
		text-align: center;
		width: 30%;
		height: 100%;
		margin: 5px 10px 10px 0;
		background-color: #13C2C2;
		display: inline-block;
	}
	.footer-box-context{
		height: 100%;
		background-color: #6FBFF0;
		text-align: left;
	}
</style>
