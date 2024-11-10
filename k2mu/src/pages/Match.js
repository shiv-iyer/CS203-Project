import React, { useState } from "react";
import { Container, Form, Button, Modal } from "react-bootstrap";
import axios from "axios";

// Import styles and images
import "../styles.css";
import pieces from "../resources/pieces-tour.jpg";

export default function Match() {
    const [tournamentId, setTournamentId] = useState("");
    const [matchId, setMatchId] = useState("");
    const [isDraw, setIsDraw] = useState(false);
    const [winnerId, setWinnerId] = useState("");
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [showProcessModal, setShowProcessModal] = useState(false);
    const [showRoundRobinModal, setShowRoundRobinModal] = useState(false);
    const [showRandomModal, setShowRandomModal] = useState(false);
    const [showOverviewInputModal, setShowOverviewInputModal] = useState(false);
    const [matchOverview, setMatchOverview] = useState([]);
    const [showOverviewDisplayModal, setShowOverviewDisplayModal] = useState(false);

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

    const processMatch = async () => {
        try {
            const response = await axios.put(
                `http://localhost:8080/tournament/${tournamentId}/matches/${matchId}/updateresults?isDraw=${isDraw}`,
                isDraw ? {} : { id: winnerId },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            alert("Match processed successfully!");
            console.log(response.data);
            setShowProcessModal(false);
        } catch (error) {
            console.error("Error processing match:", error);
        }
    };

    const createRoundRobinMatches = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/tournament/${tournamentId}/round-robin-matches`);
            alert("Round-robin matches created successfully!");
            console.log(response.data);
            setShowRoundRobinModal(false);
        } catch (error) {
            console.error("Error creating round-robin matches:", error);
        }
    };

    const createSingleEliminationMatches = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/tournament/${tournamentId}/single-elimination-matches`);
            alert("Single elimination matches created successfully!");
            console.log(response.data);
            setShowRandomModal(false);
        } catch (error) {
            console.error("Error creating single elimination matches:", error);
        }
    };

    const fetchMatchOverview = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/tournament/${tournamentId}/matches`);
            setMatchOverview(response.data);
            setShowOverviewInputModal(false); // Close the input modal
            setShowOverviewDisplayModal(true); // Open the display modal
        } catch (error) {
            console.error("Error fetching match overview:", error);
            alert("Failed to fetch match overview.");
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
                    Create Match
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
                <Button
                    onClick={() => setShowProcessModal(true)}
                    style={{
                        backgroundColor: '#e74c3c',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '4px',
                        fontWeight: '500'
                    }}
                >
                    Process Match
                </Button>
                <Button
                    onClick={() => setShowRoundRobinModal(true)}
                    style={{
                        backgroundColor: '#2ecc71',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '4px',
                        fontWeight: '500'
                    }}
                >
                    Round Robin
                </Button>
                <Button
                    onClick={() => setShowRandomModal(true)}
                    style={{
                        backgroundColor: '#f39c12',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '4px',
                        fontWeight: '500'
                    }}
                >
                    Random
                </Button>
                <Button
                    onClick={() => setShowOverviewInputModal(true)} // Open only the Overview input modal
                    style={{
                        backgroundColor: '#8e44ad',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '4px',
                        fontWeight: '500'
                    }}
                >
                    Overview
                </Button>
            </div>

            {/* Create Match Modal */}
            <Modal
                show={showCreateModal}
                onHide={() => setShowCreateModal(false)}
                centered
                contentClassName="bg-dark"
            >
                <Modal.Header closeButton className="border-0" style={{ backgroundColor: '#2c3e50', color: 'white' }}>
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

            {/* Assign Match Modal */}
            <Modal
                show={showAssignModal}
                onHide={() => setShowAssignModal(false)}
                centered
                contentClassName="bg-dark"
            >
                <Modal.Header closeButton className="border-0" style={{ backgroundColor: '#2c3e50', color: 'white' }}>
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

            {/* Process Match Modal */}
            <Modal
                show={showProcessModal}
                onHide={() => setShowProcessModal(false)}
                centered
                contentClassName="bg-dark"
            >
                <Modal.Header closeButton className="border-0" style={{ backgroundColor: '#2c3e50', color: 'white' }}>
                    <Modal.Title>Process Match</Modal.Title>
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
                    <Form.Group className="mb-3 d-flex align-items-center">
                        <Form.Check 
                            type="checkbox" 
                            label="Is Draw?" 
                            checked={isDraw} 
                            onChange={(e) => setIsDraw(e.target.checked)} 
                            style={{ marginRight: '10px' }}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Winner ID (if not a draw):</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Winner ID"
                            value={winnerId}
                            onChange={(e) => setWinnerId(e.target.value)}
                            className="bg-dark text-white border-secondary"
                            disabled={isDraw}
                        />
                    </Form.Group>
                    <div className="text-end">
                        <Button
                            onClick={processMatch}
                            style={{
                                backgroundColor: '#e74c3c',
                                border: 'none',
                                padding: '0.75rem 1.5rem',
                                borderRadius: '4px',
                                fontWeight: '500'
                            }}
                        >
                            Process Match
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>

            {/* Round Robin Modal */}
            <Modal
                show={showRoundRobinModal}
                onHide={() => setShowRoundRobinModal(false)}
                centered
                contentClassName="bg-dark"
            >
                <Modal.Header closeButton className="border-0" style={{ backgroundColor: '#2c3e50', color: 'white' }}>
                    <Modal.Title>Create Round Robin Matches</Modal.Title>
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
                    <div className="text-end">
                        <Button
                            onClick={createRoundRobinMatches}
                            style={{
                                backgroundColor: '#2ecc71',
                                border: 'none',
                                padding: '0.5rem 1rem'
                            }}
                        >
                            Create Round Robin Matches
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>

            {/* Random Modal */}
            <Modal
                show={showRandomModal}
                onHide={() => setShowRandomModal(false)}
                centered
                contentClassName="bg-dark"
            >
                <Modal.Header closeButton className="border-0" style={{ backgroundColor: '#2c3e50', color: 'white' }}>
                    <Modal.Title>Create Random Single Elimination Matches</Modal.Title>
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
                    <div className="text-end">
                        <Button
                            onClick={createSingleEliminationMatches}
                            style={{
                                backgroundColor: '#f39c12',
                                border: 'none',
                                padding: '0.5rem 1rem'
                            }}
                        >
                            Create Random Matches
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>

            {/* Overview Modal */}
            <Modal
                show={showOverviewInputModal} // Use the new state for the Overview input modal
                onHide={() => setShowOverviewInputModal(false)}
                centered
                contentClassName="bg-dark"
            >
                <Modal.Header closeButton className="border-0" style={{ backgroundColor: '#2c3e50', color: 'white' }}>
                    <Modal.Title>Enter Tournament ID for Overview</Modal.Title>
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
                    <div className="text-end">
                        <Button
                            onClick={() => {
                                fetchMatchOverview(); // Call fetchMatchOverview when button is clicked
                                setShowOverviewInputModal(false); // Close the modal after submission
                            }}
                            style={{
                                backgroundColor: '#8e44ad',
                                border: 'none',
                                padding: '0.5rem 1rem'
                            }}
                        >
                            Get Overview
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal
                show={showOverviewDisplayModal} // Use the new state to show the modal
                onHide={() => setShowOverviewDisplayModal(false)}
                centered
                contentClassName="bg-dark"
            >
                <Modal.Header closeButton className="border-0" style={{ backgroundColor: '#2c3e50', color: 'white' }}>
                    <Modal.Title>Match Overview</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#2c3e50', color: 'white' }}>
                    {matchOverview.length > 0 ? (
                        <ul>
                            {matchOverview.map((match, index) => (
                                <li key={index} style={{ marginBottom: '10px' }}>
                                    <strong>Match ID:</strong> {match.id} <br />
                                    <strong>Player 1 ID:</strong> {match.player1Id ? match.player1Id : 'N/A'} <br />
                                    <strong>Player 2 ID:</strong> {match.player2Id ? match.player2Id : 'N/A'} <br />
                                    <strong>Status:</strong> {match.matchStatus} <br />
                                    <strong>Draw:</strong> {match.draw ? 'Yes' : 'No'} <br />
                                    <strong>Winner ID:</strong> {match.winnerId ? match.winnerId : 'N/A'}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No matches found for this tournament.</p>
                    )}
                </Modal.Body>
            </Modal>
        </Container>
    );
}
