<template>
	<div class="palette">
		<PaletteColorCard
			v-for="color in shades"
			:color="color"
			:showMoreBtn="false"
			:key="color.id"
		/>
		<n-config-provider :theme="theme" class="go-back" @click="$router.go(-1)">
			<n-button>Go Back</n-button>
		</n-config-provider>
	</div>
</template>

<script>
	import PaletteColorCard from './PaletteColorCard.vue'
	import { inject } from 'vue'
	import { useRoute } from 'vue-router'

	export default {
		components: { PaletteColorCard },
		setup() {
			const route = useRoute()
			const getShades = inject('getColorShades')
			const theme = inject('theme')
			const shades = getShades(route.params.colorId)

			return { shades, theme }
		}
	}
</script>

<style lang="scss" scoped>
	.palette {
		height: 100%;
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: repeat(auto-fill, 1fr);

		@media only screen and(max-width: 75em) {
			grid-template-columns: repeat(2, 1fr);
		}

		@media only screen and(max-width: 36em) {
			grid-template-columns: repeat(1, 1fr);
		}
	}

	.go-back {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
