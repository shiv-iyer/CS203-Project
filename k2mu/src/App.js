import React from "react";
//import logo from './logo.svg';
import logo from "./logo.png";
import "./App.css";

// import Main
import Main from "./Main";

function App() {
  return (
    // enclose everything within one React.Fragment
    <React.Fragment>
      <Main/>
      {/* <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Knight 2 Meet U
          </p>
        </header>
      </div> */}
    </React.Fragment>
  );
}

export default App;
