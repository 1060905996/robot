<template>
    <div>
        <div class="bar-content" :class="{'bar-active' : barActive}">
            <Icon
                class="icon-button"
                v-for="(item, index) in iconList"
                :key="index"
                :class="{'icon-select' : item.isSelect}"
                :type="item.icon"
                :color="item.color"
                @click.native="switchInput(item, index)"
            />
            <input
                class="search-input"
                ref="inputVal"
                type="text"
				placeholder="输入enter发送信息..."
                v-show="keyboardType"
                v-on:keyup.enter="submitQuestion"
                @blur="cancelInputState"
                v-model="question"
            >
            <Icon
                class="speech-main"
                :type="'yuyin1'"
                :color="'#FFFFFF'"
                :bgColor="'#467cf3'"
                v-show="speechType"
            />
            <!-- 语音输入的波纹，根据实际情况 判断显示隐藏 -->
           <div class="speech-gifbg"  v-show="speechType">
                <div class="dot dot1"></div>
                <div class="dot dot2"></div>
            </div>
            <Icon
                class="speech-cancel"
                :type="'guanbi'"
                :color="'rgba(255, 255, 255, 0.6)'"
                :size="18"
                v-show="speechType"
                @click.native="closeSpeech"
            /> 
        </div>
    </div>
</template>

<script>
import Icon from "@/view/dialogue/components/Icon.vue";
import { truncate } from "fs";
export default {
    name: "InputBar",
    components: {
        Icon
    },
    data() {
        return {
            selectIcon: {},
            iconList: [
                {
                    icon: "yuyin",
                    color: "rgba(255, 255, 255, 0.9)",
                    isSelect: false // 按钮是否被选中，用于修改按钮是否选中的样式
                },
                {
                    icon: "jianpan",
                    color: "rgba(255, 255, 255, 0.9)",
                    isSelect: false
                }
            ],
            isEnter: false,
            question: "",
            canCancel: false,
            inputType: ""
        };
    },
    mounted() {
        this.bus.$on("removeInput", () => {
            this.isEnter = false;
            this.canCancel = true;
            this.cancelInputState();
        });
    },
    methods: {
        switchInput(item, index) {
            if (item.isSelect) {
                return;
            }

            item.isSelect = true;
            this.selectIcon.isSelect = false;
            this.selectIcon = item;

            if (index === 0) {
                this.inputType = "speech";
                this.isEnter = false;
                this.question = "";
            } else {
                this.inputType = "keyboard";
                this.inputFocus();
            }

            this.bus.$emit("inputTypeEmit", this.inputType);
            this.$emit("inputTypeEmit", this.inputType);
        },
        submitQuestion() {
           // this.inputBlur();
            if (this.question.length > 0) {
                this.isEnter = true;
                // 将用户输入的问题传到dialogue,再dialogue发起请求
                this.$emit("submitQuestion", this.question);
				this.question = "";
            }
			///this.inputFocus();
        },
        inputFocus() {
            this.$nextTick(function() {
                // 让input聚焦
                this.$refs.inputVal.focus();
            });
        },
        inputBlur() {
            // 让input失去焦点
            this.$nextTick(function() {
                this.$refs.inputVal.blur();
            });
        },
        closeSpeech() {
            this.canCancel = true;
            this.cancelInputState();
        },
        cancelInputState() {
            if (this.isEnter || !this.canCancel) {
                return;
            }
            this.inputType = "";
            this.question = "";
            this.selectIcon.isSelect = false;
            this.$emit("inputTypeEmit", this.inputType);
        },
        cancelFromHome() {
            this.isEnter = false;
            this.canCancel = true;
            this.cancelInputState();
        }
    },
    computed: {
        speechType() {
            return this.inputType === "speech" ? true : false;
        },
        keyboardType() {
            return this.inputType === "keyboard" ? true : false;
        },
        barActive() {
            return this.inputType.length > 0 ? true : false;
        }
    }
};
</script>

<style scoped>
@import "../../../assets/iconfont/iconfont.css";
.bar-content {
    height: 90px;
    width: 100%;
    display: -webkit-flex;
    align-items: center;
}
.bar-active {
    background-color: rgba(255, 255, 255, 0.05);
    box-shadow: 0px 0px 0px 1px rgba(79, 81, 139, 0.4);
}
.icon-button {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    font-size: 28px;
    color: #fff;
    margin-left: 30px;
    text-align: center;
    line-height: 30px;
    display: inline-block;
}
.icon-select {
    opacity: 0.2;
}
.search-input {
    border: none;
    height: 44px;
    margin-right: 30px;
    margin-left: 30px;
    border-radius: 4px;
    -webkit-flex: 1;
    flex: 1;
    outline: none;
	font-size: 20px;
}

.speech-main {
    width: 46px;
    height: 46px;
    line-height: 46px;
    border-radius: 50%;
    text-align: center;
    position: relative;
    left: -60px;
    margin: 0 auto;
    z-index: 90;
}

.speech-cancel {
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    margin-top: -50px;
}
.speech-gifbg {
    width: 90px;
    height: 90px;
    position: absolute;
    left: 50%;
    margin-left: -65px; 
}
.dot {
    position: absolute;
    box-sizing: border-box;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    opacity: 0;
    width: 90px;
    height: 90px;
    left: 0px;
    top: 0px;
    border: 5px solid #467cf3;
    -webkit-animation: warn 1s ease-out;
    -moz-animation: warn 1s ease-out;
    animation: warn 1s ease-out;
    -webkit-animation-iteration-count: infinite;
    -moz-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
}

.dot1 {
    z-index: 2;
    animation-delay: 0.25s;
    -webkit-animation-delay: 0.25s;
}

.dot2 {
    z-index: 3;
    animation-delay: 0.75s;
    -webkit-animation-delay: 0.75s;
}
@keyframes warn {
    0% {
        transform: scale(0.6);
        opacity: 0.8;
    }
    15% {
        transform: scale(0.65);
        opacity: 0.7;
    }
    30% {
        transform: scale(0.7);
        opacity: 0.6;
    }
    45% {
        transform: scale(0.75);
        opacity: 0.5;
        border: 3px solid #467cf3;
    }
    60% {
        transform: scale(0.8);
        opacity: 0.4;
    }
    75% {
        transform: scale(0.9);
        opacity: 0.2;
        border: 1px solid #467cf3;
    }
    90% {
        transform: scale(0.95);
        opacity: 0.1;
    }
    100% {
        transform: scale(1);
        opacity: 0;
        border: 1px solid #467cf3;
    }
}
</style>