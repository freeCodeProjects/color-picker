<template>
	<n-card hoverable size="small">
		<router-link
			:to="{
				name: 'PaletteDetail',
				params: { id },
				query: { category: category }
			}"
		>
			<div class="colors">
				<span
					class="color"
					v-for="color in colors"
					:key="color.name"
					:style="`background-color: ${color.value}`"
				></span>
			</div>
			<div class="palette-info">
				<n-text class="palette-info__name">
					<n-ellipsis :tooltip="false">
						{{ name }}
					</n-ellipsis>
				</n-text>
				<span class="palette-info__emoji">{{ emoji }}</span>
			</div>
		</router-link>
		<template #action v-if="showAction">
			<div class="palette-actions">
				<router-link :to="{ name: 'UpdatePalette', params: { id } }">
					<n-button size="small" type="info">
						<template #icon>
							<n-icon>
								<OpenOutline />
							</n-icon>
						</template>
						Update
					</n-button>
				</router-link>
			</div>
		</template>
	</n-card>
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
		grid-template-rows: repeat(5, 3rem);
	}

	.palette-info {
		padding-top: 0.5rem;
		display: flex;
		gap: 1rem;
		justify-content: space-between;

		&__name {
			font-size: 1.25rem;
			width: 90%;
		}

		&__emoji {
			font-size: 1.25rem;
		}
	}

	.palette-actions {
		display: flex;
		gap: 1rem;
		justify-content: flex-end;
	}
</style>
