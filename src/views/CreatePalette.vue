<template>
	<div class="layout">
		<CreatePaletteHeader
			@openSaveModal="showSaveModal = !showSaveModal"
			@deletePalette="deletePalette"
			:disableSaveButton="disableSaveButton"
			:paletteLoading="paletteLoading"
			:deletePaletteLoading="deletePaletteLoading"
			:action="action"
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
				:loading="paletteLoading"
				@deleteColor="deleteColor"
				@reArrangeColor="reArrangeColor"
			/>
		</n-layout>
		<SavePaletteModal
			:paletteInfo="paletteInfo"
			:showSaveModal="showSaveModal"
			:loading="formLoading"
			@closeModal="showSaveModal = !showSaveModal"
			@savePalette="savePalette"
		/>
	</div>
</template>

<script>
	import { ref, computed, defineAsyncComponent, toRefs } from 'vue'
	import { NLayout, useMessage } from 'naive-ui'
	import CreatePaletteHeader from '../components/createPalette/CreatePaletteHeader.vue'
	import CreatePaletteSidebar from '../components/createPalette/CreatePaletteSidebar.vue'
	import CreatePaletteContent from '../components/createPalette/CreatePaletteContent.vue'
	import { generateInitialPalette, getRandomColor } from '../utils/seedColors'
	import { useRoute, useRouter } from 'vue-router'
	import { Palette } from '../../firebase/models'

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
		props: {
			id: String
		},
		setup(props) {
			const { id } = toRefs(props)
			const colors = ref([])
			const showSaveModal = ref(false)
			const formLoading = ref(false)
			const paletteLoading = ref(false)
			const deletePaletteLoading = ref(false)
			const paletteInfo = ref({ name: '', emoji: '' })

			const route = useRoute()
			const router = useRouter()
			const message = useMessage()
			const action = route.name

			const disableSaveButton = computed(() => colors.value.length === 0)
			const disableForm = computed(() => colors.value.length >= 20)

			const init = async () => {
				if (action === 'CreatePalette') {
					colors.value = generateInitialPalette()
				} else {
					paletteLoading.value = true
					try {
						const palette = await Palette.getById(id.value)
						colors.value = palette.colors
						paletteInfo.value = {
							name: palette.paletteName,
							emoji: palette.emoji
						}
					} catch (error) {
						console.log('Failed to fetch palette.')
						message.error('Failed to fetch palette.')
					} finally {
						paletteLoading.value = false
					}
				}
			}

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

			const savePalette = async (data) => {
				formLoading.value = true
				const { name, emoji } = data
				const palette = new Palette(id.value || '')
				palette.paletteName = name.trim()
				palette.emoji = emoji
				palette.colors = colors.value
				try {
					if (action === 'CreatePalette') {
						await palette.save('add')
						message.success('Palette Added!')
					} else {
						await palette.save()
						message.info('Palette Updated!')
					}
					router.push({ name: 'Home' })
				} catch (error) {
					console.log('Failed to save palette.', error)
					message.error('Failed to save palette.')
				} finally {
					formLoading.value = false
				}
			}

			const deletePalette = async () => {
				deletePaletteLoading.value = true
				try {
					await Palette.delete(id.value)
					message.success('Palette Deleted!')
					router.push({ name: 'Home' })
				} catch (error) {
					console.log('Failed to delete palette.', error)
					message.error('Failed to delete palette.')
				} finally {
					deletePaletteLoading.value = false
				}
			}

			init()

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
				savePalette,
				formLoading,
				paletteLoading,
				paletteInfo,
				action,
				deletePalette,
				deletePaletteLoading
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
