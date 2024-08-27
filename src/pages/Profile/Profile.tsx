import "./profile.scss"
import React from "react"
import { Card, ListGroup, ListGroupItem } from "react-bootstrap"

const Profile: React.FC = () => {
    return (
        <>
            <Card className={"profileCard"}>
                <Card.Header>My Profile</Card.Header>
                <Card.Body>
                    <ListGroup>
                        <ListGroupItem>Name: Susanne</ListGroupItem>
                        <ListGroupItem>Nachname: Musterfrau</ListGroupItem>
                    </ListGroup>
                </Card.Body>
            </Card>
        </>
    )
}

export default Profile
