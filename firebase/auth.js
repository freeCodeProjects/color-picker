import {
	signInWithPopup,
	GoogleAuthProvider,
	GithubAuthProvider,
	signOut
} from 'firebase/auth'
import { auth } from '.'

export const signIn = (OauthProvider) => {
	let provider =
		OauthProvider === 'google'
			? new GoogleAuthProvider()
			: new GithubAuthProvider()

	return new Promise((resolve, reject) => {
		signInWithPopup(auth, provider)
			.then(async (result) => {
				resolve(result)
			})
			.catch((error) => {
				reject(error)
			})
	})
}

export const logout = () => {
	return new Promise((resolve, reject) => {
		signOut(auth)
			.then(() => {
				resolve()
			})
			.catch((error) => {
				reject(error)
			})
	})
}
