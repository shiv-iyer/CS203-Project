import React, { useState } from "react";
import { Container, Form, Button, Nav } from "react-bootstrap";
import "../styles.css";
import axios from 'axios';
import { IP_ADDRESS } from '../config';

export default function User() {
    // State to track which form (Login/Register) is active
    const [activeTab, setActiveTab] = useState('login');
    const [error, setError] = useState(null); // Store any error that may occur during the fetch

    const [formFields, setFormFields] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        isAdmin: false
    });

    // Handler for switching between login and register tabs
    const handleTabSelect = (tab) => {
        setActiveTab(tab);
    };

    // handle any change in the form fields
    const handleInputChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormFields({
            ...formFields,
            [name]: type === "checkbox" ? checked : value
        })
    }

    const viewUsers = async () => {
        try {
            const response = await axios.get(IP_ADDRESS + '/players');
            console.log("All players:");
            console.log(response.data);
        } catch (error) {
            setError("Error fetching players!");
            console.error(error);
        }
    }

    const registerUser = async () => {
        
        const {username, email, password, isAdmin} = formFields;
        // console.log(formFields);
        // ROLE_ADMIN vs ROLE_USER
        try {
            const playerData = {
                "username": username,
                "password": password,
                "email": email,
                "authorities": isAdmin ? "ROLE_ADMIN" : "ROLE_USER",
                "globalEloRating": 2666
            };

            const response = await axios.post(IP_ADDRESS + '/players', playerData, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
            });
    
            alert("Player created successfully!");
            console.log('Response:', response.data);

            // clear form fields
            setFormFields({
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
                isAdmin: false,
            });

        } catch (error) {
            // handle error in posting
            console.error("Error creating player:", error);
            alert("Error creating player!");
        }
    }

    const deleteUser = async () => {
        try {

            const username = 'YangHwee69';
            const password = '12345678';
            const encodedCredentials = btoa(`${username}:${password}`);  // Encode the credentials in Base64

            const response = await axios.delete(IP_ADDRESS + '/players/YangHwee69', {
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

    const handleLogin = () => {
        alert("Logged in successfully as Player77!");
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

                                <Button variant="primary" onClick={handleLogin}>Login</Button>
                                <Button variant="success" onClick={viewUsers}>View All Users</Button>
                            </Form>
                        </div>
                    )}

                    {activeTab === 'register' && (
                        <div className="user-form">
                            <Form>
                                <Form.Group className="mb-3" controlId="registerUsername">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        name="username"
                                        placeholder="Enter Username"
                                        value={formFields.username}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="registerEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        name="email"
                                        placeholder="Enter Email"
                                        value={formFields.email}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>


                                <Form.Group className="mb-3" controlId="registerPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        name="password"
                                        type="password"
                                        placeholder="Enter Password"
                                        value={formFields.password}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="registerConfirmPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="Confirm Password"
                                        value={formFields.confirmPassword}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3 custom-switch" controlId="registerRole">
                                    <Form.Check
                                        type="switch"
                                        id="role"
                                        label="Admin?"
                                        name="isAdmin"
                                        checked={formFields.isAdmin}
                                        onChange={handleInputChange}
                                    />
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