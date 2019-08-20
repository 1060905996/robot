<template>
	<div class="abs cover contaniner">
		<div class="abs cover pnl">
			<div class="abs top pnl-head" id="pnlHead" :style="{backgroundImage:'url(' + head_jpg + ')',backgroundColor:'rgb(36, 44, 51)'}">
				<img src="../../assets/chat/images/DMC_AI_LOGO6.png" class="pnl-hl" id="siteLogo">
				<div class="pnl-site hide" id="siteName" style="color: rgb(236, 236, 236);">文思海辉北京金信科技有限公司</div>
				<div class="pnl-worker abs left">
					<div class="pnl-worker-photo" id="workerPhoto" style="background-image: url(../../assets/chat/images/14761555537.png);">
						<i class="ic kh pnl-worker-icon kh-bg" id="workerIcon"></i>
					</div>
					<div class="pnl-worker-text">
						<span class="pnl-worker-name" id="workerName">小文</span> <br>
						<span class="pnl-worker-site" id="workerSite">----</span>
					</div>
				</div>
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
			<div class="abs cover pnl-body" id="pnlBody">
				<div class="abs cover pnl-left">
					<div class="abs top pnl-alert" id="alert">这是一则消息</div>
					<!-- 广告条消息 -->
					<div class="msg-banner banner-active" id="msgbanner" v-show="msgbannerShow">
						<div class="close" id="close">
							<Icon type="md-close"  size="15" @click="msgbannerShow = !msgbannerShow"/>
						</div>
						<div class="banner">
							<strong>公告：</strong>欢迎体验小文智能客服，请发送消息体验对话！
						</div>
					</div>
					<div class="abs cover pnl-msgs scroll diy-chat-btn" id="show" ref="msgs">
						<div class="msg-banner banner-hidden">
							<div class="close">
								<Icon type="md-close" />
							</div>
							<div class="banner">
								<strong>公告：</strong>欢迎体验小文智能客服，请发送消息体验对话！
							</div>
						</div>
						<!-- <div class="msg min time" id="histStart">今天 22:17:49</div> -->
						<div class="pnl-list" id="hists">
							<!-- 历史消息 -->
						</div>
						<div class="pnl-list hide" id="defHot">
							<!-- 自定义热点图文信息 -->
						</div>
						
						<div class="pnl-list" id="msgs" v-for="(chat,index) in chatList">
							<span v-if="chat.type=='robot'">
								<div class="msg robot" key="index"> 
								<!-- " -->
									<div class="msg-left">
										<div class="msg-host photo" id="welcomeIcon" v-bind:style="{backgroundImage:'url(' + xiaowen_jpg + ')'}"></div>
										<div class="msg-ball" id="welcomeBall" >
											<span v-html="chat.screenShow"></span>
											<span v-html="chat.promptVagueMsg"></span>
											<span v-for="(link,index) in chat.links" @click="go(link.text)" :key="index">
												<div class="msg-relques" style="">
													<!-- <span   v-text=""></span> -->
													<a :href="link.url" class="msg-anchor" title="点击发送问题">{{index+1}}.{{link.text}}</a>
												</div>
											</span>
											<br>
											
											<ul style="color:#858585;border-top:2px dashed #bbb;"  v-if="chat.isComment=='0'">
												<li >您的问题解决了吗？</li>
												<li id="evaBad" ><a id="ca07722e7d1c4ed59ef1364874b64259" href="javascript:void(0);" type="unsolved" @click="evaluation(0,chat);">
													<span class="iconfont icon-bad"></span>&nbsp;未解决&nbsp;</a></li>
												<li id="evaGood"><a id="ca07722e7d1c4ed59ef1364874b64259" href="javascript:void(0);" type="resolved" @click="evaluation(1,chat);">
												 <span class="iconfont icon-good"></span>&nbsp;已解决&nbsp;</a></li>
											</ul>
											<ul style="color:#858585;border-top:2px dashed #bbb;display: inline;text-align: right;" v-if="chat.isComment=='1'">
												<li style="width: 250px;">谢谢你的意见,我们会不断改进!</li>
											</ul>
										</div>
									</div>
								</div>
							</span>
							<!-- 用户显示 -->
							<span v-else-if="chat.type=='guest'">
								<div class="msg guest" id="1553609128807-0">
									<div class="msg-right" customer="游客">
										<div class="msg-host">
											<Icon type="ios-person" />
										</div>
										<div class="msg-ball" :title="chat.title">{{chat.screenShow}}</div>
									</div>
								</div>
							</span>						
						</div>
						
						
						<div class="pnl-list hide" id="unreadLine">
							<div class="msg min time unread">未读消息</div>
						</div>
						<!-- <div class="pnl-mask hide" id="msg-mask"></div> -->
					</div>
					<div class="abs bottom pnl-text">
						<div class="abs top pnl-warn" id="pnlWarn">
							<div class="abs pnl-diy">
								<!-- <div class="diy-tab diy-left">我想</div> -->
								<div class="diy-tab diy-middle">
									<!-- <span class="diy-btn" data-time="1553609869423" data-click="1" title="你们做什么的？" value="你们做什么的？" index="0" type="click">你们做什么的？</span>
									<span class="diy-btn" data-time="0" data-click="2" title="可以用在哪？" value="可以接入哪些渠道？" index="1" type="click">可以用在哪？</span>
									<span class="diy-btn" data-time="0" data-click="2" title="注册账号" value="怎么注册账号" index="2" type="click">注册账号</span>
									<span class="diy-btn" data-time="0" data-click="2" title="如何接入" value="怎么接入系统" index="3" type="click">如何接入</span>
									<span class="diy-btn" data-time="0" data-click="2" title="咨询人工客服" value="人工客服" index="4" type="click">咨询人工客服</span>
									<span class="diy-btn" data-time="0" data-click="2" title="登陆客服坐席系统" value="https://desk.小文kf.com" index="5" type="link">登陆客服坐席系统</span> -->
								</div>
								<!-- <div class="diy-tab diy-right">
									<Icon type="md-refresh" /> <span class="diy-pre">换一批</span>
								</div> -->
							</div>
							<div class="fl btns rel pnl-warn-left" id="pnlBtns">
								<div class="pnl-support-sm" id="copyrightSm">
									<a>小文KF提供服务支持</a>
								</div>
							</div>
							<div class="fl right pnl-warn-right">
								<span class="sess-status" id="sessStatus"> </span>
								<span id="val-left" style="display: none;">您还可以输入<span id="valleft">450</span>字
								</span>
							</div>
						</div>
						<div class="abs cover pnl-input">
							<textarea class="scroll" id="text" @keyup.enter="query" wrap="hard" v-model="question" maxlength="100" placeholder="在此输入..."></textarea>
						</div>
						<div class="abs br pnl-btn" id="submit" @click="query" style="background-color: rgb(1, 170, 230); color: rgb(255, 255, 255);">发送</div>
						<div class="pnl-support" id="copyright">
							<a target="_blank">小文提供服务支持</a>
						</div>
					</div>
				</div>
				<div class="abs right pnl-right">
					 <Carousel autoplay  loop>
						<CarouselItem>
							<div class="demo-carousel"><img style="width: 260px; height: 130px;" src="../../assets/chat/images/5.jpg"
							 alt="图片不存在"></div>
						</CarouselItem>
						<CarouselItem>
							<div class="demo-carousel"><img style="width: 260px; height: 130px;" src="../../assets/chat/images/6.jpg"
							 alt="图片不存在"></div>
						</CarouselItem>
						<CarouselItem>
							<div class="demo-carousel"><img style="width: 260px; height: 130px;" src="../../assets/chat/images/7.jpg"
							 alt="图片不存在"></div>
						</CarouselItem>
						<CarouselItem>
							<div class="demo-carousel"><img style="width: 260px; height: 130px;" src="../../assets/chat/images/8.jpg"
							 alt="图片不存在"></div>
						</CarouselItem>
					</Carousel>
					
					<div class="pnl-right-content" style="top: 146px;">
						<div class="pnl-tabs">
							<div class="tab-btn active" id="hot-tab">常见问题</div>
							<!-- <div class="tab-btn" id="rel-tab">相关问题</div> -->
						</div>

						<div class="pnl-hot" style="display: block;">
							<ul class="rel-list unselect" id="hots">
								<li class="rel-item" title="点击发送问题" @click="go('你叫什么名字？')">你叫什么名字？</li>
								<li class="rel-item" title="点击发送问题" @click="go('你多少岁了？')">你多少岁了？</li>
								<li class="rel-item" title="点击发送问题" @click="go('你会做什么？')">你会做什么？</li>
								<li class="rel-item" title="点击发送问题" @click="go('你厉害还是小艾同学厉害？')">你厉害还是小艾同学厉害？</li>
								<li class="rel-item" title="点击发送问题" @click="go('什么时候发工资？')">什么时候发工资？</li>
								<li class="rel-item" title="点击发送问题" @click="go('工资怎么发放？')">工资怎么发放？</li>		
								<li class="rel-item" title="点击发送问题" @click="go('怎么查询工资？')">怎么查询工资？</li>
								<li class="rel-item" title="点击发送问题" @click="go('怎样申请调薪？')">怎样申请调薪？</li>
								<li class="rel-item" title="点击发送问题" @click="go('什么是税前异动？')">什么是税前异动？</li>
								<li class="rel-item" title="点击发送问题" @click="go('工资有误怎么办？')">工资有误怎么办？</li>
								<li class="rel-item" title="点击发送问题" @click="go('个税怎么扣缴？')">个税怎么扣缴？</li>
								<li class="rel-item" title="点击发送问题" @click="go('加班费有什么规定？')">加班费有什么规定？</li>
								<li class="rel-item" title="点击发送问题" @click="go('工资卡有什么要求？')">工资卡有什么要求？</li>
								<li class="rel-item" title="点击发送问题" @click="go('计薪是算一整个月的吗？')">计薪是算一整个月的吗？</li>	
							</ul>
						</div>
					<!-- 	<div class="pnl-rel" style="display: none;">
							<ul class="rel-list unselect" id="rels">
								<li class="rel-item" title="点击发送问题">你们是做什么的？</li>
								<li class="rel-item" title="点击发送问题">你们的网站是什么？</li>
								<li class="rel-item" title="点击发送问题">你们的核心是什么呢</li>
								<li class="rel-item" title="点击发送问题">你们的公司地址是什么？</li>
								<li class="rel-item" title="点击发送问题">你们智能到什么程度了？</li>
								<li class="rel-item" title="点击发送问题">你们做哪方面的在线客服？</li>
								<li class="rel-item" title="点击发送问题">加盟你们公司有什么条件吗？</li>
								<li class="rel-item" title="点击发送问题">想咨询一下你们微信群机器人都有什么功能？</li>
								<li class="rel-item" title="点击发送问题">我是你们的用户</li>
							</ul>
						</div> -->
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import xiaowen from '../../assets/chat/images/xiaowen_logo.png'
	import head from '../../assets/chat/images/149733084010.jpg'
	export default {
		name: 'chat',
		data: function() {
			return {
				chatList : [{type:'robot',screenShow:'Hi，我是机器人客服小文，您对我们的系统和业务有哪些疑问呢？我能帮您快速解答',messageId:'',title:'',isComment:'-1'}],
				question : '',
				userId: "",
				deviceId : "chat-0001",
				msgbannerShow : true,
				url : this.config.server.queryMessageUrl,
				xiaowen_jpg:xiaowen,
				head_jpg: head
			}
		},
		created(){
			this.userId = this.config.guid();
		},
		methods:{
			query(){
				var question = this.question;
				if(question.length==0){
					 this.$Message.warning('输入为空...');
					 return;
				} 
				this.chatList.push({type:'guest',screenShow:question,title:this.getDateTime()});
				this.$nextTick(function(){
				  /*DOM更新了*/
				   this.$refs.msgs.scrollTop = this.$refs.msgs.scrollHeight;
				})
				var messageId = this.config.guid().replace(/-/g,"");
				this.$http.post(this.url+"SSOC/queryMessage",{userId:this.userId,query:question,deviceId:this.deviceId,messageId:messageId}).then(function(data){
					console.log(JSON.stringify(data));
					var resp =  data.body;
					this.show(resp);
				});
				this.question= "";
				return false;
			},
			show(data){
				var respData = {};
				var answerId = this.config.simplifyAnswerId(data.answerId);
				var richType = data.richText.richType;
				respData.type = richType+answerId;
				
				console .log("simplifyAnswerId:"+answerId);
				if (answerId == '1') {
					if (richType == 'scene') {
						respData.tts = data.richText.richContent.tts;
						respData.screenShow = data.richText.richContent.screenShow;
					}
				}else if (answerId == "2") {
						respData.tts = data.recommendText.tts;
						respData.screenShow = data.recommendText.screenShow;
						respData.questionList = data.recommendText.questionList;						
						respData.promptVagueMsg = data.recommendText.recommondMsg;						
				} else if (answerId == "3") {
					respData.tts = data.richText.richContent.tts;
					respData.screenShow = data.richText.richContent.screenShow;
					respData.question = data.question;
				}
				var messageId = data.messageId;
				var questionList = respData.questionList;
				var links = [];
				if(questionList!=undefined){
					questionList.forEach(q=>{
						links.push({text:q,url:"javascript:void(0)"});
					})
				}
				this.chatList.push({type:'robot',screenShow:respData.screenShow,links:links,messageId:messageId,isComment:'0',promptVagueMsg:respData.promptVagueMsg});
				this.$nextTick(function(){
				  /*DOM更新了*/
				   this.$refs.msgs.scrollTop = this.$refs.msgs.scrollHeight;
				})
			},
			go(question){
				this.question = question;
				this.query();
			},
			evaluation(degree,chat){
				var messageId= chat.messageId;
				chat.isComment = '1'; 
				this.$http.post(this.url+"dosat",{degree:degree,originMessageId:messageId}).then(function(data){
					console.log("评论成功！");
				}); 
			},
			getDateTime(){
				var dt = new Date();
				var h = dt.getHours().toString();
				var m = dt.getMinutes().toString();
				var s = dt.getSeconds().toString();
				if(h<10) h="0"+h;
				if(m<10) m="0"+m;
				if(s<10) s="0"+s;
				return `${h}:${m}:${s}`
			},
		}
	}
</script>

<style scoped>
	@import url("../../assets/chat/css/index.min_cc.css");
	#msgs ul li{
		display: inline-block;
	}
</style>
