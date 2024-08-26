import React, { useEffect, useState } from "react"

import "./quiz.scss"

import { Button, Card, Col, Dropdown, ListGroup, ListGroupItem, Row } from "react-bootstrap"
import NewQuizQuestion from "./NewQuizQuestion.tsx"
import { QuizQuestion } from "../../interfaces/QuizQuestion.tsx"
import { getRandomQuizQuestion } from "../../firebase/quiz/getRandomQuizQuestion.tsx"
import { BiDotsVertical } from "react-icons/bi"

const Quiz: React.FC = () => {
    const [addNewQuestion, setAddNewQuestion] = useState(false)
    const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion>()
    const [answerOptions, setAnswerOptions] = useState([""])

    const [correctAnswer, setCorrectAnswer] = useState<number | null>(null)
    const [chosenAnswer, setChosenAnswer] = useState<number | null>(null)

    useEffect(() => {
        fetchQuizQuestion()
    }, [])

    useEffect(() => {
        if (currentQuestion && answerOptions.length > 0) {
            setCorrectAnswer(answerOptions.indexOf(currentQuestion.correctAnswer))
        }
    }, [answerOptions, currentQuestion])

    const fetchQuizQuestion = async () => {
        try {
            const quiz = await getRandomQuizQuestion()
            setCurrentQuestion(quiz)
            setAnswerOptions([...quiz.answerOptions, quiz.correctAnswer].sort(() => Math.random() - 0.5))
            setChosenAnswer(null)
            console.log(quiz)
        } catch (error) {
            console.error("Error fetching quiz: ", error)
        }
    }

    function resetQuiz() {
        fetchQuizQuestion()
        setChosenAnswer(null)
    }

    function checkAnswer(index: number) {
        if (chosenAnswer == null) {
            setChosenAnswer(index)
        }
    }

    return (
        <div>
            <h1 className={"text-center"}>Quiz</h1>
            <Card>
                <Card.Body>
                    <div className={"quizQuestion"}>{currentQuestion?.question}</div>
                    <ListGroup>
                        {answerOptions.map((answerOption, index) => (
                            <ListGroupItem
                                key={`answerOption-${index}`}
                                onClick={() => checkAnswer(index)}
                                className={`quizAnswer ${chosenAnswer != null && correctAnswer == index ? "rightAnswer" : ""} ${chosenAnswer != null && chosenAnswer != correctAnswer && chosenAnswer == index ? "wrongAnswer" : ""} ${chosenAnswer != null && chosenAnswer != correctAnswer && chosenAnswer != index ? "neutralAnswer" : ""}`}
                            >
                                {answerOption}
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                    <Row>
                        <Col xs={4}></Col>
                        <Col xs={6}>
                            <Button variant={"underline"} onClick={resetQuiz} className={"nextQuestionButton"}>
                                Nächste Frage
                            </Button>
                        </Col>
                        <Col xs={2}>
                            <Dropdown>
                                <Dropdown.Toggle className={"editMessageButton"}>
                                    <BiDotsVertical className={"editMessageDots"} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => setAddNewQuestion(true)}>
                                        Frage hinzufügen
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            <NewQuizQuestion
                showAddNewQuizQuestion={addNewQuestion}
                closeShowAddNewQuizQuestion={() => setAddNewQuestion(false)}
            />
        </div>
    )
}

export default Quiz
