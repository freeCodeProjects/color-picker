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
	import { onUnmounted, provide } from 'vue'
	import ThemeButton from './components/ui/ThemeButton.vue'
	import store from './store'

	export default {
		components: { ThemeButton },
		setup() {
			//initialize store
			const {
				theme,
				isAuthenticated,
				userData,
				toggleTheme,
				activeTab,
				changeActiveTab,
				unsubscribe
			} = store()
			provide('theme', theme)
			provide('toggleTheme', toggleTheme)
			provide('isAuthenticated', isAuthenticated)
			provide('userData', userData)
			provide('activeTab', activeTab)
			provide('changeActiveTab', changeActiveTab)

			onUnmounted(() => {
				unsubscribe()
			})

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

	.loader {
		display: flex;
		height: 100%;
		align-items: center;
		justify-content: center;
	}
</style>
