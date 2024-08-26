import { collection, addDoc } from "firebase/firestore"
import { database } from "../firebase.ts"

const addNewQuizQuestion = async (question: string, correctAnswer: string, answerOptions: string[]): Promise<void> => {
    const docRef = collection(database, "quiz-questions")
    await addDoc(docRef, {
        Question: question,
        CorrectAnswer: correctAnswer,
        AnswerOptions: answerOptions,
        Author: "Melli Musterfrau",
        DateAdded: new Date(),
    })
}

export { addNewQuizQuestion }
