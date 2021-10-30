import { toRefs } from 'vue';
<template>
	<div>
		<n-modal :show="showModal">
			<n-card
				:style="`background-color: ${color}`"
				:bordered="false"
				size="huge"
				class="card"
			>
				<div class="card__content">
					<div class="copied-text">Copied!</div>
					<div class="color-value">{{ color }}</div>
				</div>
			</n-card>
		</n-modal>
	</div>
</template>

<script>
	import { toRefs, watch } from 'vue'
	export default {
		props: {
			color: {
				type: String,
				required: true
			},
			showModal: {
				type: Boolean,
				required: true,
				default: false
			}
		},
		emits: ['closeModal'],
		setup(props, { emit }) {
			const { showModal } = toRefs(props)
			watch(showModal, (value) => {
				if (value) {
					setTimeout(() => {
						emit('closeModal')
					}, 1000)
				}
			})
			return {}
		}
	}
</script>

<style lang="scss" scoped>
	.card {
		height: 100vh;

		&__content {
			height: 90%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			color: white;
		}
	}

	.copied-text {
		font-size: max(3rem, 5vw);
		background: rgba($color: #fff, $alpha: 0.3);
		width: 100vw;
		text-align: center;
	}

	.color-value {
		color: white;
		background-blend-mode: difference;
		font-size: max(1.5rem, 2vw);
	}
</style>
