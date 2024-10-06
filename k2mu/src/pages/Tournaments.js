import React, {useState} from "react";

import {Container, Button, ListGroup, Modal} from "react-bootstrap";

// import styles
import "../styles.css";

// tournaments header image
import pieces from "../resources/pieces-tour.jpg";

export default function Tournaments () {

    // we will use the state to represent tournaments
    const [showTournaments, setShowTournaments] = useState(false);
    const [showUserTournaments, setShowUserTournaments] = useState(false);
    
    const buttonClicked = () => {
        alert("Button was clicked.");
    }

    // for now, dummy tournament values in a String array
    const tournaments = [
        "Tournament 1",
        "Tournament 2",
        "Tournament 3",
        "Tournament 4",
        "Tournament 5",
        "Tournament 6",
        "Tournament 7",
        "Tournament 8",
        "Tournament 9",
        "Tournament 10"
    ]

    const userTournaments = [
        "Tournament 1",
        "Tournament 7"
    ]

    const handleShowTournaments = () => {
        setShowTournaments(true);
    }

    const handleClose = () => {
        setShowTournaments(false);
    }

    const handleShowUserTournaments = () => {
        setShowUserTournaments(true);
    }

    const handleUserClose = () => {
        setShowUserTournaments(false);
    }

    return (
        <React.Fragment>
            <Container className="page-primary">
                <h1 className="main-header">Tournaments</h1>

                {/* hero image to look cool */}
                <img src={pieces} className="hero-img"></img>

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
                        {/* Map everything from tournaments into a ListGroup for display */}
                        <ListGroup>
                            {tournaments.map((tournament, index) => (
                                <ListGroup.Item key={index}>{tournament}</ListGroup.Item>
                            ))}
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
                        {/* Map everything from tournaments into a ListGroup for display */}
                        <ListGroup>
                            {userTournaments.map((tournament, index) => (
                                <ListGroup.Item key={index}>{tournament}</ListGroup.Item>
                            ))}
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