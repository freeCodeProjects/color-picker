<template>
	<div class="palette">
		<PaletteColorCard
			v-for="color in palette.colors"
			:color="color"
			:key="color.name"
		/>
	</div>
</template>

<script>
	import PaletteColorCard from './PaletteColorCard.vue'
	export default {
		components: { PaletteColorCard },
		props: {
			palette: {
				type: Object,
				required: true
			}
		},
		setup() {}
	}
</script>

<style lang="scss" scoped>
	.palette {
		height: 100%;
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: repeat(auto-fill, 1fr);

		@media only screen and(max-width: 75em) {
			grid-template-columns: repeat(4, 1fr);
		}

		@media only screen and(max-width: 62em) {
			grid-template-columns: repeat(2, 1fr);
		}

		@media only screen and(max-width: 36em) {
			grid-template-columns: repeat(1, 1fr);
		}
	}
</style>
