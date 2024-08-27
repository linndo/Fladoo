import React, { useEffect, useState } from "react"

import "./managehousehold.scss"

import { fetchFlatmates, Flatmate } from "../../firebase/getFlatmates.tsx"
import { ListGroup } from "react-bootstrap"

const ManageHousehold: React.FC = () => {
    const [flatmates, setFlatmates] = useState<Flatmate[]>([])

    useEffect(() => {
        ;(async () => {
            const data = await fetchFlatmates()
            setFlatmates(data)
        })()
    }, [])

    return (
        <>
            <div>Mitglieder verwalten</div>
            <ListGroup>
                {flatmates.map((flatmate) => (
                    <ListGroup.Item key={flatmate.id}>{flatmate.name}</ListGroup.Item>
                ))}
            </ListGroup>
        </>
    )
}

export default ManageHousehold
