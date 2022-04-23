import React from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, Container, Nav } from 'react-bootstrap'

export class NavBar extends React.Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark" className="mb-3">
                <Container fluid>
                    <Navbar.Brand>Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        <NavLink to="/" className="nav-link">Home</NavLink>
                        <NavLink to="/todos" className="nav-link">ToDo lists</NavLink>
                    </Nav>
                </Container>
            </Navbar>
        )
    }
}