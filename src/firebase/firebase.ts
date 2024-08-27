import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyD2F19pLtgyg98wcAa_bijHCFXcY0mM9jI",
    authDomain: "wgdoo-9e839.firebaseapp.com",
    projectId: "wgdoo-9e839",
    storageBucket: "wgdoo-9e839.appspot.com",
    messagingSenderId: "1049420866837",
    appId: "1:1049420866837:web:13c7ff6959ce2ba08a751c",
    measurementId: "G-QWNHMV41RY",
}

const app = initializeApp(firebaseConfig)

export const database = getFirestore(app)
