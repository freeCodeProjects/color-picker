<template>
	<n-layout-content class="content">
		<div class="container">
			<n-tabs
				type="line"
				size="large"
				class="tabs"
				tab-style="flex:0"
				pane-style="flex:1; overflow: auto; padding: 0"
				:value="activeTab"
				@update:value="(value) => changeActiveTab(value)"
			>
				<n-tab-pane
					name="sample-palette"
					tab="Sample Palette"
					display-directive="show:lazy"
				>
					<SamplePalette />
				</n-tab-pane>
				<n-tab-pane name="private-palette" tab="My Palette">
					<MyPalette />
				</n-tab-pane>
			</n-tabs>
		</div>
	</n-layout-content>
</template>

<script>
	import { inject } from 'vue'
	import MyPalette from './MyPalette.vue'
	import SamplePalette from './SamplePalette.vue'
	export default {
		components: { SamplePalette, MyPalette },
		setup() {
			const activeTab = inject('activeTab')
			const changeActiveTab = inject('changeActiveTab')

			return {
				activeTab,
				changeActiveTab
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding: var(--space-3);
	}

	.tabs {
		display: flex;
		flex-direction: column;
		height: inherit;
		overflow: hidden;
	}
</style>
