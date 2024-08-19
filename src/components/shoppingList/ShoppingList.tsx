import React, { useEffect, useState } from "react"
import { Button, Card, Col, Form, ListGroup, Row } from "react-bootstrap"

import "./shoppingList.scss"

import { AiFillPlusCircle } from "react-icons/ai"
import { fetchShopping } from "../../firebase/shoppingList/getShoppingList.tsx"
import { addShoppingItem } from "../../firebase/shoppingList/addShoppingListItem.tsx"
import { ShoppingListItem } from "../../interfaces/ShoppingListItem.tsx"
import { deleteShoppingItem } from "../../firebase/shoppingList/deleteShoppingListItem.tsx"
import { BiTrash } from "react-icons/bi"

const ShoppingList: React.FC = () => {
    const [shoppingElements, setShoppingElements] = useState<ShoppingListItem[]>([])
    const [newItemName, setNewItemName] = useState("")
    const [newItemAmount, setNewItemAmount] = useState(1)
    const [newItemValidated, setNewItemValidated] = useState(true)

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
        if (newItemName.trim().length > 0) {
            addShoppingItem(newItemName, newItemAmount)
            fetchShoppingListItems()
            setNewItemName("")
            setNewItemAmount(1)
        } else setNewItemValidated(false)
    }

    function removeShoppingItem(name: string) {
        deleteShoppingItem(name)
        fetchShoppingListItems()
    }

    const handleAmountChange = (newAmount: number) => {
        setNewItemAmount(newAmount)
    }

    function handleItemInputChange(item: string) {
        setNewItemName(item.trimStart())
        setNewItemValidated(true)
    }

    return (
        <div className={"shoppingList"}>
            <h1 className={"text-center"}>Shopping List</h1>
            <Card>
                <Card.Body>
                    <ListGroup>
                        {shoppingElements.map((element) => (
                            <ListGroup.Item action as={"li"} className={"shoppingItem"} key={element.id}>
                                <Row className={"inputRow"}>
                                    <Col xs={1} className={"shoppingCol"}>
                                        {element.amount}
                                    </Col>
                                    <Col xs={10} className={"shoppingCol"}>
                                        {element.name}
                                    </Col>
                                    <Col xs={1} className={"shoppingCol"}>
                                        <Button
                                            className={"trashButton"}
                                            onClick={() => removeShoppingItem(element.name)}
                                        >
                                            <BiTrash className={"trashIcon"} />
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    <Card.Text>
                        <Row className={"inputRow"}>
                            <Col xs={8} className={"inputCol"}>
                                <Form.Control
                                    onChange={(e) => handleItemInputChange(e.target.value)}
                                    value={newItemName}
                                    placeholder={"Neues Element hinzufügen"}
                                    className={"inputField"}
                                />
                            </Col>
                            <Col xs={2} className={"inputCol"}>
                                <input
                                    type={"number"}
                                    className={"numberInput"}
                                    min={1}
                                    value={newItemAmount.toString() || "1"}
                                    onChange={(event) => handleAmountChange(parseInt(event.target.value))}
                                />
                            </Col>
                            <Col xs={2} className={"inputCol"}>
                                <AiFillPlusCircle className={"plusIcon"} onClick={addNewShoppingItem} size={30} />
                            </Col>
                        </Row>
                        {!newItemValidated && (
                            <Row>
                                <Col className={"validationMessage"}>Bitte einen gültigen Namen eingeben</Col>
                            </Row>
                        )}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}
export default ShoppingList
