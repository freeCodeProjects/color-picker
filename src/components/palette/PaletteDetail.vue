<template>
	<n-layout-content class="content">
		<div class="palette">
			<PaletteColor
				v-for="color in palette.colors"
				:color="color"
				:key="color.name"
			/>
		</div>
	</n-layout-content>
</template>

<script>
	import PaletteColor from './PaletteColor.vue'
	export default {
		components: { PaletteColor },
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
	.content {
		flex: 1;
		overflow: auto;
	}
	.palette {
		height: 100%;
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: repeat(auto-fit, minmax(2.5rem, 1fr));
		font-size: 1rem;
		text-transform: uppercase;

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
