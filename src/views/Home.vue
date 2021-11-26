<template>
	<div class="layout">
		<HomeHeader />
		<HomeContent />
	</div>
</template>
<script>
	import HomeHeader from '../components/home/HomeHeader.vue'
	import HomeContent from '../components/home/HomeContent.vue'
	export default {
		components: { HomeHeader, HomeContent }
	}
</script>
<style lang="scss">
	.palettes {
		gap: 2rem;
		padding: 1rem;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
	}
</style>
