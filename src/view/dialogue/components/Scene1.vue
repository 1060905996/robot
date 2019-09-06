<template>
    <div class="detial-content">
        <p class="p2">{{ data.screenShow }}</p>
		<!-- 中部单张图片 -->
        <div class="single-img-content" v-show="showSingleImg">
            <div class="single-img-box">
                <img class="single-img" :src="img">
            </div>           
        </div>
		<!-- 中部按钮 -->
		 <div class="center-bottom-content" v-show="showCenterBtn">
		    <div class="center-bottom-box">
		        <BottomBar :data="CenterBtns" @go="itemSelect"/> 
		    </div>           
		</div>
       <div class="some-img-content" v-show="showSomeImg">
            <ul ref="imgList">
                <li v-for="(item, index) in imageArr" :key="index" ref="imgListCell">
                    <img :src="item.url" @click="itemSelect(item.goMessage)">
                </li>
            </ul>
            <div class="page-turning" v-show="showPageTurn">
                <i
                    class="iconfont icon-turnleft"
                    :class="{'icon-activated' : turnLeftHighlight}"
                    @click="prePage"
                ></i>
                <i
                    class="iconfont icon-turnright"
                    :class="{'icon-activated' : turnRightHighlight}"
                    @click="nextPage"
                ></i>
            </div>
        </div>
		 <div
		    class="step-btn step-btn-left"
		    :class="{'step-btn-activated' : showPreBtn}"
		    v-show="showPreBtn"
		    @click="itemSelect('上一步')"
		>上一步</div>
		 <div
		    class="step-btn step-btn-right"
		    :class="{'step-btn-activated' : showNextBtn}"
		    v-show="showNextBtn"
		    @click="itemSelect(data.btnNext.goMessage)"
		>下一步</div>
    </div>
