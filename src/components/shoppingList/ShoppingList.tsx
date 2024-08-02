import React, { useEffect, useState } from "react"
import { Button, Card, Col, Form, ListGroup, Row } from "react-bootstrap"
import "./shoppingList.scss"
import { AiFillPlusCircle } from "react-icons/ai"
import { fetchShopping } from "../../firebase/getShoppingList.tsx"
import { addShoppingItem } from "../../firebase/addShoppingListItem.tsx"
import { ShoppingListItem } from "../../interfaces/ShoppingListItem.tsx"

const ShoppingList: React.FC = () => {
    const [shoppingElements, setShoppingElements] = useState<ShoppingListItem[]>([])
    const [newItemName, setNewItemName] = useState("")

    useEffect(() => {
        fetchShoppingListItems()
    }, [])

    const fetchShoppingListItems = async () => {
        try {
            const data = await fetchShopping()
            setShoppingElements(data)
        } catch (error) {
            console.error("Error fetching shopping list items: ", error)
        }
    }
    function addNewShoppingItem() {
        addShoppingItem(newItemName, 5)
        fetchShoppingListItems()
        setNewItemName("")
    }

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
                    <Row>
                        <Col xs={9}>
                            <Form.Control
                                onChange={(e) => setNewItemName(e.target.value)}
                                value={newItemName}
                                placeholder={"Neues Element hinzufügen"}
                                className={"inputField"}
                            />
                        </Col>
                        <Col xs={3}>
                            <Button onClick={addNewShoppingItem}>
                                <AiFillPlusCircle />
                            </Button>
                        </Col>
                    </Row>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}
export default ShoppingList
