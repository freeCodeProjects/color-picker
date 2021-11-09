<template>
	<Header>
		<Logo />
		<n-button
			:disabled="disableSaveButton"
			@click="$emit('savePalette')"
			type="primary"
    >
      Save
    </n-button>
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
			}
		},
		emits: ['savePalette']
	}
</script>
