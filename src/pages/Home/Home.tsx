import React from "react"

import "./home.scss"
import ShoppingList from "../../components/shoppingList/ShoppingList.tsx"
import { Col, Row } from "react-bootstrap"

const Home: React.FC = () => {
    return (
        <>
            <div>
                <Row>
                    <Col>
                        <ShoppingList />
                    </Col>
                    <Col>placeholder</Col>
                    <Col>placeholder 2</Col>
                </Row>
            </div>
        </>
    )
}

export default Home
