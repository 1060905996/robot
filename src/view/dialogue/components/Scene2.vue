<template>
    <div class="issue-content">
		 <p class="p2">{{ data.screenShow }}</p>
        <p class="user-sub-question">{{ data.promptVagueMsg }}</p>
        <ul v-show="showCluesList">
            <li v-for="(item, index) in data.wordArray" :key="index" @click.stop="selectItem(item)">
                <span class="list-title">{{ item }}</span>
                <span class="iconfont icon-right"></span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "Scene2",
    props: ['data'],
    data() {
        return {
            inputType: "",
            cluesMsg: "",
        };
    },
    mounted() {
		
    },
    methods: {
       selectItem(item){
       	 this.$emit("query",item);
       }
    },
    computed: {
        showSpeechClues() {
            return this.inputType === "speech";
        },
       showQuestion() {
            if (this.data.question && this.data.question.length > 0) {
                return true;
            }
            return false;
        },
       
        showCluesList() {
            if (this.data.wordArray && this.data.wordArray.length > 0) {
                return true;
            }
            return false;
        }
    }
};
</script>

<style scoped>
@import "../../../assets/iconfont/iconfont.css";
.issue-content {
    padding-top: 1px;
    height: calc(100% - 90px - 230px);
}
.speech-clues {
    margin: 100px 120px 20px 12%;
    font-size: 48px;
    font-family: PingFangTC-Semibold;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
}
.user-question {
    margin: 100px 120px 20px 12%;
    font-size: 22px;
    font-family: PingFangTC-Semibold;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.6);
    line-height: 30px;
}
.user-question-clues {
    margin: 20px 120px 0px 12%;
    font-size: 24px;
    font-family: PingFangTC-Semibold;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
    line-height: 33px;
}
.uset-question-sub-clues {
    margin: 100px 120px 20px 12%;
}
.user-sub-question {
    margin: 20px 120px 0px 12%;
    font-size: 20px;
    font-family: PingFangTC-Semibold;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
    line-height: 28px;
}
.clues-buttons {
    margin: 20px 10% 0 12%;
    /* background-color: yellow; */
    padding-left: 48px;
}
.clues-buttons span {
    width: 150px;
    height: 50px;
    display: inline-block;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 6px;
    font-size: 24px;
    font-family: PingFangTC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    text-align: center;
    line-height: 50px;
    margin-right: 10px;
    margin-top: 20px;
}
ul {
    margin: 50px 10% 0 12%;
    list-style-type: none;
    padding-left: 48px;
    z-index: 999;
	height: calc(100% - 30px);
    overflow-x: hidden;
    overflow-y: scroll;
}
li {
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    height: 44px;
    display: -webkit-flex;
    align-items: center;
    padding: 0 0 0 5px;
}
.list-title {
    -webkit-flex: 1;
    font-size: 20px;
    font-family: PingFangTC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.8);
}
.icon-right {
    color: rgba(231, 202, 141, 0.8);
    font-size: 16px;
}

.p2 {
    margin: 0 120px 0 12%;
    font-size: 18px;
    line-height: 25px;
	z-index: 999;
}
p {
    color: rgba(255, 255, 255, 0.9);
}
</style>