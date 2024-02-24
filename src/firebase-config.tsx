import { getFirestore } from '@firebase/firestore'
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import 'firebase/compat/auth'

const firebaseConfig = {
    apiKey: 'AIzaSyB3sT-KmaS8DmtR3Yi2BNq1i81LitJrvjg',
    authDomain: 'meets-124bc.firebaseapp.com',
    projectId: 'meets-124bc',
    storageBucket: 'meets-124bc.appspot.com',
    messagingSenderId: '105615395071',
    appId: '1:105615395071:web:94a40cd9cd47a508afa4ca'
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)
