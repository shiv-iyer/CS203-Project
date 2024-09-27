import React from "react";

import {Container, Button} from "react-bootstrap";

export default function Tournaments () {
    
    const buttonClicked = () => {
        alert("Button was clicked.");
    }

    return (
        <React.Fragment>
            <Container>
                <h1>Tournaments</h1>
                <Button onClick={buttonClicked}>View Available Tournaments</Button>
                <Button variant="info">My Current Tournaments</Button>
            </Container>
        </React.Fragment>
    );
}