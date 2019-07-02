<template>
    <div class="detail-nav">	
		<div class="question" @click="back" v-show="showQuestion">
			<div class="balloon-left"><p class="question-text">{{data.question}}</p></div>
			
	    </div>		
        <div class="back-home" @click="backHome" v-show="showBackHome" title="返回首页">
            <span class="iconfont icon-chongxinhuihua"></span>
            <div class="icon-text">重新对话</div>
        </div>
    </div>
</template>
<script>
export default {
    name: "DetailNav",
	props:["data"],
    methods: {
        back() {
            this.$emit("backPrePage");
        },
        backHome() {
            this.$emit("backHome");
        }
    },
	computed:{
		showBackHome(){
			if (this.data.btnCancel) {
			    return true;
			}
			return false; 
		},
		showQuestion(){
			if(this.data.question && this.data.question.length>0) return true;
			return false;
		},
	}
};
</script>
<style scoped>
@import "../../../assets/iconfont/iconfont.css";
.detail-nav {
    display: flex;
    height: 15%;
    padding: 0 5% 0 5%;
}
.question {
    flex: 1;
    margin-top: 15px;
}
.back-home {
    width: 70px;
    margin-top: 15px;
    text-align: center;
}

.back-home .icon-chongxinhuihua {
    background-image: -webkit-linear-gradient(
        left,
        rgba(121, 181, 91, 1),
        rgba(36, 170, 226, 1)
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 60px !important;
}

.back-home .icon-text {
    -webkit-text-size-adjust: none;
    color: rgba(255, 255, 255, 0.8);
    font-size: 10px !important;
    font-family: PingFangTC-Regular;
    font-weight: 400;
    margin-top: -8px;
}
.balloon-left {

  position: relative;

  display: inline-block;

  padding: 0 15px;

  max-width: 100%;

  height: 35px;

  line-height: 34px;

  text-align: left;

  background: #e0f4e0;

  border: 3px solid #e0f4e0;

  z-index: 0;
  border-radius: 5px;
}
.balloon-left:before {

  border-style: solid;

  border-width: 10px 10px 10px 0;

  border-color: transparent #e0f4e0 transparent transparent;

  content: "";

  position: absolute;

  top: 50%; left: -8px;

  margin-top: -9px;

  display: block;

  width: 0px;

  height: 0px;

  z-index: 0;

}

.balloon-left:after {

  border-style: solid;

  border-width: 11px 11px 11px 0;

  border-color: transparent #e0f4e0 transparent transparent;

  content: "";

  position: absolute;

  top: 50%; left: -12px;

  margin-top: -10px;

  display: block;

  width: 0px;

  height: 0px;

  z-index: -1;

}
.question-text{
	display: inline-block;
}
</style>
