<template>
	<div class="layout">
		<CreatePaletteHeader
			@savePalette="savePalette"
			:disableSaveButton="disableSaveButton"
		/>
		<n-layout class="layout2" has-sider>
			<CreatePaletteSidebar
				@addColor="addColor"
				:disableForm="disableForm"
				:colors="colors"
				@clearPalette="clearPalette"
				@addRandomColor="addRandomColor"
			/>
			<CreatePaletteContent
				:colors="colors"
				@deleteColor="deleteColor"
				@reArrangeColor="reArrangeColor"
			/>
		</n-layout>
		<SavePaletteModal
			:showSaveModal="showSaveModal"
			@closeModal="showSaveModal = !showSaveModal"
		/>
	</div>
</template>

<script>
	import { ref, watch, computed, defineAsyncComponent } from 'vue'
	import { NLayout } from 'naive-ui'
	import CreatePaletteHeader from '../components/createPalette/CreatePaletteHeader.vue'
	import CreatePaletteSidebar from '../components/createPalette/CreatePaletteSidebar.vue'
	import CreatePaletteContent from '../components/createPalette/CreatePaletteContent.vue'
	import { generateInitialPalette, getRandomColor } from '../utils/seedColors'
	import { useRoute } from 'vue-router'
	const SavePaletteModal = defineAsyncComponent(() =>
		import('../components/createPalette/SavePaletteModal.vue')
	)
	export default {
		components: {
			CreatePaletteHeader,
			CreatePaletteSidebar,
			CreatePaletteContent,
			SavePaletteModal,
			NLayout
		},
		setup() {
			const colors = ref([])
			const route = useRoute()
			const disableForm = ref(false)
			const showSaveModal = ref(false)

			const disableSaveButton = computed(() => colors.value == 0)

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

			const reArrangeColor = (oldIdx, newIdx) => {
				const tempColors = colors.value
				const temp = tempColors[oldIdx]
				tempColors.splice(oldIdx, 1)
				tempColors.splice(newIdx, 0, temp)
				colors.value = tempColors
			}

			const savePalette = () => {
				showSaveModal.value = !showSaveModal.value
			}

			return {
				addColor,
				colors,
				disableForm,
				deleteColor,
				clearPalette,
				addRandomColor,
				reArrangeColor,
				showSaveModal,
				disableSaveButton,
				savePalette
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
