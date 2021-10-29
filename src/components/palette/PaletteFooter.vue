<template>
	<n-layout-footer bordered style="footer">
		<div
			class="container"
			style="padding: var(--space-1); display: flex; justify-content: end"
		>
			<strong>This is the footer</strong>
		</div>
	</n-layout-footer>
</template>

<script>
	export default {
		setup() {
			return {}
		}
	}
</script>

<style lang="scss" scoped>
	.footer {
		flex: 1 0 var(--footer-height);
	}
</style>
