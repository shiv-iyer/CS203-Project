import React from "react";

// styles
import "../styles.css";

// import React-Bootstrap components
import {Container, Row, Col} from 'react-bootstrap';

export default function Testing() {
    return (
        <React.Fragment>
            <Container className="main-cont">
                <Row>
                    <Col>
                        <h1 className="title">hi.</h1>
                    </Col>
                    <Col>
                        <h2 className="title2">bye!</h2>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}