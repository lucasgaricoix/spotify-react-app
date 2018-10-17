import React from 'react';
import {Nav, Navbar, Button, } from 'react-bootstrap';


const Navigation = () => {
    return (
        <div>
            <Nav>
                <Nav.Item>
                    <Nav.Link href='/home'>Home</Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    )
}

export default Navigation