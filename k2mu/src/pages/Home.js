import React from "react";

import {Container} from "react-bootstrap";

import logo from "../logo.png";
import "../styles.css";

export default function Home() {
    return (
        <React.Fragment>
            <Container>
                <div>
                    <h1 className="main-header">Welcome to Knight 2 Meet You!</h1>
                    {<div className="App">
                        <header className="App-header">
                            <img src={logo} className="App-logo" alt="logo" />
                            <p>Knight 2 Meet U</p>
                            <p>Your greatest tool for...</p>
                        </header>
                    </div>}
                </div>
            </Container>
        </React.Fragment>
    );
}