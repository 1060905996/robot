<template>
	<!-- :class="{'item-select' : itemInfo.isSelect}" -->
    <div class="items"  @click="actionForItem">
        <div class="iconfont" :class="itemInfo.icon"></div>
        <div class="item-title">{{ title }}</div>
    </div>
</template>
<script>
import IconInfo from "../../../assets/dialogue/iconinfo.json";

export default {
    name: "BottomItem",
    props: {
        title: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            funItemsArr: IconInfo.funItemsInfo,
            // iconName: "",
            itemInfo: {},
            selectInfo: {}
        };
    },
    mounted() {
		var title = this.title;
		var iconItem = IconInfo.funItemsInfo[title];
		if(iconItem==undefined){
			var item = IconInfo.expand[title];
			if(item==undefined){
				iconItem=IconInfo.funItemsInfo["default"];
			}else{
				iconItem = IconInfo.funItemsInfo[item];
			}
		}
		this.itemInfo=iconItem;
    },
    methods: {
        actionForItem() {
			this.$emit("itemSelected");
        }
    }
};
</script>
<style scoped>
@import "../../../assets/iconfont/iconfont.css";
.items {
    display: inline-block;
   /* margin: 42px 10px 0 10px; */
    margin: 10px 10px 0 10px;
}
.items .iconfont {
    color: rgba(255, 255, 255, 0.8);
    font-size: 36px;
    width: 106px;
    height: 70px;
    line-height: 70px;
    margin-bottom: 10px;
    background-color: rgba(67, 76, 143, 0.9);
    box-shadow: 0px 18px 40px 0px rgba(34, 37, 113, 0.4);
    border-radius: 4px;
}
.items .item-title {
    color: rgba(255, 255, 255, 0.8);
    height: 22px;
    font-size: 16px;
    font-family: PingFangTC-Regular;
    font-weight: 400;
    line-height: 22px;
	width: 106px;
	word-wrap: break-word;
}
.item-select {
    /* margin: 42px 10px 10px 10px; */
	margin: 20px 10px 10px 10px;
    position: relative;
    top: -10px;
}
.item-select .iconfont {
    color: rgba(255, 255, 255, 1);
    background-color: rgba(61, 123, 255, 1);
    box-shadow: 0px 18px 40px 0px rgba(27, 93, 233, 0.6);
}
.item-select .item-title {
    color: rgba(255, 255, 255, 1);
}
</style>
