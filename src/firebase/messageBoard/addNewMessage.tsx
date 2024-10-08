import { collection, addDoc } from "firebase/firestore"
import { database } from "../firebase.ts"

const addMessage = async (message: string): Promise<void> => {
    const docRef = collection(database, "messages")
    await addDoc(docRef, {
        Message: message,
        Author: "Melli Musterfrau",
        DateAdded: new Date(),
    })
}

export { addMessage }
