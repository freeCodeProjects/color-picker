<template>
	<div class="layout">
		<CreatePaletteHeader />
		<n-layout class="layout2" has-sider>
			<CreatePaletteSidebar @addColor="addColor" />
			<CreatePaletteContent />
		</n-layout>
	</div>
</template>

<script>
	import { ref } from 'vue'
	import CreatePaletteHeader from '../components/createPalette/CreatePaletteHeader.vue'
	import CreatePaletteSidebar from '../components/createPalette/CreatePaletteSidebar.vue'
	import CreatePaletteContent from '../components/createPalette/CreatePaletteContent.vue'
	import { generateInitialPalette } from '../utils/seedColors'
	export default {
		components: {
			CreatePaletteHeader,
			CreatePaletteSidebar,
			CreatePaletteContent
		},
		setup() {
			const addColor = (color, name) => {
				console.log(color, name)
			}

			generateInitialPalette()

			return {
				addColor
			}
		}
	}
</script>

<style lang="scss" scoped>
	.layout2 {
		flex: 1;
		display: flex;
		height: calc(100% - var(--header-height));
	}
</style>
