import React, { useEffect, useState } from "react"
import { Card, Form, ListGroup } from "react-bootstrap"
import "./shoppingList.scss"
import { AiFillPlusCircle } from "react-icons/ai"
import { fetchShopping } from "../../firebase/getShoppingList.tsx"

interface ShoppingElement {
    id: string
    name: string
    amount: number
    dateAdded: Date
}
const ShoppingList: React.FC = () => {
    const [shoppingElements, setShoppingElements] = useState<ShoppingElement[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchShopping()
            setShoppingElements(data)
        }

        fetchData()
    }, [])

    return (
        <Card>
            <Card.Body>
                <Card.Title>Shopping List</Card.Title>
                <ListGroup>
                    {shoppingElements.map((element) => (
                        <ListGroup.Item
                            action
                            as={"li"}
                            className={"d-flex justify-content-between align-items-start"}
                            key={element.id}
                        >
                            {element.name}
                            <Form.Check className={"checkbox"} />
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                <Card.Text>
                    <Form.Control placeholder={"Neues Element hinzufügen"} className={"inputField"} />
                    <AiFillPlusCircle />
                </Card.Text>
            </Card.Body>
        </Card>
    )
}
export default ShoppingList
