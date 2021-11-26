<template>
	<div v-if="!isAuthenticated" style="padding: 1rem">
		<div><strong>Login</strong> to create or view own Palette.</div>
	</div>
	<div v-else-if="loader" class="loading"><n-spin size="large" /></div>
	<div v-else-if="palettes.length > 1" class="palettes">
		<PaletteCard
			v-for="palette in palettes"
			:key="palette.id"
			:name="palette.paletteName"
			:id="palette.id"
			:emoji="palette.emoji"
			:colors="palette.colors"
			category="private"
			:showAction="true"
		/>
	</div>
	<div v-else style="padding: 1rem">There is no palette to show.</div>
</template>

<script>
	import store from '../../store'
	import { Palette } from '../../../firebase/models'
	import { ref, watch } from 'vue'
	import PaletteCard from './PaletteCard.vue'

	export default {
		components: { PaletteCard },
		setup() {
			const { isAuthenticated, userData } = store()
			const palettes = ref([])
			const loader = ref(false)
			const fetchAllDocs = async () => {
				if (isAuthenticated) {
					loader.value = true
					try {
						palettes.value = await Palette.getDocsByUserId(userData.value.uid)
					} catch (error) {
						console.log('Failed to fetch My palettes:', error)
					} finally {
						loader.value = false
					}
				}
			}
			fetchAllDocs()

			//watch for auth change when my palette is in view
			watch(isAuthenticated, (newValue) => {
				fetchAllDocs()
			})

			return {
				palettes,
				isAuthenticated,
				loader
			}
		}
	}
</script>

<style lang="scss" scoped>
	.loading {
		display: flex;
		height: 100%;
		align-items: center;
		justify-content: center;
	}
</style>
