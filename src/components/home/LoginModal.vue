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
				<n-button type="error" size="large" :block="true">
					<template #icon>
						<n-icon>
							<google-icon />
						</n-icon>
					</template>
					Google
				</n-button>
				<n-button color="#000" size="large" :block="true">
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
		setup() {
			return {}
		}
	}
</script>

<style lang="scss" scoped></style>
