<template>
  <div style="height: 100%;width:100%;">
    <div style="overflow-y: auto;background-color: #f9fbee;width: 100%;height: calc(100% - 90px);">
      <table style="width: 100%;height: 100%;">
        <tr style="height: 20%">
          <td style="width: 20%" align="left">
            <div class="bubble">
              <a class="triangle"></a>
              <div class="demo clearfix fr">
                <div class="article" id="advertText">{{advertText}}</div>
              </div>
            </div>
          </td>
          <td valign="top" align="center" style="width: 60%">
            <table align="right" style="width: 100%">
              <tr>
                <td style="width: 70%;">
                  <p id="screenId" style="font-size: 16px;"><br/>{{screenShow}}</p>
                </td>
                <td valign="top"></td>
              </tr>
            </table>
          </td>
          <td align="right">
            <img v-if="btnCancel != null" id="mainPage" :src="btnCancel.imgUrl" @click="goMessage('返回首页')" style="cursor:pointer;"></img>
          </td>
        </tr>
        <tr style="height: 60%">
          <td style="width: 20%" id="btnPreId">
            <img v-if="btnPre != null && btnPre.imgUrl != null" :src="btnPre.imgUrl" @click="goMessage(btnPre.goMessage)"
                 style="cursor:pointer;"></img>
          </td>
          <td id="centerId" style="width: 60%" align="center">
            <div v-if="buttons!=null && buttons.length > 0">
            <span v-for="button in buttons">
              <!-- 判断是普通按钮还是图片 -->
              <input v-if="button.imgUrl.includes('common-bottom-button')" :value="button.textShow" :style="{'background':'url('+button.imgUrl+')'}" @click="goMessage(button.goMessage)" class="imgBtn">
              <img v-else :src="button.imgUrl" @click="goMessage(button.goMessage)" style="cursor:pointer;"/>
            </span>
            </div>
            <div v-if="images != null && images.length > 0">
              <img v-for="image in images" :src="image.imgUrl" style="max-width:750px;max-height:400px;"></img>&nbsp;
            </div>
            <div v-if="imageUrl != null && imageUrl != ''">
              <img :src="imageUrl" style="max-width:750px;max-height:400px;"></img>&nbsp;
            </div>
            <div>
              <ul v-if="wordArray != null" style="width: 600px;list-style:none;">
                <li style="width: 600px;font-size: 25px;margin-bottom: 50px;" align="left">{{promptVagueMsg}}</li>
                <li v-for="(word, i) in wordArray" style="width: 50%;float:left;line-height: 40px;" align="left">
                  <a style='font-size:25px;text-decoration: none;color:blue' href='#' @click='goMessage(word)'>{{word}}</a>
                </li>
              </ul>
            </div>
          </td>
          <td style="width: 20%" id="nextId">
            <img v-if="btnNext != null && btnNext.imgUrl != null" :src="btnNext.imgUrl"
                 @click="goMessage(btnNext.goMessage)" style="cursor:pointer;"></img>
          </td>
        </tr>
        <tr style="height: 20%">
          <td></td>
          <td id="bottomId" valign="middle" align="center">
            <div v-if="btnBottoms != null">
            <span v-for="btnBottom in btnBottoms">
              <input :style="{'background':'url('+btnBottom.imgUrl+')'}" class="imgBtn" :value="btnBottom.textShow"
                     @click="goMessage(btnBottom.goMessage)"></input>&nbsp;
            </span>
            </div>
          </td>
          <td></td>
        </tr>
      </table>
    </div>

    <div style="height: 90px;">
      <div>
        <div style="float: left;">
          <Icon title="扬声器" :type="openvoice?'md-volume-up':'md-volume-off'" size="24" @click="change('openvoice')" :class="{open: openvoice}" :style="{margin: '0 10px'}" />
        </div>
        <div class="iconRight" style="float: right;">
          <Input title="终端编号" v-model="deviceId" placeholder="终端编号" style="width: 150px" />
          <Icon  title="返回首页" @click="goMessage('返回首页')" type="md-refresh-circle"  size="24" :style="{margin: '0 0px'}"/>
          <!--<Icon  @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>-->
        </div>
      </div>
      <div>
        <div>
          <textarea v-model="query" ref="question" @keyup.enter="goQueue" style="width: 100%;" placeholder="Enter something..." rows="2" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ccb",
    data: function () {
      return {
				url : this.config.server.queryServerUrl,
        platformId: "2",
        deviceId: 'GZ001',
        queryType: 1,
        query: '返回首页',//用户输入的问题
        userId: null,
        advertText: null,
        type: null,
        wordArray: null,
        btnCenters: null,
        btnBottoms: null,
        btnPre: null,
        btnNext: null,
        btnCancel: null,
        screenShow: null,
        buttons: [],
        images: null,
        imageUrl: null,
        openvoice: false,
        promptVagueMsg: '你可以这样问',
        screeFront: {}, //屏幕样式
        inputFront: {}  // 输入样式
      }
    },
    methods: {
      goQueue() {
        this.userId = this.guid();
        this.$http.get(this.url+"CSRBroker/queryMessage",
          {
            params: {
              query: this.query, queryType: this.queryType,platformId: this.platformId,
              deviceId: this.deviceId, userId: this.userId, messageId: this.messageId
            }
          }).then(res => {
          if (res.body.result == '1'){
            alert(res.body.errorMsg);
            return;
          }
          this.advertText = res.body.question;
          //如果答案类型为1
          if (res.body.answerId == '1') {
            //清除页面原有数据
            this.clearPage();
            this.type = res.body.richText.richType;
            //获取回答的内容
            this.screenShow = res.body.richText.richContent.screenShow;
            if (this.type == 'guiding') {
              //获取提问关键词
              this.wordArray = res.body.richText.richContent.word;
            } else if (this.type == 'scene') {
              //获取中间的按钮
              this.btnCenters = res.body.richText.richContent.btnCenters;
              //获取下端的按钮
              this.btnBottoms = res.body.richText.richContent.btnBottoms;
              //左边按钮
              this.btnPre = res.body.richText.richContent.btnPre;
              //右边按钮
              this.btnNext = res.body.richText.richContent.btnNext;
              //返回首页按钮
              this.btnCancel = res.body.richText.richContent.btnCancel;
              if (this.btnCenters != null) {
                this.buttons = this.btnCenters.buttons;
                this.images = this.btnCenters.images;
              }
            } else if (type == "queue") {
              this.imageUrl = res.body.richText.richContent.imageUrl;
              alert("答案1：queue");
            }
          } else if (res.body.answerId == '2') {
            this.clearPage();
            this.screenShow = res.body.recommendText.screenShow;
            this.wordArray = res.body.recommendText.questionList;
            this.promptVagueMsg = res.body.recommendText.recommondMsg;
          } else if (res.body.answerId == '3') {
            alert("答案3");
          }
        });
        //清空问题输入框
        this.query = '';
        this.$refs.question.focus();//光标聚焦
      },
      guid() {
        return this.S4() + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4();
      },
      S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      },
      // 清除页面
      clearPage() {
        this.type = null;
        this.screenShow = null;
        this.wordArray = null;
        this.btnCenters = null;
        this.buttons = null;
        this.images = null;
        this.imageUrl = null;
        this.btnBottoms = null;
        this.btnCancel = null;
        this.promptVagueMsg = '你可以这样问';
      },
      goMessage(message) {
        this.query = message;
        this.goQueue();
      },
      change(flag) {
        this[flag] = !this[flag]
      }
    },
    mounted() {
      this.goQueue();
    }

    /*computed: {
      rotateIcon() {
        return [
          'menu-icon',
          this.isCollapsed ? 'rotate-icon' : ''
        ];
      }
    }*/
  }
