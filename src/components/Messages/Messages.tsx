import React, { useEffect, useState } from "react"
import { Card, Col, Dropdown, Form, Row } from "react-bootstrap"

import "./messages.scss"

import { BiDotsVertical, BiPencil } from "react-icons/bi"
import { addMessage } from "../../firebase/addNewMessage.tsx"
import { fetchAllMessages } from "../../firebase/getMessages.tsx"
import { Message } from "../../interfaces/Message.tsx"
import { deleteMessage } from "../../firebase/deleteMessage.tsx"

const Messages: React.FC = () => {
    const [newMessage, setNewMessage] = useState("")
    const [messages, setMessages] = useState<Message[]>([])

    useEffect(() => {
        fetchMessages()
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
        setNewMessage(message)
    }

    function addNewMessage() {
        addMessage(newMessage)
        setNewMessage("")
        fetchMessages()
    }

    function deleteCurrentMessage(message: string) {
        console.log("lösche diese message: ", message)
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
                            <Col xs={10}>
                                <Form.Control
                                    className={"newMessageInput"}
                                    type={"text"}
                                    placeholder={"Neue Nachricht verfassen..."}
                                    value={newMessage}
                                    onChange={(e) => handleNewMessageInput(e.target.value)}
                                    required
                                />
                            </Col>
                            <Col xs={2}>
                                <BiPencil onClick={addNewMessage} />
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </div>
            {messages.map((message) => (
                <Card className={"message"} key={message.dateAdded.toString()}>
                    <Card.Body>
                        <Row>
                            <Col xs={10}>{message.messageText}</Col>
                            <Col xs={2}>
                                <Dropdown>
                                    <Dropdown.Toggle className={"editMessageButton"}>
                                        <BiDotsVertical className={"editMessageDots"} />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => deleteCurrentMessage(message.messageText)}>
                                            Nachricht löschen
                                        </Dropdown.Item>
                                        <Dropdown.Item href={"#action"}>Details anzeigen</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            ))}
        </div>
    )
}

export default Messages
