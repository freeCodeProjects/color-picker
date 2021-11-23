import { doc, setDoc, serverTimestamp, collection } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '..'

export default class User {
	collection = 'users'
	id = ''
	data = {}

	constructor(id = '', data = {}) {
		this.id = id
		this.data = data
	}

	static getId = () => {
		const auth = getAuth()
		const user = auth.currentUser
		return user.uid
	}

	save = (action = 'update') => {
		if (action === 'add') {
			this.createdAt = serverTimestamp()
		}
		const docRef = this.id
			? doc(db, this.collection, this.id)
			: doc(collection(db, this.collection))
		return new Promise(async (resolve, reject) => {
			try {
				await setDoc(
					docRef,
					{ ...this.data, updatedAt: serverTimestamp() },
					{ merge: true }
				)
				resolve('success')
			} catch (error) {
				reject(error)
			}
		})
	}

	get id() {
		return this.id
	}

	set id(value) {
		this.id = value
	}

	get data() {
		return this.data
	}

	set data(value) {
		this.data = value
	}

	get name() {
		return this.data.name
	}

	set name(value) {
		this.data.name = value
	}

	get email() {
		return this.data.email
	}

	set email(value) {
		this.data.email = value
	}

	get createdAt() {
		return this.data.createdAt
	}

	set createdAt(value) {
		this.data.createdAt = value
	}

	get lastLoginAt() {
		return this.data.lastLoginAt
	}

	set lastLoginAt(value) {
		this.data.lastLoginAt = value
	}

	get updatedAt() {
		return this.data.updatedAt
	}

	set updatedAt(value) {
		this.data.updatedAt = value
	}

	get photoURL() {
		return this.data.photoURL
	}

	set photoURL(value) {
		this.data.photoURL = value
	}
}
