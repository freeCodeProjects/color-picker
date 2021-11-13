import { ref, provide } from 'vue'
import { darkTheme } from 'naive-ui'

const getInitialTheme = () => {
	if (
		localStorage.getItem('theme') &&
		localStorage.getItem('theme') === 'light'
	) {
		return null
	} else {
		return darkTheme
	}
}

const store = () => {
	const theme = ref(getInitialTheme())

	const toggleTheme = () => {
		if (theme.value) {
			theme.value = null
			localStorage.setItem('theme', 'light')
		} else {
			theme.value = darkTheme
			localStorage.setItem('theme', 'dark')
		}
	}
	provide('toggleTheme', toggleTheme)
	provide('theme', theme)

	return {
		theme,
		toggleTheme
	}
}

export default store
