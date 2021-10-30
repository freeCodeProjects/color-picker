<template>
	<router-link :to="`/palette/${id}/?category=${category}`">
		<n-card hoverable size="small">
			<div class="colors">
				<span
					class="color"
					v-for="color in colors"
					:key="color.name"
					:style="`background-color: ${color.value}`"
				></span>
			</div>
			<div class="palette-info">
				<n-ellipsis :tooltip="false">
					<span class="palette-info__name">{{ name }}</span>
				</n-ellipsis>
				<span class="palette-info__emoji">{{ emoji }}</span>
			</div>
			<template #action v-if="showAction">
				<div class="palette-actions">
					<n-button type="info">
						<template #icon>
							<n-icon>
								<OpenOutline />
							</n-icon>
						</template>
						Update
					</n-button>
					<n-button type="error">
						<template #icon>
							<n-icon>
								<TrashBinOutline />
							</n-icon>
						</template>
						Delete
					</n-button>
				</div>
			</template>
		</n-card>
	</router-link>
</template>

<script>
	import { OpenOutline, TrashBinOutline } from '@vicons/ionicons5'
	export default {
		components: {
			OpenOutline,
			TrashBinOutline
		},
		props: {
			name: String,
			id: String,
			emoji: String,
			colors: Array,
			showAction: {
				type: Boolean,
				default: false
			},
			category: {
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
	.n-card {
		border-radius: 0.5rem;
		display: flex;
	}

	.colors {
		display: flex;
		flex-wrap: wrap;
		display: grid;
		grid-template-columns: repeat(4, minmax(4rem, 1fr));
		grid-auto-rows: 3rem;
	}

	.palette-info {
		padding-top: 0.5rem;
		display: flex;
		gap: 1rem;
		justify-content: space-between;

		&__name {
			font-size: 1.25rem;
		}

		&__emoji {
			font-size: 1.25rem;
		}
	}

	.palette-actions {
		display: flex;
		gap: 1rem;
		justify-content: space-between;
	}
</style>
