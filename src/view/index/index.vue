<template>
	<div style="margin-right: 5%;">
		<Row type="flex" justify="center" class="code-row-bg">
			<Col span="8">
			<Card style="width:320px">
				<div style="text-align:center">
					<img src="../../assets/logo.png">
					<h3>A high quality UI Toolkit based on Vue.js</h3>
				</div>
			</Card>
			</Col>
		</Row>

		<Row :gutter="20">
			<i-col :xs="12" :md="8" :lg="4" offset="2" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px;padding-bottom: 10px;">
				<infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
					<p>
					    <router-link to='/gram'>{{ infor.title }}</router-link>
					</p>
				</infor-card>
			</i-col>
		</Row>
	</div>
</template>

<script>
	import InforCard from '@/components/info-card'
	export default {
		name: 'index',
		components: {
			InforCard,
		},
		data() {
			return {
				msg: 'Welcome to Your Vue.js App',
				inforCardData: [{
						title: '新增用户',
						icon: 'ios-outlet-outline',
						count: 803,
						color: '#2d8cf0'
					},
					{
						title: '累计点击',
						icon: 'md-locate',
						count: 232,
						color: '#19be6b'
					},
					{
						title: '新增问答',
						icon: 'md-help-circle',
						count: 142,
						color: '#ff9900'
					},
					{
						title: '分享统计',
						icon: 'md-share',
						count: 657,
						color: '#ed3f14'
					},
					{
						title: '新增互动',
						icon: 'md-chatbubbles',
						count: 12,
						color: '#E46CBB'
					},
					{
						title: '新增页面',
						icon: 'md-map',
						count: 14,
						color: '#9A66E4'
					}
				],
			}
		}
	}
</script>

<style>

</style>