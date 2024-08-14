import { collection, addDoc } from "firebase/firestore"
import { database } from "./firebase"

const addShoppingItem = async (name: string, amount?: number): Promise<void> => {
    const docRef = collection(database, "shopping-list")
    await addDoc(docRef, {
        Name: name,
        Amount: amount ? amount : 1,
        DateAdded: new Date(),
    })
}

export { addShoppingItem }
