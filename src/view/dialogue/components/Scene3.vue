<template>
	<!-- 未识别问题,answerId==3 -->
    <div class="detail-content">
    <!--    <p class="p1">{{ data.question }}</p> -->
        <p class="p2">{{ data.screenShow }}</p>
      <!--  <p class="p3">相关的信息：</p> -->
        <!--<div class="text-box">
            <p>{{ data.screenShow }}</p>
            <div>
                <img v-for="(item, index) in data.images" :key="index" :src="item">
            </div>
        </div>  -->
    </div>
</template>
<script>
export default {
    name: "Scene3",
    props: {
        data: {
            type: Object,
        }
    },
    data() {
        return {
          
        }
    },
}
</script>
<style scoped>
.detail-content {
   height: calc(100% - 90px - 230px);
}
.p1 {
    margin: 0px 120px 10px 12%;
    height: 25px;
    font-size: 18px;
    font-family: PingFangTC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.8);
    line-height: 25px;
}
.p2 {
    margin: 0 120px 15px 12%;
    height: 50px;
    font-size: 36px;
    font-family: PingFangTC-Semibold;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
    line-height: 50px;
	padding-top: 5%;
}
.p3 {
    margin: 0 120px 0 12%;
    height: 25px;
    font-size: 18px;
    font-family: PingFangTC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 25px;
}
.text-box {
    width: 76%;
    margin: 50px 6% 10px 12%;
    height: calc(100% - 185px);
    overflow-y: auto;
}
.text-box::-webkit-scrollbar {
    display: none;
}
.text-box p {
    font-size: 18px;
    font-family: PingFangTC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
}
.text-box div {
    width: 100%;
    text-align: center;
}
.text-box img {
    max-width: 800px;
    max-height: 450px;
    display: block;
    margin: 15px auto;
}
</style>
