<template>
	<n-layout-content content-style="overflow:auto">
		<div class="colors">
			<div
				v-for="(color, index) in colors"
				:key="index"
				class="color"
				:style="`background: ${color.value}`"
			>
				<div class="color__content">
					<n-ellipsis style="max-width: 80%">
						<span class="color__content__name">{{ color.name }}</span>
					</n-ellipsis>
					<n-button
						circle
						@click="$emit('deleteColor', index)"
						class="delete-btn"
					>
						<template #icon>
							<n-icon class="delete-icon"><DeleteIcon /></n-icon>
						</template>
					</n-button>
				</div>
			</div>
		</div>
	</n-layout-content>
</template>

<script>
	import { TrashOutline as DeleteIcon } from '@vicons/ionicons5'
	export default {
		components: {
			DeleteIcon
		},
		props: {
			colors: {
				type: Array
			}
		},
		emits: ['deleteColor'],
		setup() {}
	}
</script>

<style lang="scss" scoped>
	.colors {
		display: grid;
		height: 100%;
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: repeat(auto-fill, 1fr);

		@media only screen and(max-width: 75em) {
			grid-template-columns: repeat(4, 1fr);
		}

		@media only screen and(max-width: 62em) {
			grid-template-columns: repeat(2, 1fr);
		}

		@media only screen and(max-width: 36em) {
			grid-template-columns: repeat(1, 1fr);
		}
	}

	.color {
		min-height: 3rem;
		padding: 0.5rem;
	}

	.color__content {
		height: 100%;
		display: flex;
		align-items: end;
		justify-content: space-between;

		&__name {
			color: white;
			text-transform: uppercase;
		}
	}

	.delete-icon {
		color: white;
	}

	.delete-btn:hover .delete-icon,
	.delete-btn:focus .delete-icon {
		color: #36ad6a;
	}
</style>
