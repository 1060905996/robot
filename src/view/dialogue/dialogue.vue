<template>
	<div class="dialogue-content">
		<!-- 顶部导航 -->
		 <DetailNav v-if="showDetailNav"  :data="returnData" @backPrePage="backPrePage" @backHome="backHome"/>
		 
		 <!-- 首页问题指南页面 -->
		<Guiding1 v-if="showGuiding1" @go="go" :data="returnData"/>
						 
		 <!-- 未识别问题 -->
		 <Scene3 v-show="showScene3" :data="returnData"/> 
		<!-- 单张图片、上一步下一步 页面 -->
		<Scene1 v-show="showScene1" :data="returnData" @imageStep="imageStep" @query="go"/> 
		<!-- 推荐列表 -->
		<Scene2 v-show="showScene2" :data="returnData"  @query="go"/>
		
		 <!-- 详情页面底部功能按钮区域 -->
		 <BottomBar v-show="showBottomBar" :data="returnData.btnBottoms" @go="go"/> 
		
		 <!-- 底部输入框部分 -->
		<InputBar
		    ref="inputBar"
		    v-show="showInputBar"
		    @submitQuestion="submitQuestion"
		    @inputTypeEmit="inputTypeEmit"
		/>		
	</div>
</template>
<script>
	import Guiding1 from "@/view/dialogue/components/Guiding1.vue";
	import InputBar from "@/view/dialogue/components/InputBar.vue";
	import DetailNav from "@/view/dialogue/components/DetailNav.vue";
	import Scene1 from "@/view/dialogue/components/Scene1.vue";
	import Scene2 from "@/view/dialogue/components/Scene2.vue";
	import Scene3 from "@/view/dialogue/components/Scene3.vue";
	import BottomBar from "@/view/dialogue/components/BottomBar.vue";
	export default{
		name:'dialogue',
		components:{
			Guiding1,
			InputBar,
			DetailNav,
			Scene1,
			Scene3,
			Scene2,
			BottomBar,
		},
		data(){
			return {
				deviceId:"gram-0002",
				platformId:99,
				queryMessage: '',
				imgServer: "",
				url : this.config.server.queryServerUrl,
				guideList:[],
				screenShow: '欢迎使用人工智脑!',
				prePageId: "/", 
				inputType:"",
				pageId:"",
				returnData:{},
			}
		},
		created() {
			this.userId = this.config.guid(); //用户编号
			this.backHome();
		},
		methods:{
			guideLeave(item){
				console.log(item);
			},
			submitQuestion(question){
				this.queryMessage= question;
				this.query();
			},
			inputTypeEmit(type) {
			    this.inputType = type;
			},
			query() {
				var queryMessage=this.queryMessage.replace("\n","").trim();
				if(queryMessage==undefined||queryMessage==null){
					this.$Message.info('输入不能为空!');
					return ;
				}			
				var messageId = this.config.guid().replace(/-/g,"");
				var data={'deviceId':this.deviceId,'query':queryMessage,userId:this.userId,messageId:messageId};
				this.queryMessage="";
				
				 console.log("url: "+this.url+'query');
				 console.log("queryData :"+JSON.stringify(data));
				 this.$http.post(this.url+'query',JSON.stringify(data)).then(function(data) {
					console.log(data.bodyText);
					this.getRespData(data.body)
				}); 
			},
			go(query){
				this.queryMessage = query;
				this.query();
			},
			backHome(){
				this.queryMessage="返回首页";
				this.query();
			},
			backPrePage(){
				
			},
			detail1Leave(item) {
			    
			},
			speechEnd() {
			    //语音录入完成
			},
			imageStep(step) {
			    //上一步、下一步
			},
			speech(msg) {
				var speech = new SpeechSynthesisUtterance(msg);
				window.speechSynthesis.speak(speech);
			},
			getRespData(data){
				var respData = {};
				if(data.result=='1'){
					alert(data.errorMsg)
					return;
				}
					
				var answerId = this.config.simplifyAnswerId(data.answerId);
				var richType = data.richText.richType;
				respData.type = richType+answerId;
				
				console .log("simplifyAnswerId:"+answerId);
				if (answerId == '1') {
					if (richType == 'guiding') { // 特殊处理
						/*respData.tts = data.richText.richContent.tts;
						respData.screenShow = data.richText.richContent.screenShow;
						respData.wordArray = data.richText.richContent.word;*/
						respData.tts="请问您还有什么需要帮助吗？";
						respData.screenShow="我是文思海辉智能机器人小文，您可以这样问我：";
						respData.wordArray=[{"title": "信用卡","subtitle": "信用卡分期主动外呼"}, {"title": "公积金","subtitle": "提取公积金需要哪些材料？"}, {"title": "修改密码","subtitle": "我忘记公积金密码了?"}, {"title": "开户","subtitle": "我想开户"}, {"title": "取款",	"subtitle": "我想办理取款业务"}, {	"title": "理财","subtitle": "有什么理财产品?"}, {"title": "手机银行",	"subtitle": "怎么在手机银行上转账"}, {"title": "银行卡密码","subtitle": "修改银行卡密码"	}];
						this.returnData= respData;		
					} else if (richType == 'scene') {
						respData.tts = data.richText.richContent.tts;
						respData.screenShow = data.richText.richContent.screenShow;
						respData.btnCenters = data.richText.richContent.btnCenters;
						
						
						/* if(respData.btnCenters!=undefined || respData.btnCenters!=undefined){
							if(respData.btnCenters.images!=undefined )
								respData.btnCenters.images.push({"imgUrl":"/resource/images/STM.jpg","isShow":"1"})
						} */
						
						
						respData.btnBottoms = data.richText.richContent.btnBottoms;
						respData.btnPre = data.richText.richContent.btnPre;
						respData.btnNext = data.richText.richContent.btnNext;
						respData.btnCancel = data.richText.richContent.btnCancel;
						respData.question = data.question;
						this.returnData= respData;
					}
				}else if (answerId == "2" || answerId =="4") {
						respData.tts = data.recommendText.tts;
						respData.screenShow = data.recommendText.screenShow;
						respData.wordArray = data.recommendText.questionList;
						respData.question = data.question;
						respData.promptVagueMsg = data.recommendText.recommondMsg;
						respData.btnCancel = data.richText.richContent.btnCancel;
						respData.btnPre = data.richText.richContent.btnPre;
						respData.btnNext = data.richText.richContent.btnNext;
						this.returnData= respData;
					} else if (answerId == "3") {
						respData.tts = data.richText.richContent.tts;
						respData.screenShow = data.richText.richContent.screenShow;
						respData.question = data.question;
						this.returnData= respData;
					}
					this.speech(respData.tts);
			},
			
		},
		computed: {
			showGuiding1() {
				if (this.returnData.type === "guiding1") {
					return true;
				}
				return false; 
			},
			showInputBar() {
			   // return this.pageId === "/" ? true : false;
			   return true;
			},
			showDetailNav() {
			    if (this.returnData.type != "guiding1") {
			        return true;
			    }
			    return false; 
			}, 
		  showScene3(){
				if (this.returnData.type === "scene3") {
				    return true;
				}
				return false;
			},
			showScene1() {
			    if (this.returnData.type === "scene1") {
			        return true;
			    }
			    return false;
			},
			showScene2(){
				if (this.returnData.type === "scene2") {
				    return true;
				}
				return false;
			},
			showBottomBar(){
				/* if (this.returnData.btnBottoms) {
				    return true;
				} */
				return true;
			},
			
		}
	}
</script>
<style scoped>
* {
    margin: 0;
    padding: 0;
}
.dialogue-content {
    overflow: auto;
    height: 100%;
    background-image: url(../../assets/dialogue/bg.png);
    background-size: cover;
    background-repeat: no-repeat;
}
</style>