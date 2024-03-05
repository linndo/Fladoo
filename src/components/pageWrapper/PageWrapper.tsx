import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import "./pageWrapper.scss"
import "bootstrap/dist/css/bootstrap.min.css"

import NavBar from "../navBar/NavBar.tsx"

import Home from "../../pages/home/Home.tsx"
import Gallery from "../../pages/Gallery/Gallery.tsx"

import Container from "react-bootstrap/Container"

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <NavBar />
        <Container>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/gallery" element={<Gallery />} />
                </Routes>
            </Router>
        </Container>
    </React.StrictMode>,
)
