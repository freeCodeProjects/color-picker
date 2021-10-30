<template>
	<Header>
		<Logo />
		<Authentication />
	</Header>
</template>

<script>
	import Authentication from './Authentication.vue'
	import Header from '../ui/Header.vue'
	import Logo from '../ui/Logo.vue'
	export default {
		components: { Header, Logo, Authentication },
		setup() {}
	}
</script>
