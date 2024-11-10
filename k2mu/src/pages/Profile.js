import React, { useState, useEffect } from "react";
import { Card, Container, Button, ListGroup, Modal, Form } from "react-bootstrap";
import axios from 'axios';

// import styles
import "../styles.css";

export default function Profile() {

    // state for our credentials
    const [showCredentialsModal, setShowCredentialsModal] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const showLoginPopup = () => {
        setShowCredentialsModal(true);
    }

    const handleCredentialsSubmit = async () => {
        const encodedCredentials = btoa(`${username}:${password}`);
        getUser(username, encodedCredentials)

        // Clear credentials and close modal
        setUsername("");
        setPassword("");
        setShowCredentialsModal(false);
    };

    const getUser = async (username, encodedCredentials) => {
        try {
            const response = await axios.get(IP_ADDRESS + `/players/${username}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${encodedCredentials}`
                }
            });
            console.log(response.data);
        } catch (error) {
            alert("Error retrieving player information!");
            console.error(error);
        }
    }

    const getUsers = async () => {
        try {
            const response = await axios.get(IP_ADDRESS + '/players');
            console.log("All players:");
            console.log(response.data);
        } catch (error) {
            alert("Error fetching players!");
            console.error(error);
        }
    }

    return (
        <React.Fragment>
            <Container className="page-primary main-text">
                <h1 className="main-header">Profile Page</h1>
                <div className="button-group">
                    <Button variant="info" onClick={showLoginPopup}>View User Profile</Button>
                    <Button variant="success" onClick={getUsers}>View All Users</Button>
                </div>

                {/* Credentials Modal */}
                <Modal show={showCredentialsModal} onHide={() => setShowCredentialsModal(false)} className="chess-modal">
                    <Modal.Header closeButton>
                        <Modal.Title>Enter Credentials</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowCredentialsModal(false)}>Cancel</Button>
                        <Button variant="primary" onClick={handleCredentialsSubmit}>Submit</Button>
                    </Modal.Footer>
                </Modal>
                
            </Container>
        </React.Fragment>
    )
}