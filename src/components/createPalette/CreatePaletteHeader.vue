<template>
	<Header>
		<Logo />
		<template v-if="action === 'CreatePalette'">
			<n-button
				:disabled="disableSaveButton || paletteLoading"
				@click="$emit('openSaveModal')"
				type="primary"
			>
				Save
			</n-button>
		</template>
		<template v-else>
			<n-space>
				<n-button
					:disabled="disableSaveButton || paletteLoading"
					@click="$emit('openSaveModal')"
					type="info"
				>
					Update
				</n-button>
				<n-button
					:disabled="paletteLoading || deletePaletteLoading"
					:loading="deletePaletteLoading"
					@click="$emit('deletePalette')"
					type="error"
				>
					Delete
				</n-button>
			</n-space>
		</template>
	</Header>
</template>
<script>
	import Header from '../ui/Header.vue'
	import Logo from '../ui/Logo.vue'

	export default {
		components: { Header, Logo },
		props: {
			disableSaveButton: {
				type: Boolean,
				default: false
			},
			paletteLoading: {
				type: Boolean,
				default: false
			},
			deletePaletteLoading: {
				type: Boolean,
				default: false
			},
			action: String
		},
		emits: ['openSaveModal', 'deletePalette']
	}
</script>
