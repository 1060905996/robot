<template>

	<div>
		<h1 v-text="msg"></h1>
		<!-- <Button type="primary" @click="start">开始录音</Button>

		<Button type="warning" @click="stop">结束</Button> -->
		<h4>{{voiceStr}}</h4>
		<div @mousedown="start()" @mouseup="stop()">			
			<Icon type="ios-microphone" :size="200"  :color="micColor"/>
		</div>
				
	</div>
</template>

<script>
import Recorder from 'recorder-js';
const audioContext =  new (window.AudioContext || window.webkitAudioContext)(); 
const recorder = new Recorder(audioContext, {
  // An array of 255 Numbers
  // You can use this to visualize the audio stream
  // If you use react, check out react-wave-stream
  //onAnalysed: data => console.log(data),
});
 
let isRecording = false;
let blob = null;
 
navigator.mediaDevices.getUserMedia({audio: true})
  .then(stream => recorder.init(stream))
  .catch(err => console.log('Uh oh... unable to get stream...', err));
 
export default{
	data:function(){
		return {
			voiceStr:'',
			recorderStatue:false,
			msg:'点击开始录音',
			micColor:"#5c6b77"
		}
	},
	methods:{
		init(){
			
		},
		start(){
			recorder.start()
			.then(() => isRecording = true);
			console.log('recordering.....')
			this.msg='录音中...';
			this.micColor="#2d8cf0"
		},
		stop(){
			this.msg='点击开始按钮,开始录音...';
			this.micColor="#5c6b77";
			recorder.stop()
			.then(({blob, buffer}) => {
				var begin =new Date().getTime();
				var reader = new FileReader();
				reader.readAsDataURL(blob);
				var $=this.$http;
				var start =new Date().getTime();
				reader.onload = function (e) { 					
					var baseCode= this.result.substring(this.result.indexOf(',')+1);//.substring(this.result.indexOf(',')+1);
					$.post('http://localhost:8080/iat/getVoiceStr',{voiceBaseCode:baseCode}).then(function(data){
						var end =new Date().getTime();
						console.log("耗时:"+(end-begin)/1000.0)
						console.log(data.body);
					});
			}
			});
			
			console.log('stoped')
		}
	},
	props:['size']
}
</script>

<style>

</style>
