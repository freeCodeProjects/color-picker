<template>
	<n-layout-content class="content">
		<n-scrollbar> This is content </n-scrollbar>
	</n-layout-content>
</template>

<script>
	export default {
		setup() {
			return {}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		flex: 1;
		overflow: auto;
	}
</style>
