import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';

const Navigation = () => {
    return (
        <Navbar bg="danger" variant="dark" className="mb-2">
            <Navbar.Brand href="#home">Guess Image</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/history">History</Nav.Link>
            </Nav>
        </Navbar>

    );
}

export default Navigation;