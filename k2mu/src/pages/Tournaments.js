import React, { useState, useEffect } from "react";
import { Card, Container, Button, ListGroup, Modal, Form } from "react-bootstrap";
import axios from 'axios';

// import styles
import "../styles.css";

// tournaments header image
import pieces from "../resources/pieces-tour.jpg";
import knightIcon from "../resources/dark-knight.png";

export default function Tournaments() {
    const [showTournaments, setShowTournaments] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUserTournaments, setShowUserTournaments] = useState(false);
    const [showDeleteTournaments, setShowDeleteTournaments] = useState(false);
    const [tournaments, setTournaments] = useState([]);  // Store fetched tournaments
    const [error, setError] = useState(null); // Store any error that may occur during the fetch

    // store details and information for creation of tournament
    const [name, setName] = useState("");
    const [tournamentStatus, setTournamentStatus] = useState("Registration");
    const [tournamentStyle, setTournamentStyle] = useState("Random");
    const [maxPlayers, setMaxPlayers] = useState(16);
    const [minPlayers, setMinPlayers] = useState(4);
    const [minElo, setMinElo] = useState(1000);
    const [maxElo, setMaxElo] = useState(3500);
    const [registrationCutOff, setRegistrationCutOff] = useState("");
    
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

    const handleCreateTournament = async () => {
        const formattedRegistrationCutOff = registrationCutOff ? `${registrationCutOff}T23:59:59` : "";

        const tournamentData = {
            name,
            tournamentStatus,
            tournamentStyle,
            maxPlayers,
            minPlayers,
            minElo,
            maxElo,
            registrationCutOff: formattedRegistrationCutOff
        };

        const username = 'Player1';
        const password = 'Password1';
        const encodedCredentials = btoa(`${username}:${password}`);

        try {
            const response = await axios.post('http://localhost:8080/tournaments', tournamentData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${encodedCredentials}`
                }
            });
            alert("Tournament created successfully!");
            setShowCreateModal(false);
            fetchTournaments();

            // clear form fields
            setShowCreateModal(false);
            setName("");
            setTournamentStatus("Registration");
            setTournamentStyle("Random");
            setMaxPlayers(16);
            setMinPlayers(4);
            setMinElo(1000);
            setMaxElo(3500);
            setRegistrationCutOff("");
        } catch (error) {
            console.error("Error creating tournament:", error);
            alert("Error creating tournament!");
        }
    }

    const handleDeleteTournament = async () => {

        setShowDeleteTournaments(true);
        // Basic Auth credentials
        // const username = 'Player1';
        // const password = 'Password1';
        // const encodedCredentials = btoa(`${username}:${password}`);  // Encode the credentials in Base64


        // try {
        //     const response = await axios.delete('http://localhost:8080/tournaments/11', {
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': `Basic ${encodedCredentials}`
        //         }
        //     });
        //     console.log(response.data);
        // } catch (error) {
        //     console.error("Error deleting tournament:", error);
        //     alert("Error deleting tournament!");
        // }
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

    const handleDeleteClose = () => {
        setShowDeleteTournaments(false);
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
                    <Button variant="success" onClick={() => setShowCreateModal(true)}>Create Tournament</Button>
                    <Button variant="danger" onClick={handleDeleteTournament}>Delete Tournament</Button>
                </div>

                {/* Modal will display our tournaments */}
                <Modal show={showTournaments} onHide={handleClose} className="basic-modal">
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
                <Modal show={showUserTournaments} onHide={handleUserClose} className="basic-modal">
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

                {/* Now for creating Tournaments */}
                <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)} className="create-tournament-modal">
                    <Modal.Header closeButton>
                        <Modal.Title>Create Tournament</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Status</Form.Label>
                                <Form.Control as="select" value={tournamentStatus} onChange={(e) => setTournamentStatus(e.target.value)}>
                                    <option>Registration</option>
                                    <option>Ongoing</option>
                                    <option>Completed</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Style</Form.Label>
                                <Form.Control as="select" value={tournamentStyle} onChange={(e) => setTournamentStyle(e.target.value)}>
                                    <option>Random</option>
                                    <option>Round Robin</option>
                                    <option>Single Elimination</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Min Players</Form.Label>
                                <Form.Control type="range" min="4" max="100" value={minPlayers} onChange={(e) => setMinPlayers(e.target.value)} />
                                <Form.Text>{minPlayers}</Form.Text>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Max Players</Form.Label>
                                <Form.Control type="range" min="4" max="100" value={maxPlayers} onChange={(e) => setMaxPlayers(e.target.value)} />
                                <Form.Text>{maxPlayers}</Form.Text>
                            </Form.Group>


                            <Form.Group>
                                <Form.Label>Min Elo</Form.Label>
                                <Form.Control type="range" min="500" max="4000" value={minElo} onChange={(e) => setMinElo(e.target.value)} />
                                <Form.Text>{minElo}</Form.Text>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Max Elo</Form.Label>
                                <Form.Control type="range" min="500" max="4000" value={maxElo} onChange={(e) => setMaxElo(e.target.value)} />
                                <Form.Text>{maxElo}</Form.Text>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Registration Cutoff</Form.Label>
                                <Form.Control type="date" value={registrationCutOff} onChange={(e) => setRegistrationCutOff(e.target.value)} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowCreateModal(false)}>Close</Button>
                        <Button variant="primary" onClick={handleCreateTournament}>Create Tournament</Button>
                    </Modal.Footer>
                </Modal>

                {/* Lastly, deleting tournaments*/}
                <Modal show={showDeleteTournaments} onHide={handleDeleteClose} className="basic-modal">
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
            </Container>
        </React.Fragment>
    );
}
