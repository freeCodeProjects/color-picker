<template>
	<n-layout-content class="content">
		<div class="container">
			<n-tabs
				type="line"
				size="large"
				class="tabs"
				tab-style="flex:0"
				pane-style="flex:1; overflow: auto; padding: 0"
			>
				<n-tab-pane
					name="sample-palette"
					tab="Sample Palette"
					display-directive="show"
				>
					<SamplePalette />
				</n-tab-pane>
				<n-tab-pane name="my-palette" tab="My Palette">
					<MyPalette />
				</n-tab-pane>
			</n-tabs>
		</div>
	</n-layout-content>
</template>

<script>
	import MyPalette from './MyPalette.vue'
	import SamplePalette from './SamplePalette.vue'
	export default {
		components: { SamplePalette, MyPalette }
	}
</script>

<style lang="scss" scoped>
	.content {
		padding: var(--space-3);
		flex: 1;
	}

	.tabs {
		display: flex;
		flex-direction: column;
		height: inherit;
		overflow: hidden;
	}
</style>
