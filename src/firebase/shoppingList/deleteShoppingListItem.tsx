import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore"
import { database } from "../firebase.ts"

const deleteShoppingItem = async (name: string): Promise<void> => {
    const collectionRef = collection(database, "shopping-list")

    const q = query(collectionRef, where("Name", "==", name))
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach(async (document) => {
        const docRef = doc(database, "shopping-list", document.id)
        await deleteDoc(docRef)
    })
}

export { deleteShoppingItem }
