import "./managehousehold.scss"
import React, { useEffect, useState } from "react"
import { fetchFlatmates, Flatmate } from "../../firebase/getFlatmates.tsx"
import { ListGroup } from "react-bootstrap"

const ManageHousehold: React.FC = () => {
    const [flatmates, setFlatmates] = useState<Flatmate[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchFlatmates()
            setFlatmates(data)
        }
        fetchData()
    }, [])

    return (
        <>
            <div>Manage Household</div>
            <ListGroup>
                {flatmates.map((flatmate) => (
                    <ListGroup.Item key={flatmate.id}>{flatmate.name}</ListGroup.Item>
                ))}
            </ListGroup>
        </>
    )
}

export default ManageHousehold
