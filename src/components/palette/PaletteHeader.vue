<template>
	<Header>
		<div class="palette-header">
			<Logo />
		</div>
	</Header>
</template>

<script>
	import Header from '../ui/Header.vue'
	import Logo from '../ui/Logo.vue'
	export default {
		components: { Header, Logo },
		setup() {
			return {}
		}
	}
</script>

<style lang="scss" scoped></style>
