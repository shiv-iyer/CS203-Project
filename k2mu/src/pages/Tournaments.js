import React, { useState, useEffect } from "react";
import { Container, Button, ListGroup, Modal } from "react-bootstrap";
import axios from 'axios';

// import styles
import "../styles.css";

// tournaments header image
import pieces from "../resources/pieces-tour.jpg";

export default function Tournaments() {
    const [showTournaments, setShowTournaments] = useState(false);
    const [showUserTournaments, setShowUserTournaments] = useState(false);
    const [tournaments, setTournaments] = useState([]);  // Store fetched tournaments
    const [error, setError] = useState(null); // Store any error that may occur during the fetch
    
    const fetchTournaments = async () => {
        try {
            const response = await axios.get('http://localhost:8080/tournaments');  // API URL for fetching tournaments
            setTournaments(response.data);  // Set the fetched tournaments
            console.log(response.data);
        } catch (error) {
            setError("Error fetching tournaments");
            console.error(error);
        }
    };

    const handleShowTournaments = () => {
        setShowTournaments(true);
        fetchTournaments();  // Fetch tournaments when button is clicked
    };

    const handleClose = () => {
        setShowTournaments(false);
    };

    const handleShowUserTournaments = () => {
        setShowUserTournaments(true);
    };

    const handleUserClose = () => {
        setShowUserTournaments(false);
    };

    return (
        <React.Fragment>
            <Container className="page-primary">
                <h1 className="main-header">Tournaments</h1>

                {/* hero image to look cool */}
                <img src={pieces} className="hero-img" alt="Tournaments Header" />

                <div className="button-group">
                    <Button onClick={handleShowTournaments}>View Available Tournaments</Button>
                    <Button variant="info" onClick={handleShowUserTournaments}>My Current Tournaments</Button>
                </div>

                {/* Modal will display our tournaments */}
                <Modal show={showTournaments} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title>Available Tournaments</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{maxHeight: "400px", overflowY: "scroll"}}>
                        {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Display error if any */}
                        <ListGroup>
                            {tournaments.length > 0 ? (
                                tournaments.map((tournament, index) => (
                                    <ListGroup.Item key={index}>{tournament.name}</ListGroup.Item>  // Display tournament name
                                ))
                            ) : (
                                <p>No tournaments available</p>
                            )}
                        </ListGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* The same thing but for user tournaments */}
                <Modal show={showUserTournaments} onHide={handleUserClose}>
                    <Modal.Header>
                        <Modal.Title>My Tournaments</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{maxHeight: "400px", overflowY: "scroll"}}>
                        <ListGroup>
                            {/* For now, we leave user tournaments as static data */}
                            <ListGroup.Item>Tournament 1</ListGroup.Item>
                            <ListGroup.Item>Tournament 7</ListGroup.Item>
                        </ListGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleUserClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </React.Fragment>
    );
}
