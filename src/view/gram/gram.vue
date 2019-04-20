<template>
	<div style="height: 100%;">
		<Layout>
			<Content>
				<div :style="[screeFront]">
					<table style="background-color: #f9fbee;width: 99%;height: 100%;">
						<tr style="height: 10%;">
							<td colspan="2" id="bottomId"  style="text-align: center;width: 80%;font-size: 1.1rem;">{{screenShow}}</td>
							<!-- <td ></td> -->
							<td align="right">
								<img v-if="btnCancel.show" :src="btnCancel.src" @click="backIndex()" style="cursor:pointer;"></img>
							</td>
						</tr>
						<tr style="height: 60%">
							<td style="width: 10%;" id="btnPreId">
								<img  v-show="btnPre.show" :src="btnPre.src" @click="goMessageMethod(btnPre.goMessage)" style="cursor:pointer;"></img>
							</td>				
														
							<td id="centerId1" style="width: 60%;" align="center" key="index" v-if="btnCenters.type=='btns'">			
							<span  v-for="(img,index) in btnCenters.imgs">
								<input :style="{background:'url('+img.src+')'}"  class="bottom-btn"
								:value="img.textShow" @click="goMessageMethod(img.goMessage)"></input>&nbsp;
								<!-- <img :src="img.src" @click="goMessageMethod(img.goMessage)" style="cursor:pointer;">{{img.textShow}}</img>&nbsp; -->
							</span>	
							</td>
							<td id="centerId2" style="width: 60%;" align="center" v-else-if="btnCenters.type=='imgs'">	
								<span  v-for="img in btnCenters.imgs">
									<img :src="img.src" style="max-width:750px;max-height:400px;"></img>&nbsp;
								</span>
							</td>
							<td id="centerId3" style="width: 60%;" align="center"  v-else-if="btnCenters.type=='table'">	
								<table><tr ><td colspan='2'><a style='font-size:25px'>{{btnCenters.promptVagueMsg}}
									</a></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr>
									<tbody v-for="(word,index) in btnCenters.wordArray">	
											<tr><td style='width:50%;'><a style='font-size:20px;text-decoration: none;color:blue' @click.prevent='goMessageMethod(word.word1)'>{{word.word1}}</a></td>
											 <td><a style='font-size:20px;text-decoration: none;color:blue'  @click.prevent='goMessageMethod(word.word2)' >{{word.word2}}
											</a></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr>									
									</tbody>
								</table>
							</td>
							<td id="centerId4" style="width: 60%;" align="center" v-else>	
								
							</td>							
							<td style="width: 10%;" id="nextId" >
								<img v-show="btnNext.show" :src="btnNext.src" @click="goMessageMethod(btnNext.goMessage)" style="cursor:pointer;"></img>
							</td>
						</tr>
						<tr style="height: 10%;">
							<td></td>
							<td id="bottomId" valign="middle" align="center" >
								<span v-for="botton in btnBottoms">
									<input :style="{background:'url('+botton.src+')'}"  class="bottom-btn"
									:value="botton.textShow" @click="goMessageMethod(botton.goMessage)"></input>&nbsp;
								</span>
								
							</td>
							<td></td>
						</tr>
					</table>
				</div>
				<div>
					<div style="float: left;">
						<Icon title="扬声器" :type="openvoice?'md-volume-up':'md-volume-off'" size="24" @click.native="change('openvoice')" :class="[{'open':openvoice}]" :style="{margin: '0 10px'}" />
					</div>
					<div class="iconRight" style="float: right;">
						<Icon  title="返回首页" @click.native="backIndex()" type="md-refresh-circle"  size="24" :style="{margin: '0 0px'}"/>
						<Icon  @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
					</div>
				</div>
				<div :style="[inputFront]">
					<div v-show="!openmicro">
						<Input v-model="queryMessage" type="textarea" @on-enter="query" placeholder="Enter something..." :autosize="{minRows:3,maxRows: 5}" />
						<div class="div1">
							<i-button @click="query">发送(Enter)</i-button>
						</div>
					</div>
				</div>
			</Content>
			<Sider :style="[siderFront]" breakpoint="md" ref="side1" hide-trigger collapsible :collapsed-width="70" v-model="isCollapsed">				
				<Collapse v-show="!isCollapsed" v-for="(obj,index)  in queryHistory" :key="index">
					<Panel :name="index+1+''">
						{{obj.query}}
						<p slot="content">{{obj.response}}</p>
					</Panel>
				</Collapse>				
			</Sider>
		</Layout>
	</div>
