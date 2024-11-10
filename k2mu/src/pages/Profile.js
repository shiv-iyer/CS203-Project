import React from "react";

// styles
import "../styles.css";

// import React-Bootstrap components
import {Container, Row, Col} from 'react-bootstrap';

export default function Profile() {
    return (
        <React.Fragment>
            <Container className="page-primary main-text">
                <h1 className="main-header">Profile Page</h1>
            </Container>
        </React.Fragment>
    )
}