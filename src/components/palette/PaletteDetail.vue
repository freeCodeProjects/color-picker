<template>
	<n-layout-content class="content">
		<div class="palette">
			<div
				class="palette__color"
				v-for="color in palette.colors"
				:key="color.name"
				:style="`background-color: ${color.value}`"
			>
				<div class="color__name">
					<n-ellipsis style="max-width: 10rem">{{ color.name }}</n-ellipsis>
				</div>
				<div class="color__action fade-animation-parent">
					<span class="color__action__copy__btn fade-animation cursor-pointer"
						>copy</span
					>
					<span class="color__action__more__btn fade-animation cursor-pointer"
						>more</span
					>
				</div>
			</div>
		</div>
	</n-layout-content>
</template>

<script>
	export default {
		props: {
			palette: {
				type: Object,
				required: true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		flex: 1;
		overflow: auto;
	}
	.palette {
		height: 100%;
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: repeat(auto-fit, minmax(2.5rem, 1fr));
		font-size: 1rem;
		text-transform: uppercase;

		@media only screen and(max-width: 75em) {
			grid-template-columns: repeat(4, 1fr);
		}

		@media only screen and(max-width: 62em) {
			grid-template-columns: repeat(2, 1fr);
		}

		@media only screen and(max-width: 36em) {
			grid-template-columns: repeat(1, 1fr);
		}

		&__color {
			min-height: 2.5rem;
			display: flex;
			justify-content: start;
			align-items: flex-end;
			position: relative;
			width: 100%;
			height: 100%;
		}
	}

	.color__name {
		padding: 0.25rem 0.5rem;
	}

	.color__action {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;

		span {
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
