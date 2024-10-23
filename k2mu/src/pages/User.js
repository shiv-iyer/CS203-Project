import React, { useState } from "react";
import { Container, Form, Button, Nav } from "react-bootstrap";
import "../styles.css";

export default function User() {
    // State to track which form (Login/Register) is active
    const [activeTab, setActiveTab] = useState('login');

    // Handler for switching between login and register tabs
    const handleTabSelect = (tab) => {
        setActiveTab(tab);
    };

    return (
        <React.Fragment>
            <Container className="page-primary main-text">
                <h1 className="main-header">User Page</h1>

                {/* Tabs for Login and Register */}
                <Nav variant="tabs" defaultActiveKey="login" className="mb-3">
                    <Nav.Item>
                        <Nav.Link 
                            eventKey="login" 
                            onClick={() => handleTabSelect('login')}
                            active={activeTab === 'login'}
                        >
                            Login
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link 
                            eventKey="register" 
                            onClick={() => handleTabSelect('register')}
                            active={activeTab === 'register'}
                        >
                            Register
                        </Nav.Link>
                    </Nav.Item>
                </Nav>

                <h2 className="sub-header">
                    {activeTab == 'login' ? "Welcome back :)" : "Let's get started!"}
                </h2>

                {/* Render the Login or Register form based on activeTab */}
                <div className="form-container">
                    {activeTab === 'login' && (
                        <div className="user-form">
                            <Form>
                                <Form.Group className="mb-3" controlId="formUsername">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control placeholder="Enter Username"></Form.Control>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Enter Password"></Form.Control>
                                    <Form.Text className="text-muted">
                                        We will never share your information with anyone else.
                                    </Form.Text>
                                </Form.Group>

                                <Button variant="primary">Login</Button>
                            </Form>
                        </div>
                    )}

                    {activeTab === 'register' && (
                        <div className="user-form">
                            <Form>
                                <Form.Group className="mb-3" controlId="registerUsername">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control placeholder="Enter Username"></Form.Control>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="registerPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Enter Password"></Form.Control>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="registerConfirmPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type="password" placeholder="Confirm Password"></Form.Control>
                                </Form.Group>

                                <Button variant="primary">Register</Button>
                            </Form>
                        </div>
                    )}
                </div>
            </Container>
        </React.Fragment>
    );
}