import React from "react";
import logo from "./logo.png";
import "./App.css";
import Chatbot from "./components/Chatbot";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// react-bootstrap components
import {Navbar, Nav, Container} from "react-bootstrap";

// react-router-dom for routing pages; we import BrowserRouter but we name it 'Router'
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from "react-router-dom";

// import Main
import Main from "./Main";

// my own pages and components
import Home from "./pages/Home";
import Testing from "./pages/Testing";
import Tournaments from "./pages/Tournaments";
import User from "./pages/User";

// stylesheet
import "./styles.css";

function App() {
  return (
    // enclose everything within one React.Fragment
    <React.Fragment>
      <Router>
        <Container>
          <Navbar expand="md">
            {/* Navbar.Brand is the main and home element in our navbar */}
            <Navbar.Brand href="#">
              <img
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top">
              </img>
              K2MU
            </Navbar.Brand>
            {/* Navbar.Toggle creates our 'hamburger menu', controls the collapsible Navbar */}
            <Navbar.Toggle aria-controls="home-navbar" />
            <Navbar.Collapse id="home-navbar">
              <Nav>
                <NavLink className="nav-link" activeClassName="active" to="/">Home</NavLink>
                <NavLink className="nav-link" activeClassName="active" to="/tournaments">Tournaments</NavLink>
                <NavLink className="nav-link" activeClassName="active" to="/user">User</NavLink>
                <NavLink className="nav-link" activeClassName="active" to="/test">Testing</NavLink>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Main/>
        </Container>
        {/* The routes are the areas in which all our pages will be displayed. They match URLs to React components. */}
        <Routes>
          {/* Home / landing page route */}
          <Route path="/" element={<Home/>}></Route>
          {/* Tournaments page */}
          <Route path="/tournaments" element={<Tournaments/>}></Route>
          {/* Users page */}
          <Route path="/user" element={<User/>}></Route>
          {/* For my testing purposes */}
          <Route path="/test" element={<Testing/>}></Route>
        </Routes>
      </Router>
      <Chatbot />
    </React.Fragment>
  );
}

export default App;