</script>

<style type="text/css">
  #frame { /*----------图片轮播相框容器----------*/
    position: absolute; /*--绝对定位，方便子元素的定位*/
    width: 750px;
    height: 400px;
    overflow: hidden; /*--相框作用，只显示一个图片---*/
    border-radius: 5px;
  }

  #photos img {
    float: left;
    width: 750px;
    height: 400px;
  }

  #photos { /*---设置总的图片宽度--通过位移来达到轮播效果----*/
    position: absolute;
    z-index: 9;
    width: calc(750px * 2); /*---修改图片数量的话需要修改下面的动画参数*/
  }

  .play {
    animation: ma 10s ease-out infinite alternate; /**/
  }

  @keyframes ma { /*---每图片切换有两个阶段：位移切换和静置。中间的效果可以任意定制----*/
    0%, 20% {
      margin-left: 0px;
    }
    25%, 40% {
      margin-left: -750px;
    }
  }

  .bubble {
    margin: 0px auto;
  }

  .demo {
    padding-left: 50px;
    position: relative;
  }

  .triangle {
    position: absolute;
    margin-top: 8px;
    left: 3px;
    display: block;
    width: 0;
    height: 0;
    overflow: hidden;
    line-height: 0;
    font-size: 0;
    border-bottom: 8px solid #FFF;
    border-top: 8px solid #FFF;
    border-left: none;
    border-right: 8px solid #3079ED;
  }

  .demo .article {
    float: left;
    color: #FFF;
    display: inline-block;
    *display: inline;
    zoom: 1;
    padding: 5px 10px;
    border: 1px solid #3079ED;
    background: #eee;
    border-radius: 5px;
    background-color: #4D90FE;
    background-image: -webkit-gradient(linear, left top, left bottom, from(#4D90FE), to(#4787ED));
    background-image: -webkit-linear-gradient(top, #4D90FE, #4787ED);
    background-image: -moz-linear-gradient(top, #4D90FE, #4787ED);
    background-image: linear-gradient(top, #4D90FE, #4787ED);
  }

  .fr {
    padding-left: 0px;
  }

  .fr .triangle {
    left: auto;
    right: 42px;
    border-bottom: 8px solid #FFF;
    border-top: 8px solid #FFF;
    border-right: none;
    border-left: 8px solid #3079ED;
  }

  .fr .article {
    float: left;
  }

  .imgBtn {
    width: 240px;
    height: 58px;
    border: 0;
    font-size: 23px;
    text-align: center;
    font-weight: bold;
    cursor: pointer;
  }
  .open {
       color: #2d8cf0;
     }

</style>
