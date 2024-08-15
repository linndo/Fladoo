import { collection, addDoc } from "firebase/firestore"
import { database } from "./firebase"

const addMessage = async (message: string): Promise<void> => {
    const docRef = collection(database, "messages")
    await addDoc(docRef, {
        Message: message,
        DateAdded: new Date(),
    })
}

export { addMessage }
