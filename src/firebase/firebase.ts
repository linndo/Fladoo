// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyD2F19pLtgyg98wcAa_bijHCFXcY0mM9jI',
    authDomain: 'wgdoo-9e839.firebaseapp.com',
    projectId: 'wgdoo-9e839',
    storageBucket: 'wgdoo-9e839.appspot.com',
    messagingSenderId: '1049420866837',
    appId: '1:1049420866837:web:13c7ff6959ce2ba08a751c',
    measurementId: 'G-QWNHMV41RY',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app);

export const database = getFirestore(app)
