<template>
	<n-button circle size="large" class="theme-btn" @click="changeTheme">
		<n-icon size="2rem">
			<light-icon v-if="activeTheme" />
			<dark-icon v-else />
		</n-icon>
	</n-button>
</template>

<script>
	import { inject } from 'vue'
	import {
		PartlySunnyOutline as LightIcon,
		CloudyNightOutline as DarkIcon
	} from '@vicons/ionicons5'
	export default {
		components: { LightIcon, DarkIcon },
		props: {
			activeTheme: [Object, null]
		},
		setup() {
			const changeTheme = inject('toggleTheme')
			return {
				changeTheme
			}
		}
	}
</script>

<style lang="scss" scoped>
	.theme-btn {
		box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 8px 0px;
		position: fixed;
		bottom: 5vh;
		right: 2.5vw;
		height: 3.2rem;
		width: 3.2rem;
		display: flex;
		justify-content: center;
		align-items: center;
		padding-bottom: 0.25rem;
	}
</style>
