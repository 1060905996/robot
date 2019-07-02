<template>
	<div class="content">
		<Row style="height: 100%;">
			<Col span="6" style="height: 100%;">
				<iLeft />
			</Col>
			<Col span="18" style="height: 100%;">
				<iMain />
			</Col>
		</Row>
	</div>
</template>
<script>
	import iLeft from "@/view/integration/components/i-left.vue";
	import iMain from "@/view/integration/components/i-main.vue";
	export default {
		name: 'integration',
		components: {
			iLeft,
			iMain
		},
		data() {
			return {}
		},
	}
</script>
<style scoped>
	* {
		margin: 0;
		padding: 0;
	}

	body {
		margin: 0;
		padding: 0;
	}

	html,
	body {
		height: 100%;
	}

	.content {
		overflow: auto;
		height: 100%;
		background-color: white;
	}
</style>
