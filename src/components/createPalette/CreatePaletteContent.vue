<template>
	<n-layout-content content-style="overflow:auto">
		<div class="colors">
			<draggable
				v-model="colorsArray"
				group="people"
				@end="arrangeColor"
				:animation="200"
				ghost-class="ghost"
				tag="transition-group"
				item-key="order"
			>
				<template #item="{ element: color }">
					<div class="color" :style="`background: ${color.value}`">
						<div class="color__content">
							<div
								class="color__content__name"
								:style="`color: ${color.value}`"
							>
								<n-ellipsis style="max-width: 8rem">
									{{ color.name }}
								</n-ellipsis>
							</div>

							<n-button
								circle
								@click="$emit('deleteColor', color.order)"
								class="delete-btn"
							>
								<template #icon>
									<n-icon class="delete-icon"><DeleteIcon /></n-icon>
								</template>
							</n-button>
						</div>
					</div>
				</template>
			</draggable>
		</div>
	</n-layout-content>
</template>

<script>
	import { TrashOutline as DeleteIcon } from '@vicons/ionicons5'
	import draggable from 'vuedraggable'
	import { computed, ref } from 'vue'

	export default {
		components: {
			DeleteIcon,
			draggable
		},
		props: {
			colors: {
				type: Array
			}
		},
		emits: ['deleteColor', 'reArrangeColor'],
		setup(props, { emit }) {
			const colorsArray = computed(() =>
				props.colors.map((color, idx) => ({ ...color, order: idx }))
			)
			const drag = ref(false)

			const arrangeColor = (list) => {
				emit('reArrangeColor', list.oldIndex, list.newIndex)
			}

			return {
				colorsArray,
				drag,
				arrangeColor
			}
		}
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
		cursor: move;
	}

	.color__content {
		height: 100%;
		display: flex;
		align-items: end;
		justify-content: space-between;

		&__name {
			text-transform: uppercase;
			font-size: 1rem;
			padding: 0.25rem 0.5rem;
			mix-blend-mode: difference;
		}
	}

	.delete-icon {
		color: white;
	}

	.delete-btn:hover .delete-icon,
	.delete-btn:focus .delete-icon {
		color: #36ad6a;
	}

	.ghost {
		opacity: 0.2;
	}
</style>
