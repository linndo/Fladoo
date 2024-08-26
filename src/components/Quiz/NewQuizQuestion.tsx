import React, { useState } from "react"

import "./newQuizQuestion.scss"

import { Button, ButtonGroup, Col, Form, Modal, Row } from "react-bootstrap"
import { addNewQuizQuestion } from "../../firebase/quiz/addNewQuizQuestion.tsx"
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"
import { BiCheckCircle, BiCircle } from "react-icons/bi"

interface NewQuizQuestionProps {
    showAddNewQuizQuestion: boolean
    closeShowAddNewQuizQuestion: () => void
}
const NewQuizQuestion: React.FC<NewQuizQuestionProps> = ({ showAddNewQuizQuestion, closeShowAddNewQuizQuestion }) => {
    const [newQuestion, setNewQuestion] = useState("")
    const [newQuestionAnswers, setNewQuestionAnswers] = useState(["", "", ""])
    const [correctAnswerPosition, setCorrectAnswerPosition] = useState(0)
    const [newQuizError, setNewQuizError] = useState("")
    const [difficulty, setDifficulty] = useState(3)

    function handleNewQuestionChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setNewQuestion(e.target.value.trimStart())
    }
    function handleAnswerChange(e: { target: { value: string } }, index: number) {
        const updatedAnswers = [...newQuestionAnswers]
        updatedAnswers[index] = e.target.value
        setNewQuestionAnswers(updatedAnswers)
        setNewQuizError("")
    }

    function addAnswerRow() {
        setNewQuestionAnswers([...newQuestionAnswers, ""])
        setNewQuizError("")
    }

    function deleteAnswerRow(key: number) {
        const currentAnswers = [...newQuestionAnswers]
        currentAnswers.splice(key, 1)
        setNewQuestionAnswers(currentAnswers)
        setNewQuizError("")
        if (correctAnswerPosition != 0) {
            setCorrectAnswerPosition(correctAnswerPosition - 1)
        }
    }

    function addQuestion() {
        if (!newQuestion) {
            setNewQuizError("missingQuestion")
            return
        }

        let answers = newQuestionAnswers
        const correctAnswer = newQuestionAnswers[correctAnswerPosition]
        answers.splice(correctAnswerPosition, 1)
        answers = answers.filter((answer) => answer !== "")

        if (answers.length < 2) {
            setNewQuizError("tooFewAnswers")
            return
        }
        if (correctAnswer == "") {
            setNewQuizError("missingCorrectAnswer")
            return
        }

        addNewQuizQuestion(newQuestion, correctAnswer, answers)
        setNewQuestionAnswers(["", "", ""])
        setNewQuestion("")
        setCorrectAnswerPosition(0)
        closeShowAddNewQuizQuestion()
    }

    function selectRightAnswer(key: number) {
        setCorrectAnswerPosition(key)
    }

    return (
        <div>
            <Modal show={showAddNewQuizQuestion} onHide={closeShowAddNewQuizQuestion}>
                <Modal.Header closeButton>
                    <div className={"heading"}>Eine neue Frage erstellen</div>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <div className={"subheading"}>Wie lautet die Frage?</div>
                    </Row>
                    <Row className={"newQuestionInputRow"}>
                        <Form.Control
                            type={"text"}
                            placeholder={"Enter question here"}
                            value={newQuestion}
                            onChange={(e) => handleNewQuestionChange(e)}
                            className={`newQuestionInput ${newQuizError == "missingQuestion" ? "newQuestionInputError" : ""}`}
                        />
                    </Row>
                    <Row>
                        <Col className={"d-flex justify-content-end"}>
                            <div>Schwierigkeit:</div>
                        </Col>
                        <Col className={"d-flex justify-content-start"}>
                            <ButtonGroup className={"difficultyLevelGroup"}>
                                <Button
                                    active={difficulty == 1}
                                    size={"sm"}
                                    onClick={() => setDifficulty(1)}
                                    className={"difficultyLevelButton"}
                                >
                                    1
                                </Button>
                                <Button
                                    active={difficulty == 2}
                                    size={"sm"}
                                    onClick={() => setDifficulty(2)}
                                    className={"difficultyLevelButton"}
                                >
                                    2
                                </Button>
                                <Button
                                    active={difficulty == 3}
                                    size={"sm"}
                                    onClick={() => setDifficulty(3)}
                                    className={"difficultyLevelButton"}
                                >
                                    3
                                </Button>
                                <Button
                                    active={difficulty == 4}
                                    size={"sm"}
                                    onClick={() => setDifficulty(4)}
                                    className={"difficultyLevelButton"}
                                >
                                    4
                                </Button>
                                <Button
                                    active={difficulty == 5}
                                    size={"sm"}
                                    onClick={() => setDifficulty(5)}
                                    className={"difficultyLevelButton"}
                                >
                                    5
                                </Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                    <div>
                        <hr className={"divider"} />
                    </div>
                    <Row>
                        <div className={"subheading"}>Welche Antwortmöglichkeiten gibt es?</div>
                    </Row>
                    <Row className={"answerInputInfo"}>
                        Hier kannst du 3-5 Antwortoptionen eingeben und die korrekte Antwort auswählen.
                    </Row>
                    {newQuestionAnswers.map((answer, index) => (
                        <Row key={`question-${index}`} className={"newQuestionAnswerRow"}>
                            <Col xs={1} className={"align-content-center"}>
                                {correctAnswerPosition == index && (
                                    <BiCheckCircle size={25} className={"selectAnswerIcon"} />
                                )}
                                {correctAnswerPosition != index && (
                                    <BiCircle
                                        size={25}
                                        onClick={() => selectRightAnswer(index)}
                                        className={"selectAnswerIcon"}
                                    />
                                )}
                            </Col>
                            <Col xs={9}>
                                <Form.Control
                                    type={"text"}
                                    placeholder={"Enter answer here"}
                                    value={answer}
                                    key={index}
                                    onChange={(e) => handleAnswerChange(e, index)}
                                    className={`newQuestionInput ${newQuizError == "tooFewAnswers" ? "newQuestionInputError" : ""} ${correctAnswerPosition == index ? "rightAnswerInput" : ""}`}
                                />
                            </Col>
                            {newQuestionAnswers.length > 3 && (
                                <Col xs={1} className={"deleteAnswerIcon"} onClick={() => deleteAnswerRow(index)}>
                                    <AiOutlineMinus size={25} />
                                </Col>
                            )}
                        </Row>
                    ))}
                    {newQuestionAnswers.length < 5 && (
                        <Row>
                            <Col xs={1}></Col>
                            <Col xs={9} className={"addAnswerIcon"}>
                                <AiOutlinePlus size={25} onClick={() => addAnswerRow()} />
                            </Col>
                        </Row>
                    )}
                    {newQuizError == "missingQuestion" && (
                        <Row className={"newQuestionInputRow"}>
                            <div className={"inputErrorText"}>Bitte gib eine gültige Frage ein.</div>
                        </Row>
                    )}
                    {newQuizError == "tooFewAnswers" && (
                        <Row className={"newQuestionInputRow"}>
                            <div className={"inputErrorText"}>
                                Bitte gib mindestens 2 gültige Antwortmöglichkeiten ein.
                            </div>
                        </Row>
                    )}
                    <Row>
                        <div className={"d-flex justify-content-end"}>
                            <Button onClick={addQuestion} className={"submitButton"}>
                                Submit Question
                            </Button>
                        </div>
                    </Row>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default NewQuizQuestion
