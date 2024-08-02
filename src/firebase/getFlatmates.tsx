import { collection, getDocs } from "firebase/firestore"
import { database } from "./firebase.ts"

interface Flatmate {
    id: string
    name: string
    birthday: string
}
const fetchFlatmates = async (): Promise<Flatmate[]> => {
    const docRef = collection(database, "flatmates")
    const docSnap = await getDocs(docRef)

    const newData: Flatmate[] = []
    docSnap.forEach((doc) => {
        newData.push({
            id: doc.id,
            name: doc.data().name,
            birthday: doc.data().birthday.toString(),
        })
    })

    return newData
}

export { fetchFlatmates }
export type { Flatmate }
