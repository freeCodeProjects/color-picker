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
			/>
		</div>
	</n-scrollbar>
</template>

<script>
	import palettes from './../../utils/seedColors'
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
	.palettes {
		gap: 2rem;
		padding: 1rem;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
	}
</style>
