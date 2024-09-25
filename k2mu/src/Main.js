// imports
import React from "react";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// styles
import "./styles.css";

// import React-Bootstrap components
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
import {Container, Row, Col} from 'react-bootstrap';

export default class Main extends React.Component {
    // state
    state = {
        currentPage: "home"
    };

    render() {
        return (
            <React.Fragment>
                <Container>
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
}