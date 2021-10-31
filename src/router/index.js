import { createRouter, createWebHistory } from 'vue-router'
import Home from './../views/Home.vue'
import Palette from './../views/Palette.vue'
import PaletteDetail from './../components/palette/PaletteDetail.vue'
import PaletteColor from './../components/palette/PaletteColor.vue'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/palette/:id',
		component: Palette,
		props: (route) => ({
			id: route.params.id,
			category: route.query.category
		}),
		children: [
			{
				path: '',
				name: 'PaletteDetail',
				component: PaletteDetail
			},
			{
				path: ':colorName',
				name: 'PaletteColor',
				component: PaletteColor
			}
		]
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

export default router
