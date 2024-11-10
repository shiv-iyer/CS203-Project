import React, { useState, useEffect } from "react";
import { Container, Button, Modal, Form, ListGroup } from "react-bootstrap";
import axios from 'axios';
import "../styles.css";

export default function Profile() {
    // State for our credentials and user data
    const [showCredentialsModal, setShowCredentialsModal] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showUsersModal, setShowUsersModal] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userData, setUserData] = useState(null); // Store user profile data here
    const [allUsers, setAllUsers] = useState([]); // Storing all users data here
    
    // Function to show login popup
    const showLoginPopup = () => {
        setShowCredentialsModal(true);
    };

    // Handle credentials submission
    const handleCredentialsSubmit = async () => {
        const encodedCredentials = btoa(`${username}:${password}`);
        getUser(username, encodedCredentials);

        // Clear credentials and close modal
        setUsername("");
        setPassword("");
        setShowCredentialsModal(false);
    };

    // Fetch a single user's data
    const getUser = async (username, encodedCredentials) => {
        try {
            const response = await axios.get(`http://localhost:8080/players/${username}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${encodedCredentials}`
                }
            });
            setUserData(response.data); // Store the response data in userData
            setShowProfileModal(true);
        } catch (error) {
            alert("Error retrieving player information!");
            console.error(error);
        }
    };

    const getUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/players');
            setAllUsers(response.data);
            setShowUsersModal(true);
        } catch (error) {
            alert("Error fetching players!");
            console.error(error);
        }
    };

    return (
        <React.Fragment>
            <Container className="page-primary main-text">
                <h1 className="main-header">Profile Page</h1>
                <div className="button-group">
                    <Button variant="info" onClick={showLoginPopup} className="mx-3">View User Profile</Button>
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
                
                {/* Profile Modal */}
                <Modal show={showProfileModal} onHide={() => setShowProfileModal(false)} className="chess-modal">
                    <Modal.Header closeButton>
                        <Modal.Title>User Profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {userData ? (
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <strong>Username:</strong> {userData.username}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Email:</strong> {userData.email}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Verified:</strong> {userData.enabled ? "Yes" : "No"}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Global Elo Rating:</strong> {userData.globalEloRating}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Authorities:</strong> {userData.authorities}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Tournaments Registered:</strong> {userData.tournamentRegisteredIds.join(", ")}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Match History IDs:</strong> {userData.matchHistoryIds.join(", ")}
                                </ListGroup.Item>
                            </ListGroup>
                        ) : (
                            <p>No user data available</p>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => setShowProfileModal(false)}>Close</Button>
                    </Modal.Footer>
                </Modal>

                {/* Users Modal */}
                <Modal show={showUsersModal} onHide={() => setShowUsersModal(false)} className="chess-modal">
                    <Modal.Header closeButton>
                        <Modal.Title>All Users</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {allUsers.length > 0 ? (
                            <ListGroup variant="flush">
                                {allUsers.map((user) => (
                                    <ListGroup.Item key={user.id}>
                                        <strong>ID:</strong> {user.id} | <strong>Username:</strong> {user.username}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        ) : (
                            <p>No users available</p>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => setShowUsersModal(false)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </React.Fragment>
    );
}