<template>
	<div v-if="!isAuthenticated" style="padding: 1rem">
		<div><strong>Login</strong> to create or view own Palette.</div>
	</div>
	<div v-else-if="loading" class="loader"><n-spin size="large" /></div>
	<div v-else-if="palettes.length > 0" class="palettes">
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
	import { Palette } from '../../../firebase/models'
	import { ref, watch, inject } from 'vue'
	import PaletteCard from './PaletteCard.vue'

	export default {
		components: { PaletteCard },
		setup() {
			const palettes = ref([])
			const loading = ref(false)

			const isAuthenticated = inject('isAuthenticated')
			const userData = inject('userData')

			const fetchAllDocs = async () => {
				if (isAuthenticated.value) {
					loading.value = true
					try {
						palettes.value = await Palette.getDocsByUserId(userData.value.uid)
					} catch (error) {
						console.log('Failed to fetch My palettes:', error)
					} finally {
						loading.value = false
					}
				}
			}

			fetchAllDocs()

			//watch for auth change when my palette is in view
			watch(isAuthenticated, () => {
				fetchAllDocs()
			})

			return {
				palettes,
				isAuthenticated,
				loading
			}
		}
	}
</script>

<style lang="scss" scoped></style>
