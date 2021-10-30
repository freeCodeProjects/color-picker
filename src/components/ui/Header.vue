<template>
	<n-layout-header class="header" bordered>
		<div class="container header-content">
			<slot></slot>
		</div>
	</n-layout-header>
</template>
<script>
	export default {}
</script>
<style lang="scss" scoped>
	.header {
		height: var(--header-height);
		display: flex;
		align-items: center;
	}
	.header-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
</style>
