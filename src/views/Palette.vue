<template>
	<div class="layout">
		<PaletteHeader />
		<n-layout-content>
			<router-view :palette="palette"></router-view>
		</n-layout-content>
		<PaletteFooter :name="palette.paletteName" :emoji="palette.emoji" />
	</div>
</template>

<script>
	import PaletteFooter from '../components/palette/PaletteFooter.vue'
	import PaletteHeader from '../components/palette/PaletteHeader.vue'
	import { toRefs, ref } from 'vue'
	import samplePalette from '../utils/seedColors'

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
			const palette = ref({})

			const fetchSamplePalette = () => {
				for (let p of samplePalette) {
					if (id.value === p.id) {
						palette.value = p
					}
				}
			}

			const fetchPalette = () => {
				if (category.value === 'sample') {
					fetchSamplePalette()
				}
			}

			fetchPalette()
			return { id, category, palette }
		}
	}
</script>

<style lang="scss" scoped></style>
