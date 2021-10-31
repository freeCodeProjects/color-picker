<template>
	<div class="layout">
		<PaletteHeader />
		<n-layout-content>
			<router-view :palette="colorPalette" :id="id"></router-view>
		</n-layout-content>
		<PaletteFooter :name="newPalette.paletteName" :emoji="newPalette.emoji" />
	</div>
</template>

<script>
	import PaletteFooter from '../components/palette/PaletteFooter.vue'
	import PaletteHeader from '../components/palette/PaletteHeader.vue'
	import { toRefs, ref, provide, watch } from 'vue'
	import samplePalette from '../utils/seedColors'
	import { generatePalette } from '../utils/colorHelper'

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
			const colorScale = ref(500)
			const colorFormat = ref('hex')
			const colorPalette = ref({})
			const newPalette = ref({})

			const fetchSamplePalette = () => {
				for (let p of samplePalette) {
					if (id.value === p.id) {
						newPalette.value = generatePalette(p)
						createColorPalette()
					}
				}
			}

			const fetchPalette = () => {
				if (category.value === 'sample') {
					fetchSamplePalette()
				}
			}

			const createColorPalette = () => {
				colorPalette.value = newPalette.value.colors[colorScale.value]
			}

			watch(colorScale, (v) => {
				console.log(v)
				createColorPalette()
			})

			fetchPalette()
			provide('colorScale', colorScale)
			provide('colorFormat', colorFormat)

			return { id, category, colorPalette, newPalette }
		}
	}
</script>

<style lang="scss" scoped></style>
