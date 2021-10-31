<template>
	<div class="select-color-format">
		<n-select v-model:value="colorFormat" size="large" :options="options" />
	</div>
</template>

<script>
	import { inject } from 'vue'

	export default {
		setup() {
			const colorFormat = inject('colorFormat')
			const options = [
				{
					label: 'HEX',
					value: 'hex'
				},
				{
					label: 'RGB',
					value: 'rgb'
				},
				{
					label: 'RGBA',
					value: 'rgba'
				}
			]
			return {
				colorFormat,
				options
			}
		}
	}
</script>

<style lang="scss" scoped></style>
