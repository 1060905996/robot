<template>
		<div @mousedown="start()" @mouseup="stop()">
			<Icon type="ios-microphone" :size="size" :color="micColor" />
		</div>
</template>

<script>
	import Recorder from 'recorder-js';
	const audioContext = new(window.AudioContext || window.webkitAudioContext)();
	const recorder = new Recorder(audioContext, {});
	let isRecording = false;
	let blob = null;
	navigator.mediaDevices.getUserMedia({
			audio: true
		})
		.then(stream => recorder.init(stream))
		.catch(err => console.log('Uh oh... unable to get stream...', err));

	export default {
		data: function() {
			return {
				voiceStr: '',
				recorderStatue: false,
				msg: '点击开始录音...',
				micColor: "#5c6b77"
			}
		},
		mounted() {
			if(!recorder){
				alert("不持支麦克风");
				console.log("不持支麦克风");
			}
		},
		methods: {
			start() {
				recorder.start().then(() => isRecording = true);
				console.log('recordering.....')
				this.msg = '录音中...';
				this.micColor = "#2d8cf0"
			},
			stop() {
				this.msg = '点击开始按钮,开始录音...';
				this.micColor = "#5c6b77";
				recorder.stop()
					.then(({blob,buffer}) => {
						blob = blob;
						this.$emit('stoped',blob);						
					});
				console.log('stoped')
			},
		},
		props:['size']
	}
</script>

<style>
</style>
