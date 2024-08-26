import { collection, getDocs } from "firebase/firestore"
import { database } from "../firebase.ts"
import { QuizQuestion } from "../../interfaces/QuizQuestion.tsx"

const getRandomQuizQuestion = async (): Promise<QuizQuestion> => {
    const docRef = collection(database, "quiz-questions")
    const docSnap = await getDocs(docRef)

    const newData: QuizQuestion[] = []
    docSnap.forEach((doc) => {
        newData.push({
            question: doc.data().Question,
            correctAnswer: doc.data().CorrectAnswer,
            answerOptions: doc.data().AnswerOptions,
            author: doc.data().Author,
            dateAdded: doc.data().DateAdded.toDate(),
        })
    })
    if (newData.length > 1) {
        return newData[Math.floor(Math.random() * newData.length)]
    } else {
        return newData[0]
    }
}

export { getRandomQuizQuestion }
