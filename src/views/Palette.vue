<template>
	<div class="layout">
		<PaletteHeader />
		<router-view></router-view>
		<PaletteFooter />
	</div>
</template>

<script>
	import PaletteFooter from '../components/palette/PaletteFooter.vue'
	import PaletteHeader from '../components/palette/PaletteHeader.vue'
	export default {
		components: { PaletteHeader, PaletteFooter },
		name: 'Palette',
		setup() {
			return {}
		}
	}
</script>

<style lang="scss" scoped></style>
