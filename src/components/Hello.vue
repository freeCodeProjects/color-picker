<template>
	<n-space style="padding: 2rem">
		<n-button>{{ message }}</n-button>
		<n-button type="primary">Primary</n-button>
		<n-button type="info">Info</n-button>
		<n-button type="success">Success</n-button>
		<n-button type="warning">Warning</n-button>
		<n-button type="error">Error</n-button>
	</n-space>
</template>

<script>
	export default {
		props: {
			message: String
		}
	}
</script>
