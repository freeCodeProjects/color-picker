import {
	doc,
	setDoc,
	serverTimestamp,
	collection,
	query,
	where,
	getDocs,
	getDoc
} from 'firebase/firestore'
import { db } from '..'
import User from './user'

export default class Palette {
	collection = 'palettes'
	id = ''
	data = {}

	constructor(id = '', data = {}) {
		this.id = id
		this.data = data
	}

	static getDocsByUserId = (userId) => {
		const q = query(collection(db, 'palettes'), where('userId', '==', userId))
		return new Promise(async (resolve, reject) => {
			try {
				const querySnapshot = await getDocs(q)
				const docs = []
				querySnapshot.forEach((doc) => {
					docs.push({ id: doc.id, ...doc.data() })
				})
				resolve(docs)
			} catch (error) {
				reject(error)
			}
		})
	}

	static getById = (id) => {
		const docRef = doc(db, 'palettes', id)
		return new Promise(async (resolve, reject) => {
			try {
				const docSnap = await getDoc(docRef)
				if (docSnap.exists()) {
					resolve({ id: docSnap.id, ...docSnap.data() })
				} else {
					resolve(null)
				}
			} catch (error) {
				reject(error)
			}
		})
	}

	save = (action = 'update') => {
		if (action === 'add') {
			this.createdAt = serverTimestamp()
			this.userId = User.getId()
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

	get createdAt() {
		return this.data.createdAt
	}

	set createdAt(value) {
		this.data.createdAt = value
	}

	get updatedAt() {
		return this.data.updatedAt
	}

	set updatedAt(value) {
		this.data.updatedAt = value
	}

	get paletteName() {
		return this.data.paletteName
	}

	set paletteName(value) {
		this.data.paletteName = value
	}

	get emoji() {
		return this.data.emoji
	}

	set emoji(value) {
		this.data.emoji = value
	}

	get colors() {
		return this.data.colors
	}

	set colors(value) {
		this.data.colors = value
	}

	get userId() {
		return this.data.userId
	}

	set userId(value) {
		this.data.userId = value
	}
}
