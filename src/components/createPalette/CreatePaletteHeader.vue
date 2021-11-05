<template>
	<Header>
		<Logo />
		<n-button type="primary">Save</n-button>
	</Header>
</template>
<script>
	import Header from '../ui/Header.vue'
	import Logo from '../ui/Logo.vue'
	export default {
		components: { Header, Logo }
	}
</script>
