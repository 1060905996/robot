<template>
    <div class="cell-content">
        <Icon class="icon" :type="iconName" :bgColor="bgColor"/>
        <div class="explain">
            <span class="explain-title1">{{ title }}</span>
            <span class="explain-title2">{{ subtitle }}</span>
        </div>
        <Icon class="arrow" :type="'right'" :color="'rgba(231, 202, 141, 0.8)'" :size="15"/>
    </div>
</template>

<script>
import Icon from "@/view/dialogue/components/Icon.vue";
import IconInfo from "../../../assets/dialogue/iconinfo.json";
export default {
    name: "GuideList",
    props: {
        title: {
            type: String,
            required: true
        },
        subtitle: {
            type: String
        }
    },
    components: {
        Icon
    },
    data() {
        return {
            iconName: "",
            bgColor: "",
            configArr: IconInfo.guideCellIconInfo
        };
    },
    mounted() {
		var iconItem = this.configArr[this.title];		
		console.log(iconItem + "  " + this.title);
		if(iconItem==undefined){
			iconItem=this.configArr["default"];
		}
		console.log(iconItem);
		this.iconName = iconItem.icon;
		this.bgColor = iconItem.bgcolor;
        /* for (let i = 0; i < this.configArr.length; i++) {
            var item = this.configArr[i];
            if (item.title === this.title) {
                this.iconName = item.icon;
                this.bgColor = item.bgcolor;
            }
        } */
    }
};
</script>

<style scoped>
.cell-content {
    width: 100%;
    display: -webkit-flex;
    align-items: center;
    height: 90px;
}

.icon {
    width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 7px;
}

.explain {
    width: 80%;
}

.explain span {
    margin-left: 10px;
    display: block;
}
.explain .explain-title1 {
    color: #ffffff;
    font-size: 15px;
    font-weight: 600;
    font-family: PingFangTC-Semibold;
}
.explain .explain-title2 {
    color: rgba(255, 255, 255, 0.5);
    font-weight: 400;
    font-size: 15px;
    font-family: PingFangTC-Regular;
}
.arrow {
    float: right;
}
</style>
