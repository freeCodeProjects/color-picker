import { ref, watch } from 'vue'
import { darkTheme } from 'naive-ui'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../firebase'

const getInitialTheme = () => {
	if (
		!localStorage.getItem('theme') ||
		(localStorage.getItem('theme') && localStorage.getItem('theme') === 'light')
	) {
		return null
	} else {
		return darkTheme
	}
}

const store = () => {
	const theme = ref(getInitialTheme())
	const activeTab = ref(localStorage.getItem('activeTab') || 'sample-palette')
	const userData = ref(JSON.parse(localStorage.getItem('userData')) || null)
	const isAuthenticated = ref(
		JSON.parse(localStorage.getItem('isAuthenticated')) || false
	)

	const toggleTheme = () => {
		if (theme.value) {
			theme.value = null
			localStorage.setItem('theme', 'light')
		} else {
			theme.value = darkTheme
			localStorage.setItem('theme', 'dark')
		}
	}

	const changeActiveTab = (value) => {
		activeTab.value = value
	}

	const unsubscribe = onAuthStateChanged(auth, (user) => {
		if (user) {
			isAuthenticated.value = true
			userData.value = user
			localStorage.setItem('isAuthenticated', true)
			localStorage.setItem('userData', JSON.stringify(user))
		} else {
			isAuthenticated.value = false
			userData.value = null
			localStorage.setItem('isAuthenticated', false)
			localStorage.removeItem('userData')
		}
	})

	watch(activeTab, (newValue) => {
		localStorage.setItem('activeTab', newValue)
	})

	return {
		theme,
		userData,
		isAuthenticated,
		activeTab,
		toggleTheme,
		changeActiveTab,
		unsubscribe
	}
}

export default store
