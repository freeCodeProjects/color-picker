<template>
	<div>
		<div
			class="palette__color"
			:style="`background-color: ${color[colorFormat]}`"
		>
			<div class="color__name" :style="`color: ${color[colorFormat]}`">
				<n-ellipsis style="max-width: 12rem">{{ color.name }}</n-ellipsis>
			</div>
			<div
				class="color__action fade-animation-parent cursor-pointer"
				@click="openCopyModal(color[colorFormat])"
			>
				<span class="color__action__copy__btn fade-animation"> copy </span>
				<router-link
					v-if="showMoreBtn"
					class="color__action__more__btn"
					:to="{
						name: 'PaletteColor',
						params: { id, colorId: color.id },
						query: { category: 'sample' }
					}"
				>
					more
				</router-link>
			</div>
		</div>
		<CopyColorModal
			:color="colorValue"
			:showModal="showCopyModal"
			@closeModal="showCopyModal = false"
		/>
	</div>
</template>

<script>
	import CopyColorModal from './CopyColorModal.vue'
	import { ref, inject, watch } from 'vue'
	export default {
		components: { CopyColorModal },
		props: {
			color: {
				type: Object,
				required: true
			},
			id: {
				type: String
			},
			showMoreBtn: {
				type: Boolean,
				default: true
			}
		},
		setup() {
			const showCopyModal = ref(false)
			const colorValue = ref('')
			const colorFormat = inject('colorFormat')

			const openCopyModal = (c) => {
				colorValue.value = c
				showCopyModal.value = true
				//write to clipboard
				navigator.clipboard.writeText(c)
			}

			return {
				colorValue,
				showCopyModal,
				openCopyModal,
				colorFormat
			}
		}
	}
</script>

<style lang="scss" scoped>
	.palette__color {
		min-height: 2.5rem;
		display: flex;
		justify-content: start;
		align-items: flex-end;
		position: relative;
		width: 100%;
		height: 100%;
		font-size: 1rem;
		text-transform: uppercase;
	}
	.color__name {
		padding: 0.25rem 0.5rem;
		mix-blend-mode: difference;
	}

	.color__action {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;

		&__copy__btn,
		&__more__btn {
			background: rgba($color: #000000, $alpha: 0.2);
			display: flex;
			align-items: center;
			justify-content: center;
			color: #fff;
		}

		&__copy__btn {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0.15rem;
			height: 1.5rem;
			width: 5rem;
		}

		&__more__btn {
			bottom: 0;
			position: absolute;
			right: 0;
			padding: 0.25rem;
			height: 2rem;
			width: 5rem;
		}
	}

	.fade-animation {
		visibility: hidden;
		opacity: 0;
		transition: visibility 0s 300ms, opacity 300ms linear;
	}

	.fade-animation-parent:hover > .fade-animation {
		visibility: visible;
		opacity: 1;
		transition: opacity 300ms linear;
	}
</style>
