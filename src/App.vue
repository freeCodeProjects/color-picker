<template>
	<n-config-provider :theme="theme">
		<n-global-style />
		<Home />
		<ThemeButton :activeTheme="theme" />
	</n-config-provider>
</template>

<script>
	import { ref, provide } from 'vue'
	import Home from './views/Home.vue'
	import { darkTheme } from 'naive-ui'
	import ThemeButton from './components/ui/ThemeButton.vue'

	const getInitialTheme = () => {
		if (
			localStorage.getItem('theme') &&
			localStorage.getItem('theme') === 'light'
		) {
			return null
		} else {
			return darkTheme
		}
	}

	export default {
		components: { Home, ThemeButton },
		setup() {
			const theme = ref(getInitialTheme())

			const toggleTheme = () => {
				if (theme.value) {
					theme.value = null
					localStorage.setItem('theme', 'light')
				} else {
					theme.value = darkTheme
					localStorage.setItem('theme', 'dark')
				}
			}

			provide('toggleTheme', toggleTheme)
			return {
				theme
			}
		}
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
		height: inherit;
	}

	/* reset naive ui css */
	.n-scrollbar > .n-scrollbar-rail.n-scrollbar-rail--vertical {
		right: 0px;
	}
</style>
