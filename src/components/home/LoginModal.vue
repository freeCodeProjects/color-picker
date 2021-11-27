<template>
	<n-modal v-model:show="showModal" @update:show="$emit('closeModal')">
		<n-card
			size="medium"
			style="width: auto"
			:bordered="false"
			title="Login to create Palette."
		>
			<div style="margin-bottom: 1rem">Sign in using social OAuth.</div>
			<n-space vertical>
				<n-button
					type="error"
					size="large"
					:block="true"
					@click="login('google')"
				>
					<template #icon>
						<n-icon>
							<google-icon />
						</n-icon>
					</template>
					Google
				</n-button>
				<n-button
					type="default"
					size="large"
					:block="true"
					@click="login('github')"
				>
					<template #icon>
						<n-icon>
							<github-icon />
						</n-icon>
					</template>
					Github
				</n-button>
			</n-space>
		</n-card>
	</n-modal>
</template>

<script>
	import {
		LogoGithub as GithubIcon,
		LogoGoogle as GoogleIcon
	} from '@vicons/ionicons5'
	import { signIn } from '@/firebase/auth'
	import { useMessage } from 'naive-ui'
	import { User } from '@/firebase/models'
	import { serverTimestamp } from 'firebase/firestore'

	export default {
		components: {
			GithubIcon,
			GoogleIcon
		},
		props: {
			showModal: {
				type: Boolean,
				required: true
			}
		},
		emits: ['closeModal'],
		setup(props, { emit }) {
			const message = useMessage()
			const currUser = new User()

			const login = async (provider) => {
				const result = await signIn(provider).catch((error) => {
					console.error('user sign in: ', error.message)
					message.error(error.message)
				})

				if (result) {
					const userId = result.user.uid
					currUser.id = userId

					//create user document for new user.
					if (result._tokenResponse?.isNewUser) {
						currUser.name = result.user.displayName
						currUser.email = result.user.email
						currUser.photoURL = result.user.photoURL

						await currUser.save('add').catch((error) => {
							console.error('create user doc: ', error.message)
						})
					}

					//update last logged In time
					currUser.lastLoginAt = serverTimestamp()
					await currUser.save().catch((error) => {
						console.error('user last login update: ', error.message)
					})

					emit('closeModal')
				}
			}

			return {
				login
			}
		}
	}
</script>

<style lang="scss" scoped></style>
