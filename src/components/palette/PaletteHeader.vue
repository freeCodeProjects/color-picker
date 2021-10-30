<template>
	<Header>
		<Logo />
		<ColorScaleSlider />
		<ColorFormatSelect />
	</Header>
</template>

<script>
	import Header from '../ui/Header.vue'
	import Logo from '../ui/Logo.vue'
	import ColorFormatSelect from './ColorFormatSelect.vue'
	import ColorScaleSlider from './ColorScaleSlider.vue'
	export default {
		components: { Header, Logo, ColorFormatSelect, ColorScaleSlider },
		setup() {}
	}
</script>

<style lang="scss" scoped></style>
