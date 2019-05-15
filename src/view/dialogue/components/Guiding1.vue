<template>
    <div class="guide-content">
        <span class="guide-content-title" v-text="data.screenShow">你可以这样问我:</span>
        <ul class="guide-list">
            <li
                class="guide-cell"
                v-for="(item, index) in data.wordArray"
                :key="index"
                :class="(index % 2) == 1 ? 'guide-cell-right' : 'guide-cell-left'"
                @click="actionForCell(item)"
            >
                <GuideCell
                    :title="item.title"
                    :iconName="item.icon"
                    :subtitle="item.subtitle"
                    :bgColor="item.bgcolor"
                />
            </li>
        </ul>
    </div>
</template>
<script>
import GuideCell from "@/view/dialogue/components/GuideCell.vue";
export default {
    name: "Home",
    components: {
        GuideCell
    },
    data() {
        return {};
    },
    methods: {
        actionForCell(item) {
			var query = item.subtitle;
			if(query==undefined || query.length == 0){
				query = item.title;
			}
			console.log(query);
			this.$emit("go", query);
        }
    },
	props:['data']
};
</script>
<style scoped>
.guide-content {
    height: calc(100% - 90px - 120px);
}
.guide-content-title {
    color: #fff;
    font-size: 48px;
    height: 67px;
    line-height: 67px;
    margin: 5% 120px 30px 12%;
    display: inline-block;
    text-shadow: 0px 2px 4px rgba(32, 41, 96, 0.6);
}
.guide-list {
    margin-left: 12%;
    margin-right: 12%;
    list-style-type: none;
    overflow-y: auto;
    height: 75%;
}
.guide-list::-webkit-scrollbar {
    display: none;
}
.guide-cell {
    width: 40%;
}
.guide-cell-left {
    float: left;
}
.guide-cell-right {
    float: right;
}
</style>
