<template>
    <div class="items-content">
        <ul>
            <li>
                <BottomItem
                    v-for="(item, index) in data"
                    :key="index+item.textShow"
                    :title="item.textShow"
                    @itemSelected="doSomething(item)"
                />
            </li>
        </ul>
    </div>
</template>

<script>
import BottomItem from "@/view/dialogue/components/BottomItem.vue";
export default {
    name: "FunBar",
    components: {
        BottomItem
    },
	props:['data'],
    data() {
        return {
          
        };
    },
    methods: {
        doSomething(item) {
            this.$emit('go', item.goMessage);
        }
    }
};
</script>

<style scoped>
@import "../../../assets/iconfont/iconfont.css";
.items-content {
    padding-top: 1px;
	height: 120px;
    text-align: center;
    width: 100%;
}

</style>
