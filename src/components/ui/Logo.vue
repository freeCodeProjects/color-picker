<template>
	<div class="logo">
		<img class="logo__image" src="@/assets/logo.png" />
		<n-gradient-text class="logo__title" type="success">
			Color Picker
		</n-gradient-text>
	</div>
</template>

<style lang="scss" scoped>
	.logo {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;

		&__image {
			height: 3rem;
			width: 3rem;
		}

		&__title {
			font-size: 1.5rem;

			@media screen and (max-width: 678px) {
				display: none;
			}
		}
	}
</style>