</template>

<script>
	export default {
		name: 'gram',
		data: function() {
			return {
				isCollapsed: false,
				openmicro: false,
				openvoice: false,
				queryHistory: [],
				userId: "",
				deviceId:"gram-0001",
				platformId:99,
				queryMessage: '',
				imgServer: this.config.server.imgServerUrl,
				url : this.config.server.queryServerUrl,
				btnNext:{show:false,textShow:"",goMessage:"",src:""},
				btnPre:{show:false,textShow:"",goMessage:"",src:""},
				btnCancel:{show:false,textShow:"",goMessage:"",src:""},
				btnBottoms:[],
				btnCenters:{type:'',imgs:[]}, //table btn imgs
				screenShow: '欢迎使用人工智脑!',
				// 显示相关
				screeFront: {}, //屏幕样式
				inputFront: {}, // 输入样式
				siderFront:{}, //历史记录
			}
		},
		created() {
			this.userId = this.guid(); //用户编号
		},
		mounted() {
			var height = window.screen.availHeight;
			//document.documentElement.clientWidth;
			// padding 20 图标24
			var screeHeight = height * 0.7;
			var inputHeght = height - screeHeight;
			if (inputHeght > 120) inputHeght = 120;
			this.siderFront={height:(height*0.8)+"px",overflow: 'auto'}
			this.screeFront = {height: screeHeight + "px"};
			this.inputFront = {height: inputHeght + 'px'}
			this.backIndex();
		},
		methods: {
			change(flag) {
				this[flag] = !this[flag]
			},

			query() {
				var queryMessage=this.queryMessage.replace("\n","").trim();
				if(queryMessage==undefined||queryMessage==null){
					this.$Message.info('输入不能为空!');
					return ;
				}			
				var data={'deviceId':this.deviceId,'query':queryMessage,userId:this.userId};
				this.queryMessage="";
				this.$http.post(this.url+'query',JSON.stringify(data)).then(function(data) {
					console.log(data);
					this.getRespData(data.body,queryMessage);					
				});
			},
			backIndex(){
				this.queryMessage="返回首页";
				this.query();
			},
			getRespData(data,queryMessage) {			
				//记录请求信息
				//console.log(data)
				
				var date = new Date();
				var s = date.getSeconds(),h = date.getHours(),m = date.getMinutes();
				var question=queryMessage;
				if(question&&question.length>5){
					question=question.substring(0,5)+'...';
				}				
				this.queryHistory.push({query: `${h}:${m}:${s}` + question,response: data});
				// 判断是否正确
				if(data.result=="1"){
					alert(data.errorMsg);
					return;
				}
				// 开始展示
				this.queryMessage="";
				var respData = {};
				var answerId = data.answerId;
				if (answerId == '1') {
					var type = data.richText.richType;
					if (type == 'guiding') { // 特殊处理
						respData.tts = data.richText.richContent.tts;
						respData.screenShow = data.richText.richContent.screenShow;
						respData.wordArray = data.richText.richContent.word;
					} else if (type == 'scene') {
						respData.tts = data.richText.richContent.tts;
						respData.screenShow = data.richText.richContent.screenShow;
						respData.btnCenters = data.richText.richContent.btnCenters;
						respData.btnBottoms = data.richText.richContent.btnBottoms;
						respData.btnPre = data.richText.richContent.btnPre;
						respData.btnNext = data.richText.richContent.btnNext;
						respData.btnCancel = data.richText.richContent.btnCancel;
					}
				} else if (answerId == "2") {
					respData.tts = data.recommendText.tts;
					respData.screenShow = data.recommendText.screenShow;
					respData.wordArray = data.recommendText.questionList;
					respData.promptVagueMsg = data.recommendText.recommondMsg;
				} else if (answerId == "3") {
					respData.tts = data.richText.richContent.tts;
					respData.screenShow = data.richText.richContent.screenShow;
				}
				this.show(respData);
			},
			show(respData) {
				if (this.openvoice) { // 扬声器播报tts
					this.speech(respData.tts);
				}
				var imgServer = this.imgServer;
				this.screenShow = "";
				if (respData.screenShow) {
					this.screenShow = respData.screenShow;
				}
				this.btnCancel={show:false};
				if (respData.btnCancel) {
					this.btnCancel={show:true,src: imgServer + respData.btnCancel.imgUrl}
				}
				this.btnCenters={type:'',imgs:[]}
				if (respData.btnCenters) {
					var buttons = respData.btnCenters.buttons;
					if (buttons != null && buttons.length > 0) {
						this.btnCenters={type:'btns',imgs:[]}
						for (var i = 0; i < buttons.length; i++) {
							this.btnCenters.imgs.push({src:imgServer + buttons[i].imgUrl,goMessage:buttons[i].goMessage,
								textShow:buttons[i].textShow});
						}
					}
					var images = respData.btnCenters.images;
					if (images != null && images.length > 0) {
						this.btnCenters={type:'imgs',imgs:[]}
						for (var i = 0; i < images.length; i++) {
								this.btnCenters.imgs.push({src:imgServer + images[i].imgUrl});
						}
					
					}
				}
				this.btnNext={show:false};
				if (respData.btnNext) {
					this.btnNext.show=true;
					this.btnNext.src= imgServer + respData.btnNext.imgUrl;
					this.btnNext.goMessage=respData.btnNext.goMessage;
				}
				this.btnPre={show:false};
				if (respData.btnPre) {
					this.btnPre.show=true;
					this.btnPre.src= imgServer + respData.btnPre.imgUrl;
					this.btnPre.goMessage=respData.btnPre.goMessage;
				}
				this.btnBottoms=[]
				if (respData.btnBottoms) {
					for (var i = 0; i < respData.btnBottoms.length; i++) {
							this.btnBottoms.push({src:imgServer + respData.btnBottoms[i].imgUrl,
												  textShow:respData.btnBottoms[i].textShow,
												  goMessage:respData.btnBottoms[i].goMessage});
					}
				}
				
				if (respData.wordArray) {
					this.btnCenters={type:'table'},
					this.btnCenters.promptVagueMsg=respData.promptVagueMsg
					this.btnCenters.wordArray=[];
					for (var i = 0; i < respData.wordArray.length; i=i+2) {
						var word={word1:respData.wordArray[i]};
						if((i+1)<respData.wordArray.length){
							word.word2=respData.wordArray[i+1];
						}
						this.btnCenters.wordArray.push(word)					
					}
				}
			},
			goMessageMethod(msg){
				this.queryMessage=msg;
				this.query();
			},
			speech(msg) {
				var speech = new SpeechSynthesisUtterance(msg);
				console.log(speech);
				window.speechSynthesis.speak(speech);
			},
			collapsedSider() {
				this.$refs.side1.toggleCollapse();
			},
			switchmicro() {
				this.openmicro = !this.openmicro;
				console.log(this.openmicro);
			},
			S4() {
				return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
			},
			guid() {
				return (this.S4() + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + this.S4() +
					this.S4());
			}
		},
		
		computed: {
			rotateIcon() {
				return [
					'menu-icon',
					this.isCollapsed ? 'rotate-icon' : ''
				];
			},
			menuitemClasses() {
				return [
					'menu-item',
					this.isCollapsed ? 'collapsed-menu' : ''
				]
			}
		},
	}
</script>

<style>
	.div1 {
		float: right;
	}

	.div2 {
		float: left;
	}

	.open {
		color: #2d8cf0;
	}
	.bottom-btn{
		width:240px;
		height:58px;
		border:0;
		font-size:23px;
		text-align:center;
		font-weight:bold;
		cursor:pointer;
	}
</style>
<style scoped>
	
	.menu-icon {
		transition: all .3s;
	}

	.rotate-icon {
		transform: rotate(-90deg);
	}

	.menu-item span {
		display: inline-block;
		overflow: hidden;
		width: 69px;
		text-overflow: ellipsis;
		white-space: nowrap;
		vertical-align: bottom;
		transition: width .2s ease .2s;
	}

	.menu-item i {
		transform: translateX(0px);
		transition: font-size .2s ease, transform .2s ease;
		vertical-align: middle;
		font-size: 16px;
	}

	.collapsed-menu span {
		width: 0px;
		transition: width .2s ease;
	}

	.collapsed-menu i {
		transform: translateX(5px);
		transition: font-size .2s ease .2s, transform .2s ease .2s;
		vertical-align: middle;
		font-size: 22px;
	}
</style>
