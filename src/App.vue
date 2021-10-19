<template>
	<Home />
</template>

<script>
	import Home from './views/Home.vue'
	export default {
		components: { Home }
	}
</script>

<style lang="scss">
	* {
		--header-height: 4rem;
		--space-1: calc(0.25 * 1rem);
		--space-2: calc(0.5 * 1rem);
		--space-3: calc(1 * 1rem);
		--space-4: calc(1.5 * 1rem);
		--space-5: calc(2 * 1rem);
		--space-6: calc(3 * 1rem);
	}

	html,
	body {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}

	.container {
		width: min(92vw, 1440px);
		margin: auto;
	}
</style>
