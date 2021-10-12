<template>
	<n-config-provider :theme="theme">
		<n-global-style />
		<n-card>
			<n-space>
				<n-button @click="theme = darkTheme">Dark</n-button>
				<n-button @click="theme = null">Light</n-button>
			</n-space>
		</n-card>
		<Hello message="Hello World!" />
		<n-icon size="40">
			<game-controller-outline />
		</n-icon>
		<n-icon size="40" color="#0e7a0d">
			<game-controller />
		</n-icon>
	</n-config-provider>
</template>

<script>
	import Hello from './components/Hello.vue'
	import { ref } from 'vue'
	import { darkTheme } from 'naive-ui'
	import { GameController, GameControllerOutline } from '@vicons/ionicons5'
	export default {
		components: { Hello, GameController, GameControllerOutline },
		setup() {
			const theme = ref(null)
			return { darkTheme, theme }
		}
	}
</script>

<style>
	.carousel-img {
		width: 100%;
		height: 50vh;
		object-fit: cover;
	}
</style>
