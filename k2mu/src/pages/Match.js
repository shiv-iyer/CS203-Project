import React, { useState } from "react";
import { Container, Form, Button, Modal } from "react-bootstrap";
import axios from "axios";

// Import styles and images
import "../styles.css";
import pieces from "../resources/pieces-tour.jpg";

export default function Match() {
    const [tournamentId, setTournamentId] = useState("");
    const [matchId, setMatchId] = useState("");
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showAssignModal, setShowAssignModal] = useState(false);

    const createMatch = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/tournament/${tournamentId}/matches`);
            alert("Match created successfully!");
            console.log(response.data);
            setShowCreateModal(false);
        } catch (error) {
            console.error("Error creating match:", error);
        }
    };

    const assignRandomPlayers = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/tournament/${tournamentId}/matches/${matchId}/random-players`);
            alert("Players assigned successfully!");
            console.log(response.data);
            setShowAssignModal(false);
        } catch (error) {
            console.error("Error assigning players:", error);
        }
    };

    return (
        <Container className="page-primary text-center">
            <h1 className="main-header mb-4">Match</h1>
            
            <div className="match-image-container" style={{
                maxWidth: '400px',
                margin: '0 auto 2rem',
                padding: '1.5rem',
                backgroundColor: '#e8e1d9',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
                <img 
                    src={pieces} 
                    alt="Chess Pieces" 
                    style={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: '4px'
                    }}
                />
            </div>

            <div className="d-flex justify-content-center gap-3 mb-4">
                <Button
                    onClick={() => setShowCreateModal(true)}
                    style={{
                        backgroundColor: '#3498db',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '4px',
                        fontWeight: '500'
                    }}
                >
                    Create match
                </Button>
                <Button
                    onClick={() => setShowAssignModal(true)}
                    style={{
                        backgroundColor: '#9b59b6',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '4px',
                        fontWeight: '500'
                    }}
                >
                    Assign Match
                </Button>
            </div>

            <Modal
                show={showCreateModal}
                onHide={() => setShowCreateModal(false)}
                centered
                contentClassName="bg-dark"
            >
                <Modal.Header 
                    closeButton 
                    className="border-0"
                    style={{ backgroundColor: '#2c3e50', color: 'white' }}
                >
                    <Modal.Title>Create Match</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#2c3e50', color: 'white' }}>
                    <Form.Group className="mb-3">
                        <Form.Label>Enter the tournament ID to create the match:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Tournament ID"
                            value={tournamentId}
                            onChange={(e) => setTournamentId(e.target.value)}
                            className="bg-dark text-white border-secondary"
                        />
                    </Form.Group>
                    <div className="text-end">
                        <Button
                            onClick={createMatch}
                            style={{
                                backgroundColor: '#3498db',
                                border: 'none',
                                padding: '0.5rem 1rem'
                            }}
                        >
                            Create Match
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal
                show={showAssignModal}
                onHide={() => setShowAssignModal(false)}
                centered
                contentClassName="bg-dark"
            >
                <Modal.Header 
                    closeButton 
                    className="border-0"
                    style={{ backgroundColor: '#2c3e50', color: 'white' }}
                >
                    <Modal.Title>Assign players to match randomly</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#2c3e50', color: 'white' }}>
                    <Form.Group className="mb-3">
                        <Form.Label>Enter the tournament ID:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Tournament ID"
                            value={tournamentId}
                            onChange={(e) => setTournamentId(e.target.value)}
                            className="bg-dark text-white border-secondary"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Enter the match ID:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Match ID"
                            value={matchId}
                            onChange={(e) => setMatchId(e.target.value)}
                            className="bg-dark text-white border-secondary"
                        />
                    </Form.Group>
                    <div className="text-end">
                        <Button
                            onClick={assignRandomPlayers}
                            style={{
                                backgroundColor: '#9b59b6',
                                border: 'none',
                                padding: '0.5rem 1rem'
                            }}
                        >
                            Assign Players
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </Container>
    );
}
