import { collection, getDocs } from "firebase/firestore"
import { database } from "./firebase.ts"
import { Message } from "../interfaces/Message.tsx"

const fetchAllMessages = async (): Promise<Message[]> => {
    const docRef = collection(database, "messages")
    const docSnap = await getDocs(docRef)

    const newData: Message[] = []
    docSnap.forEach((doc) => {
        newData.push({
            messageText: doc.data().Message,
            dateAdded: doc.data().DateAdded,
        })
    })

    return newData
}

export { fetchAllMessages }
