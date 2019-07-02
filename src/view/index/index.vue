<template>
	<div>
		<Row type="flex" justify="center" class="code-row-bg">
			<Col span="8">
			<Card style="width:320px">
				<div style="text-align:center">
					<img src="../../assets/xiaowen.png">
					<h3>DMC 金融智脑</h3>
				</div>
			</Card>
			</Col>
		</Row>
		<Row :gutter="20">
			<i-col :xs="12" :md="8" :lg="4" offset="2" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px;padding-bottom: 10px;">
				<infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
					<p>
					    <router-link :to="{path:infor.url}">{{ infor.title }}</router-link>
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
				msg: 'Welcome to DMC Robot',
				inforCardData: [
					{
						title: '金融智脑',
						icon: ' iconfont icon-chongxinhuihua',
						color: '#19be6b',
						url :'/dialogue'
						
					},{
						title: '建行机器人',
						icon: 'ios-outlet-outline',
						color: '#2d8cf0',
						url :'/gram'
					} ,{
						title: '智脑客服',
						icon: ' iconfont icon-head-set',
						color: '#9A66E4',
						url :'/chat'
					},
					 /* {
						title: '分享统计',
						icon: 'customerservice_fill',
						count: 657,
						color: '#ed3f14',
						url : "/service"
					}, */
					/*
					{
						title: '负载均衡测试1',
						icon: 'md-help-circle',
						color: '#ff9900',
						url :'/balance',
					},{
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
					}*/
				],
			}
		},
		mounted() {
			console.log(this.config)
		},
		methods:{
			
		}
	}
</script>

<style>
    .i-icon {
        display: inline-block;
        font-family: 'custom-font' !important;
        speak: none;
        font-style: normal;
        font-weight: normal;
        font-variant: normal;
        text-transform: none;
        text-rendering: auto;
        line-height: 1;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        vertical-align: middle;
    }
	.i-icon-customerservice_fill:before { content: "\E6FB";}
</style>