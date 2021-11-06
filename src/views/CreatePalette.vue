<template>
	<div class="layout">
		<CreatePaletteHeader />
		<n-layout class="layout2" has-sider>
			<CreatePaletteSidebar
				@addColor="addColor"
				:disableForm="disableForm"
				:colors="colors"
				@clearPalette="clearPalette"
				@addRandomColor="addRandomColor"
			/>
			<CreatePaletteContent :colors="colors" @deleteColor="deleteColor" />
		</n-layout>
	</div>
</template>

<script>
	import { ref, watch } from 'vue'
	import CreatePaletteHeader from '../components/createPalette/CreatePaletteHeader.vue'
	import CreatePaletteSidebar from '../components/createPalette/CreatePaletteSidebar.vue'
	import CreatePaletteContent from '../components/createPalette/CreatePaletteContent.vue'
	import { generateInitialPalette, getRandomColor } from '../utils/seedColors'
	import { useRoute } from 'vue-router'
	export default {
		components: {
			CreatePaletteHeader,
			CreatePaletteSidebar,
			CreatePaletteContent
		},
		setup() {
			const colors = ref([])
			const route = useRoute()
			const disableForm = ref(false)

			if (route.name === 'CreatePalette') {
				colors.value = generateInitialPalette()
			}

			watch(
				() => [...colors.value],
				(newValue) => {
					if (colors.value.length === 20) {
						disableForm.value = true
					} else {
						disableForm.value = false
					}
				}
			)

			const addColor = (color, name) => {
				colors.value.push({ name, value: color })
			}

			const deleteColor = (index) => {
				colors.value = colors.value.filter((color, idx) => idx != index)
			}

			const clearPalette = () => {
				console.log('hello')
				colors.value = []
			}

			const addRandomColor = () => {
				let foundNewColor = false
				while (!foundNewColor) {
					let newColor = getRandomColor()
					if (!colors.value.includes(newColor)) {
						foundNewColor = true
						colors.value.push(newColor)
					}
				}
			}

			return {
				addColor,
				colors,
				disableForm,
				deleteColor,
				clearPalette,
				addRandomColor
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
