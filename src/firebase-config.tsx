// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from '@firebase/firestore'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3sT-KmaS8DmtR3Yi2BNq1i81LitJrvjg",
  authDomain: "meets-124bc.firebaseapp.com",
  projectId: "meets-124bc",
  storageBucket: "meets-124bc.appspot.com",
  messagingSenderId: "105615395071",
  appId: "1:105615395071:web:94a40cd9cd47a508afa4ca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)