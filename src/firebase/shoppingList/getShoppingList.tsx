import { collection, getDocs } from "firebase/firestore"
import { database } from "../firebase.ts"
import { ShoppingListItem } from "../../interfaces/ShoppingListItem.tsx"

const fetchShopping = async (): Promise<ShoppingListItem[]> => {
    const docRef = collection(database, "shopping-list")
    const docSnap = await getDocs(docRef)

    const newData: ShoppingListItem[] = []
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
