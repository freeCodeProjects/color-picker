<template>
	<n-layout-footer bordered class="footer">
		<div class="container">
			<n-ellipsis :tooltip="false" style="max-width: 300px"
				>{{ name }}
			</n-ellipsis>
			<div class="emoji">{{ emoji }}</div>
		</div>
	</n-layout-footer>
</template>

<script>
	export default {
		props: {
			name: {
				type: String,
				required: true
			},
			emoji: {
				type: String,
				required: true
			}
		},
		setup() {
			return {}
		}
	}
</script>

<style lang="scss" scoped>
	.footer {
		flex-basis: var(--footer-height);
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 1.25rem;

		.container {
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 1rem;
		}
	}

	.name {
		max-width: 240px;
	}
</style>
