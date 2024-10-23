import React, {useState} from "react";

import {Container, Form, Button} from "react-bootstrap";

// import styles
import "../styles.css";

export default function User () {

    // we will use the state to represent something with users later?
    const [showTournaments, setShowTournaments] = useState(false);
    

    return (
        <React.Fragment>
            <Container className="page-primary">
                <h1 className="main-header">User Page</h1>

                <div className="login-form">
                    <Form>
                        <Form.Group className="mb-3" controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control placeholder="Enter Username"></Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter Password"></Form.Control>
                            <Form.Text className="text-muted">
                                We will never share your information with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Button variant="primary">Login</Button>
                    </Form>
                </div>

            </Container>
        </React.Fragment>
    );
}