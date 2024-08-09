import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import "./pageWrapper.scss"
import "bootstrap/dist/css/bootstrap.min.css"

import NavBar from "../navBar/NavBar.tsx"

import Home from "../../pages/Home/Home.tsx"
import Gallery from "../../pages/Gallery/Gallery.tsx"
import ManageHousehold from "../../pages/ManageHousehold/ManageHousehold.tsx"
import Profile from "../../pages/Profile/Profile.tsx";

import Container from "react-bootstrap/Container"

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <NavBar />
        <Container>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/manage" element={<ManageHousehold />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </Router>
        </Container>
    </React.StrictMode>,
)
