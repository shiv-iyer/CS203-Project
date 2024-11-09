import React, { useState } from "react";
import { Container, Form, Button, Nav } from "react-bootstrap";
import "../styles.css";
import axios from 'axios';

export default function User() {
    // State to track which form (Login/Register) is active
    const [activeTab, setActiveTab] = useState('login');
    const [error, setError] = useState(null); // Store any error that may occur during the fetch

    // Handler for switching between login and register tabs
    const handleTabSelect = (tab) => {
        setActiveTab(tab);
    };

    const viewUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/players');
            console.log("All players:");
            console.log(response.data);
        } catch (error) {
            setError("Error fetching players!");
            console.error(error);
        }
    }

    const registerUser = async () => {
        try {
            const playerData = {
                "username": "Player6",
                "password": "Password6",
                "email": "chooyangh@gmail.com",
                "authorities": "ROLE_ADMIN",
                "globalEloRating": 2666
            };

            const response = await axios.post('http://localhost:8080/players', playerData, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
            });
    
            alert("Player created successfully!");
            console.log('Response:', response.data);
        } catch (error) {
            // handle error in posting
            console.error("Error creating player:", error);
            alert("Error creating player!");
        }
    }

    const deleteUser = async () => {
        try {

            const username = 'Player6';
            const password = 'Password6';
            const encodedCredentials = btoa(`${username}:${password}`);  // Encode the credentials in Base64

            const response = await axios.delete('http://localhost:8080/players/Player6', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Basic ${encodedCredentials}`
                    }
            });
    
            alert("Player deleted successfully!");
            console.log('Response:', response.data);
        } catch (error) {
            // handle error in posting
            console.error("Error deleting player:", error);
            alert("Error deleting player!");
        }
    }

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
                                <Button variant="success" onClick={viewUsers}>View All Users</Button>
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

                                <Button variant="primary" onClick={registerUser}>Register</Button>
                                <Button variant="danger" onClick={deleteUser}>Delete</Button>
                            </Form>
                        </div>
                    )}
                </div>
            </Container>
        </React.Fragment>
    );
}