<template>
	<div class="layout">
		<PaletteHeader :loading="loading" :error="error"/>
		<div v-if="loading" class="loader"><n-spin size="large" /></div>
		<n-text type="error" v-else-if="error" class="error">{{ error }}</n-text>
		<n-layout-content v-else>
			<router-view
				:palette="colorPalette"
				:id="id"
				:category="category"
			></router-view>
		</n-layout-content>
		<PaletteFooter
			:name="newPalette.paletteName || ''"
			:emoji="newPalette.emoji || ''"
		/>
	</div>
</template>

<script>
	import PaletteFooter from '../components/palette/PaletteFooter.vue'
	import PaletteHeader from '../components/palette/PaletteHeader.vue'
	import { toRefs, ref, provide, watch } from 'vue'
	import { seedColors as samplePalette } from '../utils/seedColors'
	import { generatePalette } from '../utils/colorHelper'
	import { Palette } from '../../firebase/models'

	export default {
		components: { PaletteHeader, PaletteFooter },
		props: {
			id: {
				type: String,
				required: true
			},
			category: {
				type: String,
				required: true
			}
		},
		setup(props) {
			const { id, category } = toRefs(props)
			const colorScale = ref(
				parseInt(localStorage.getItem('colorScale') || 500)
			)
			const colorFormat = ref(localStorage.getItem('colorFormat') || 'hex')
			const colorPalette = ref({})
			const newPalette = ref({})
			const error = ref(null)
			const loading = ref(false)

			const fetchPalette = () => {
				if (category.value === 'private') {
					fetchPrivatePalette()
				} else {
					fetchSamplePalette()
				}
			}

			const fetchPrivatePalette = async () => {
				try {
					loading.value = true
					const palette = await Palette.getById(id.value)
					if (palette) {
						newPalette.value = generatePalette(palette)
						createColorPalette()
						error.value = null
					} else {
						error.value = `Palette with id - ${id.value} doesn't exist.`
					}
				} catch (error) {
					console.log('Failed to fetch palette', error)
				} finally {
					loading.value = false
				}
			}

			const fetchSamplePalette = () => {
				for (let p of samplePalette) {
					if (id.value === p.id) {
						newPalette.value = generatePalette(p)
						createColorPalette()
					}
				}
				if (Object.keys(newPalette.value).length === 0) {
					error.value = `Palette with id:- ${id.value} doesn't exist.`
				}
			}

			const createColorPalette = () => {
				colorPalette.value = newPalette.value.colors[colorScale.value]
			}

			watch(colorScale, () => {
				createColorPalette()
				localStorage.setItem('colorScale', colorScale.value)
			})

			watch(colorFormat, () => {
				localStorage.setItem('colorFormat', colorFormat.value)
			})

			const getColorShades = (colorId) => {
				let shades = []
				const colors = newPalette.value.colors
				for (let level in colors) {
					if (level === '50') continue
					for (let color of colors[level]) {
						if (color.id === colorId) {
							shades.push(color)
						}
					}
				}
				return shades
			}

			provide('colorScale', colorScale)
			provide('colorFormat', colorFormat)
			provide('getColorShades', getColorShades)

			fetchPalette()

			return { id, category, colorPalette, newPalette, loading, error }
		}
	}
</script>

<style lang="scss" scoped>
	.error {
		display: flex;
		justify-content: center;
	}
</style>
