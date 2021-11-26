<template>
	<Header>
		<Logo />
		<template v-if="!loading && !error">
			<ColorScaleSlider v-if="!$route.params.colorId" />
			<ColorFormatSelect />
		</template>
	</Header>
</template>

<script>
	import Header from '../ui/Header.vue'
	import Logo from '../ui/Logo.vue'
	import ColorFormatSelect from './ColorFormatSelect.vue'
	import ColorScaleSlider from './ColorScaleSlider.vue'
	export default {
		components: { Header, Logo, ColorFormatSelect, ColorScaleSlider },
		props: {
			error: String | null,
			loading: Boolean
		},
		setup() {}
	}
</script>

<style lang="scss" scoped></style>
