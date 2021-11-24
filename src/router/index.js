import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
const Home = () => import('./../views/Home.vue')
const Palette = () => import('./../views/Palette.vue')
const PaletteDetail = () => import('./../components/palette/PaletteDetail.vue')
const PaletteColor = () => import('./../components/palette/PaletteColor.vue')
const CreatePalette = () => import('./../views/CreatePalette.vue')

const { isAuthenticated } = store()

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
				path: ':colorId',
				name: 'PaletteColor',
				component: PaletteColor
			}
		]
	},
	{
		path: '/create',
		name: 'CreatePalette',
		component: CreatePalette,
		meta: { requiresAuth: true }
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

router.beforeEach((to, from) => {
	if (to.meta.requiresAuth && !isAuthenticated.value) {
		return {
			path: '/'
		}
	}
})

export default router
