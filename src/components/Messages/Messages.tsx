import React, { useEffect, useState } from "react"
import { Button, Card, Col, Dropdown, Form, Modal, Row, Table } from "react-bootstrap"

import "./messages.scss"

import { Message } from "../../interfaces/Message.tsx"
import { BiDotsVertical, BiPencil } from "react-icons/bi"
import { addMessage } from "../../firebase/messageBoard/addNewMessage.tsx"
import { fetchAllMessages } from "../../firebase/messageBoard/getMessages.tsx"
import { deleteMessage } from "../../firebase/messageBoard/deleteMessage.tsx"

const Messages: React.FC = () => {
    const [newMessage, setNewMessage] = useState("")
    const [newMessageValidation, setNewMessageValidation] = useState(true)
    const [messages, setMessages] = useState<Message[]>([])
    const [detailMessage, setDetailMessage] = useState<Message | null>()

    useEffect(() => {
        try {
            fetchMessages()
        } catch (error) {
            console.error("error")
        }
    }, [])

    const fetchMessages = async () => {
        try {
            const data = await fetchAllMessages()
            setMessages(data)
            console.log(messages)
        } catch (error) {
            console.error("Error fetching messages: ", error)
        }
    }
    function handleNewMessageInput(message: string) {
        setNewMessage(message.trimStart())
        setNewMessageValidation(true)
    }

    function addNewMessage() {
        if (newMessage.trim().length > 0) {
            addMessage(newMessage.trim())
            setNewMessage("")
            fetchMessages()
        } else {
            setNewMessageValidation(false)
            console.log("fehler")
        }
    }

    function deleteCurrentMessage(message: string) {
        deleteMessage(message)
        fetchMessages()
    }

    return (
        <div>
            <div>
                <h1 className={"text-center"}>News</h1>
                <Card>
                    <Card.Body>
                        <Row>
                            <Col xs={10} className={"pl-3 align-content-center {}"}>
                                <Form.Control
                                    className={`newMessageInput ${newMessageValidation ? "" : "invalidInput"}`}
                                    as={"textarea"}
                                    placeholder={"Neue Nachricht verfassen..."}
                                    value={newMessage}
                                    onChange={(e) => handleNewMessageInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            addNewMessage()
                                        }
                                    }}
                                    required
                                />
                            </Col>
                            <Col xs={2} className={"align-content-center"}>
                                <Button className={"writeMessageButton"} onClick={addNewMessage}>
                                    <BiPencil className={"writeMessageIcon"} />
                                </Button>
                            </Col>
                        </Row>
                        {!newMessageValidation && (
                            <Row>
                                <Col className={"validationMessage"}>Bitte eine gültige Nachricht eingeben.</Col>
                            </Row>
                        )}
                    </Card.Body>
                </Card>
            </div>
            {messages.map((message) => (
                <Card className={"message"} key={message.dateAdded.toString()}>
                    <Card.Body>
                        <Row>
                            <Col xs={10} className={"pl-3 align-content-center"}>
                                {message.messageText}
                            </Col>
                            <Col xs={2} className={"align-content-center"}>
                                <Dropdown>
                                    <Dropdown.Toggle className={"editMessageButton"}>
                                        <BiDotsVertical className={"editMessageDots"} />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => deleteCurrentMessage(message.messageText)}>
                                            Nachricht löschen
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => setDetailMessage(message)}>
                                            Details anzeigen
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={6}></Col>
                            <Col xs={6} className={"messageAuthor"}>
                                ~ {message.author}
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            ))}
            <Modal show={!!detailMessage} onHide={() => setDetailMessage(null)} keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Nachrichtendetails</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table>
                        <Row>
                            <Col xs={4}>Nachricht:</Col>
                            <Col xs={8}>{detailMessage?.messageText}</Col>
                        </Row>
                        <Row>
                            <Col xs={4}>Autor:</Col>
                            <Col xs={8}>{detailMessage?.author}</Col>
                        </Row>
                        <Row>
                            <Col xs={4}>Datum:</Col>
                            <Col xs={8}>{detailMessage?.dateAdded.toLocaleString()}</Col>
                        </Row>
                    </Table>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Messages
