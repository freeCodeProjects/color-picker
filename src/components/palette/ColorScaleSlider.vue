<template>
	<div class="color-scale-slider">
		<div><strong>Color Scale: </strong>{{ scaleValue }}</div>
		<n-space vertical>
			<n-slider
				:tooltip="false"
				v-model:value="scaleValue"
				:step="100"
				:min="100"
				:max="900"
			/>
		</n-space>
	</div>
</template>

<script>
	import { ref } from 'vue'
	export default {
		setup() {
			const scaleValue = ref(500)
			return { scaleValue }
		}
	}
</script>

<style lang="scss" scoped>
	.color-scale-slider {
		flex: 1;
		max-width: 320px;
		padding: 0 0.25rem;
	}
</style>
