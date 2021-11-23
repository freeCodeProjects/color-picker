import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
	apiKey: 'AIzaSyB1G4uzl7T8abbfSt545pRqdfArLMNmuFs',
	authDomain: 'color-picker-144d2.firebaseapp.com',
	projectId: 'color-picker-144d2',
	storageBucket: 'color-picker-144d2.appspot.com',
	messagingSenderId: '674434549226',
	appId: '1:674434549226:web:8ecbcdd3791ae26dbf1e93',
	measurementId: 'G-55F8J4VT8Q'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
