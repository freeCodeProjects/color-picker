<template>
	<n-config-provider :theme="theme">
		<n-message-provider>
			<n-global-style />
			<router-view></router-view>
			<ThemeButton :activeTheme="theme" />
		</n-message-provider>
	</n-config-provider>
</template>

<script>
	import { provide } from 'vue'
	import ThemeButton from './components/ui/ThemeButton.vue'
	import store from './store/theme'

	export default {
		components: { ThemeButton },
		setup() {
			//initialize store
			const { theme, toggleTheme } = store()
			provide('theme', theme)
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
		--footer-height: 2.5rem;
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

	a {
		text-decoration: none;
	}

	.container {
		width: min(92vw, 1440px);
		margin: auto;
		height: inherit;

		@media only screen and(max-width: 36em) {
			width: 96vw;
		}
	}

	.layout {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100vh;
	}

	.cursor-pointer {
		cursor: pointer;
	}

	/* reset naive ui css */
	.n-scrollbar > .n-scrollbar-rail.n-scrollbar-rail--vertical {
		right: 0px;
	}
</style>
