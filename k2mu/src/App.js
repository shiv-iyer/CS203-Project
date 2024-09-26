import React from "react";
//import logo from './logo.svg';
import logo from "./logo.png";
import "./App.css";

// react-bootstrap components
import {Navbar, Nav, Container} from "react-bootstrap";

// react-router-dom for routing pages; we import BrowserRouter but we name it 'Router'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// import Main
import Main from "./Main";

function App() {
  return (
    // enclose everything within one React.Fragment
    <React.Fragment>
      <Router>
        <Container>
          <Navbar>
            {/* Navbar.Brand is the main and home element in our navbar */}
            <Navbar.Brand href="#">
              K2MU
            </Navbar.Brand>
            {/* Navbar.Toggle creates our 'hamburger menu', controls the collapsible Navbar */}
            <Navbar.Toggle aria-controls="home-navbar" />
            <Navbar.Collapse id="home-navbar">
              <Nav>
                Testing
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Main/>
          {/* <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Knight 2 Meet U
              </p>
            </header>
          </div> */}
        </Container>
        {/* The routes are the areas in which all our pages will be displayed. They match URLs to React components. */}
        <Routes>
            <Route></Route>
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;