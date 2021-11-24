<template>
	<div v-if="!isAuthenticated">
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
							:src="user.photoURL"
							:fallback-src="userLogo"
							round
						/>
						<n-icon size="16">
							<CaretDown />
						</n-icon>
					</div>
				</template>
				<div class="user-info__popover">
					<h3>Welcome</h3>
					<n-ellipsis style="width: 10rem"> {{ user.name }} </n-ellipsis>
					<n-button type="error" block round @click="signOut">Logout</n-button>
				</div>
			</n-popover>
		</n-space>
	</div>
</template>

<script>
	import { CaretDown } from '@vicons/ionicons5'
	import { ref, reactive, inject, watch, onMounted } from 'vue'
	import LoginModal from './LoginModal.vue'
	import { logout } from '../../../firebase/auth'
	import { useMessage } from 'naive-ui'
	import { User } from '../../../firebase/models'
	import userLogo from '@/assets/user.svg'

	export default {
		components: { CaretDown, LoginModal },
		setup() {
			const isAuthenticated = inject('isAuthenticated')
			const userData = inject('userData')
			const user = reactive(new User())

			const message = useMessage()
			const toggleModal = ref(false)

			const openModal = () => {
				toggleModal.value = true
			}

			const closeModal = () => {
				toggleModal.value = false
			}

			const signOut = async () => {
				try {
					await logout()
				} catch (error) {
					message.error(error)
				}
			}

			const initUser = () => {
				if (userData.value) {
					const data = userData.value
					user.id = data.uid
					user.data = { name: data.displayName, ...data }
				}
			}

			watch(userData, () => {
				initUser()
			})

			onMounted(() => {
				initUser()
			})

			return {
				isAuthenticated,
				toggleModal,
				openModal,
				closeModal,
				signOut,
				user,
				userLogo
			}
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
