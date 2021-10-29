<template>
	<n-layout-header class="header" bordered>
		<div class="container">
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
		padding: var(--space-1) var(--space-4);
		display: flex;
		align-items: center;
	}
</style>
