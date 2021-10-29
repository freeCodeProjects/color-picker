import { createRouter, createWebHistory } from 'vue-router'
import Home from './../views/Home.vue'
import Palette from './../views/Palette.vue'
import PaletteDetail from './../components/palette/PaletteDetail.vue'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/palette/:id',
		component: Palette,
		children: [
			{
				path: '',
				name: 'PaletteDetail',
				component: PaletteDetail
			}
		]
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

export default router
