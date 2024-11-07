import React, { useState, useEffect } from "react";
import { Card, Container, Button, ListGroup, Modal } from "react-bootstrap";
import axios from 'axios';

// import styles
import "../styles.css";

// tournaments header image
import pieces from "../resources/pieces-tour.jpg";
import knightIcon from "../resources/dark-knight.png";

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

    const handlePostTournament = async () => {
        const tournamentData = {
            "name": "Reiwen Tournament",
            "tournamentStatus": "Registration",
            "tournamentStyle": "random",
            "maxPlayers": 16,
            "minPlayers": 4,
            "minElo": 1000,
            "maxElo": 3500,
            "registrationCutOff": "2024-10-30T23:59:59"
        };

        // Basic Auth credentials
        const username = 'Player1';
        const password = 'Password1';
        const encodedCredentials = btoa(`${username}:${password}`);  // Encode the credentials in Base64


        try {
            const response = await axios.post('http://localhost:8080/tournaments', tournamentData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${encodedCredentials}`
                }
            });

            alert("Tournament created successfully!");
            console.log('Response:', response.data);
        } catch (error) {
            // handle error in posting
            console.error("Error creating tournament:", error);
            alert("Error creating tournament!");
        }
    }

    const handlePostTournamentt = async () => {
        alert("new");
    }

    const handleDeleteTournament = async () => {

        // Basic Auth credentials
        const username = 'Player1';
        const password = 'Password1';
        const encodedCredentials = btoa(`${username}:${password}`);  // Encode the credentials in Base64


        try {
            const response = await axios.delete('http://localhost:8080/tournaments/9', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${encodedCredentials}`
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error("Error deleteing tournament:", error);
            alert("Error deleting tournament!");
        }
    }

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
                    <Button variant="success" onClick={handlePostTournamentt}>Create Tournament</Button>
                    <Button variant="danger" onClick={handleDeleteTournament}>Delete Tournament</Button>
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
                            tournaments.map((tournament) => (
                                <Card key={tournament.tournamentId} className="mb-3 tournament-card">
                                    <Card.Body>
                                        {/* Chess piece icon in the top right to look cooler */}
                                        <img src={knightIcon} alt="Chess Knight Icon" className="chess-icon" />
                                        <Card.Title className="tournament-title">{tournament.name}</Card.Title>
                                        <hr className="divider" />
                                        <Card.Subtitle className="mb-2 text-muted">Status: {tournament.tournamentStatus}</Card.Subtitle>
                                        <Card.Text>
                                            <strong>Style:</strong> {tournament.tournamentStyle} <br />
                                            <strong>Max Players:</strong> {tournament.maxPlayers} <br />
                                            <strong>Min Players:</strong> {tournament.minPlayers} <br />
                                            <strong>Min Elo:</strong> {tournament.minElo} <br />
                                            <strong>Max Elo:</strong> {tournament.maxElo} <br />
                                            <strong>Registration Cutoff:</strong> {new Date(tournament.registrationCutOff).toLocaleString()} <br />
                                            <strong>Registered Players:</strong> {tournament.registeredPlayersId.length} <br />
                                            <strong>Rankings:</strong> {tournament.rankings ? tournament.rankings.join(', ') : 'N/A'}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
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
