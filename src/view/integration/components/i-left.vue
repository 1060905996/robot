<template>
	<div class="letf-content">
		<div class="left-img">		
			<div class="abs top pnl-head" id="pnlHead" style="height: 50px;" :style="{backgroundImage:'url(' + head_jpg + ')',backgroundColor:'rgb(36, 44, 51)'}">
				<img src="../../../assets/chat/images/DMC_AI_LOGO.png" class="pnl-hl" id="siteLogo">
				<div class="pnl-site hide" id="siteName" style="color: rgb(236, 236, 236);">文思海辉北京金信科技有限公司</div>
				<div class="pnl-about" id="pnlAbout">
					<Icon type="ios-information-circle" size="18" /> <span>关于我们</span>
					<!-- 关于我们 -->
					<div class="abs pop-about">
						<div id="about">
							<h4>文思海辉北京金信科技有限公司</h4>
							<p style="color: #464c5b;font-size: 12px;">文思海辉与全球的行业龙头企业和创新企业建立了合作伙伴关系，他们的产品和服务有效地完善了我们的行业和面向客户的解决方案。</p>
							<p style="color: #3399ff;font-size: 15px;">
								<Icon type="ios-globe-outline" /><a href="https://www.pactera.com/" target="_blank">www.pactera.com</a></p>
						</div>
					</div>
				</div>				
			</div>
			
			 <img class="service-img" style="" src="../../../assets/integration/1.png" alt="图片不存在">			
		</div>
	 
	
				
	</div>
</template>

<script>
	import head from '../../../assets/chat/images/149733084010.jpg'
	export default{
		name:'ileft',
		data(){
			return {
				head_jpg: head,
			}
		},
	}
</script>

<style>
	
	@import url("../../../assets/chat/css/index.min_cc.css");

	.letf-content {
	    overflow: auto;
	    height: 100%;
	    background-color: wheat;
	}
	.left-img{
		padding: 5px 10px;
		background-color: #0086B3;
		
	}
	.service-img{
		width: 197px;
		height: 164px;
		padding: 0 5px 0 5px;
		margin-top: 45px;
		
	}
</style>
