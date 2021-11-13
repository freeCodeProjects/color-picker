<template>
	<div v-if="!login">
		<n-button type="info" round @click="openModal">Login</n-button>
		<LoginModal :showModal="toggleModal" @closeModal="closeModal" />
	</div>
	<div v-else>
		<n-space align="center">
			<router-link :to="{ name: 'CreatePalette' }">
				<n-button type="primary">Create Palette</n-button>
			</router-link>
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
		</n-space>
	</div>
</template>

<script>
	import { CaretDown } from '@vicons/ionicons5'
	import { ref } from 'vue'
	import LoginModal from './LoginModal.vue'
	export default {
		components: { CaretDown, LoginModal },
		setup() {
			const login = ref(false)
			const toggleModal = ref(false)

			const openModal = () => {
				toggleModal.value = true
			}

			const closeModal = () => {
				toggleModal.value = false
			}
			return { login, toggleModal, openModal, closeModal }
		}
	}
</script>

<style lang="scss" scoped>
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
