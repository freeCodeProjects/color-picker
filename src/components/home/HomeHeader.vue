<template>
	<Header>
		<div class="home-header">
			<Logo />
			<div v-if="login">
				<n-button type="info" round>Login</n-button>
			</div>
			<div v-else>
				<n-popover trigger="hover" placement="bottom-end">
					<template #trigger>
						<div class="user-info">
							<n-avatar
								size="large"
								src="https://avatars.githubusercontent.com/u/21134455?v=4"
								round
							/>
							<n-icon size="16">
								<CaretDown />
							</n-icon>
						</div>
					</template>
					<div class="user-info__popover">
						<h3>Welcome</h3>
						<n-ellipsis style="width: 10rem"> Akash Kumar Seth </n-ellipsis>
						<n-button type="error" block round>Logout</n-button>
					</div>
				</n-popover>
			</div>
		</div>
	</Header>
</template>

<script>
	import Header from '../ui/Header.vue'
	import Logo from '../ui/Logo.vue'
	import { CaretDown } from '@vicons/ionicons5'
	import { ref } from 'vue'
	export default {
		components: { Header, Logo, CaretDown },
		setup() {
			const login = ref(false)
			return { login }
		}
	}
</script>

<style lang="scss" scoped>
	.home-header {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.user-info {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-1);
	}

	.user-info__popover {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		text-align: center;

		h3 {
			margin: 0;
		}

		button {
			margin-top: var(--space-2);
		}
	}
</style>
