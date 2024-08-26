import React from "react"

import "./home.scss"

import ShoppingList from "../../components/shoppingList/ShoppingList.tsx"
import { Col, Row } from "react-bootstrap"
import Messages from "../../components/Messages/Messages.tsx"
import Quiz from "../../components/Quiz/Quiz.tsx"

const Home: React.FC = () => {
    return (
        <>
            <div>
                <Row>
                    <Col>
                        <ShoppingList />
                    </Col>
                    <Col>
                        <Messages />
                    </Col>
                    <Col>
                        <Quiz />
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Home