</template>
<script>
import BottomBar from "@/view/dialogue/components/BottomBar.vue";
export default {
    name: "Scene1",
    props: ['data'],
	components:{
		BottomBar,
	},
    data() {
        return {
            preBtn: false,
            nextBtn: true,
            screenWidth:
                window.innerWidth ||
                document.documentElement.clientWidth ||
                document.body.clientWidth,
            totalPage: 0, //总页数
            curPage: 1 ,//当前页
			imgServer: "",
			img:"",
			imageArr:[],
			CenterBtns:[],
        };
    },
    mounted() {
        setTimeout(() => {
            this.getTotalPage();
        }, 10);
    },
    methods: {
		itemSelect(query){
			if(query==undefined || query.length==0) return;
			this.$emit("query",query);
		},
        prePage() {
            if (!this.turnLeftHighlight) {
                return;
            }
            this.$nextTick(() => {
                this.$refs.imgList.scrollTo(
                    this.screenWidth * (this.curPage - 1),
                    0
                );
            });
            this.curPage -= 1;
        },
        nextPage() {
            if (!this.turnRightHighlight) {
                return;
            }
            this.$nextTick(() => {
                this.$refs.imgList.scrollTo(
                    this.screenWidth * (this.curPage - 1),
                    0
                );
            });
            this.curPage += 1;
        },
        getTotalPage() {
            this.$nextTick(() => {
                var listWidth = this.$refs.imgList.scrollWidth;
                this.totalPage = Math.ceil(listWidth / this.screenWidth);
            }); 
        }
    },
    computed: {
		showPreBtn(){
			if(this.data.btnPre!=undefined) return true;
			return false;
		},
		showNextBtn(){
			if(this.data.btnNext!=undefined) return true;
			return false;
		},
        showStepBtn() {
            if (this.preBtn || this.nextBtn) {
                return true;
            }
            return false;
        },
       showSingleImg() {
            if (this.data.btnCenters &&this.data.btnCenters.images && this.data.btnCenters.images.length==1) {
					this.img=this.imgServer+this.data.btnCenters.images[0].imgUrl;
					this.getTotalPage();
					return true;
            } 
            return false;
        }, 
		showCenterBtn(){
			if (this.data.btnCenters && this.data.btnCenters.buttons) {
				if(this.data.btnCenters.buttons.length>0){
					var btns = this.data.btnCenters.buttons; 
					this.CenterBtns =[];
					btns.forEach(item=>{
						console.log(item)
						if(item.isShow =="1"){
							this.CenterBtns.push({'textShow':item.textShow,'goMessage':item.goMessage,
									"imgUrl":item.imgUrl,"isShow":item.isShow});
						}
					});
					// 底部按钮也显示在中部
					var btnBottoms = this.data.btnBottoms;
					if(btnBottoms && btnBottoms.length>0){
						btnBottoms.forEach(item=>{
						   this.CenterBtns.push({'textShow':item.textShow,'goMessage':item.goMessage,
								"imgUrl":item.imgUrl,"isShow":item.isShow});
						});
					}
					this.data.btnBottoms = [];
					this.getTotalPage();
					return true;
				}
				
			} 
			return false;
		},
        showSomeImg() {
            if (this.data.btnCenters &&this.data.btnCenters.images &&this.data.btnCenters.images.length > 1) {
				this.imageArr= [];
				this.data.btnCenters.images.forEach(it=>{
					this.imageArr.push({url:this.imgServer+it.imgUrl,goMessage:it.goMessage});
				});
				this.getTotalPage();
                return true;
            } 
            return false;
        },
        showPageTurn() {
            return this.totalPage > 1 ? true : false;
        },
        turnLeftHighlight() {
            return this.curPage > 1 ? true : false;
        },
        turnRightHighlight() {
            if (this.totalPage > 1 && this.totalPage !== this.curPage) {
                return true;
            }
            return false;
        },
		showBottomBar(){
			if (this.data.btnBottoms !=undefined) {
			    return true;
			}
			return false;
		},
    }
};
</script>
<style scoped>
@import "../../../assets/iconfont/iconfont.css";
.detial-content {
    height: calc(100% - 90px - 230px);
    position: relative;
}
p {
    color: rgba(255, 255, 255, 0.9);
}
.p1 {
    margin: 0 120px 10px 12%;
    height: 50px;
    font-size: 36px;
    font-weight: 600;
    line-height: 50px;
}
.p2 {
    margin: 0 120px 0 12%;
    font-size: 18px;
    line-height: 25px;
	z-index: 999;
}
.single-img-box {
    text-align: center;
    display: -webkit-flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 100%;
   /* top: 130px; */
    top:0px;
    bottom: 0px;
}
.single-img {
    max-width: 60%;
    max-height: calc(100% - 50px);;
}
.some-img-content {
    white-space: nowrap;
    position: absolute;
    width: 100%;
    top: 130px;
    bottom: 0px;
}
ul {
    padding: 0px 12% 50px 12%;
    overflow-x: auto;
    height: calc(100% - 50px);
}
ul::-webkit-scrollbar {
    display: none;
}
li {
    display: inline-block;
    padding-right: 10px;
    height: 100%;
}
li:last-child {
    padding: 0;
}
.page-turning {
    position: relative;
    top: -30px;
    text-align: center;
}
.page-turning .iconfont {
    color: rgba(165, 135, 83, 1);
    opacity: 0.3;
    font-size: 40px;
    margin-left: 20px;
    margin-right: 20px;
}
.page-turning .icon-activated {
    opacity: 1;
}
@media screen and (max-width: 1024px) {
    .some-img-content img {
        max-width: 410px;
        max-height: 210px;
        box-shadow: 0px 13px 30px 0px rgba(23, 31, 87, 0.4);
    }
}
@media only screen and (width: 1366px) and (height: 1024px) {
    .some-img-content img {
        max-width: 711px;
        max-height: 400px;
        box-shadow: 0px 13px 30px 0px rgba(23, 31, 87, 0.4);
    }
    .page-turning {
        top: -40px;
    }
}
@media screen and (min-width: 1400px) {
    .some-img-content img {
        max-width: 500px;
        max-height: 280px;
        box-shadow: 0px 13px 30px 0px rgba(23, 31, 87, 0.4);
    }
}
.step-btn {
    width: 90px;
    height: 45px;
    border-radius: 23px;
    border: 1px solid rgba(226, 175, 74, 1);
    opacity: 0.3;
    color: rgba(226, 175, 74, 1);
    font-size: 18px;
    text-align: center;
    line-height: 45px;
    position: absolute;
    bottom: 0px;
}
.step-btn:active {
    opacity: 0.8;
}
.step-btn-left {
    left: 12%;
}
.step-btn-right {
    right: 12%;
}
.step-btn-activated {
    opacity: 1;
}

.center-bottom-content{
	margin: 50px;
}
</style>
