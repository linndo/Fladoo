import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore"
import { database } from "../firebase.ts"

const deleteMessage = async (message: string): Promise<void> => {
    const collectionRef = collection(database, "messages")

    const q = query(collectionRef, where("Message", "==", message))
    const querySnapshot = await getDocs(q)

    querySnapshot.docs.map(async (document) => {
        const docRef = doc(database, "messages", document.id)
        await deleteDoc(docRef)
    })
}

export { deleteMessage }
