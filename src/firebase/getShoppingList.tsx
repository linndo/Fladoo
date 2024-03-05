import { collection, getDocs } from "firebase/firestore"
import { database } from "./firebase.ts"

interface ShoppingElement {
    id: string
    name: string
    amount: number
    dateAdded: Date
}
const fetchShopping = async (): Promise<ShoppingElement[]> => {
    const docRef = collection(database, "shopping-list")
    const docSnap = await getDocs(docRef)

    const newData: ShoppingElement[] = []
    docSnap.forEach((doc) => {
        newData.push({
            id: doc.id,
            name: doc.data().Name,
            amount: doc.data().Amount,
            dateAdded: doc.data().DateAdded,
        })
    })

    return newData
}

export { fetchShopping }
