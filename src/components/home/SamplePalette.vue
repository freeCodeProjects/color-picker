<template>
	<n-scrollbar>
		<div class="palettes">
			<PaletteCard
				v-for="palette in palettes"
				:key="palette.id"
				:name="palette.paletteName"
				:id="palette.id"
				:emoji="palette.emoji"
				:colors="palette.colors"
				category="sample"
			/>
		</div>
	</n-scrollbar>
</template>

<script>
	import { seedColors as palettes } from './../../utils/seedColors'
	import PaletteCard from './PaletteCard.vue'
	export default {
		components: { PaletteCard },
		setup() {
			console.log('tab-1')
			return { palettes }
		}
	}
</script>

<style lang="scss" scoped>
</style>
