import React from 'react';
import GenericButton from './components/generic_components/GenericButton';
import MainNavBar from './components/generic_components/MainNavBar';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <MainNavBar companyName="VIADE"/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <GenericButton 
          className="buttonGenBlue"
          name="buttomNavHome"
          message="Home"
        />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React. Developed using Docker.
        </a>
      </header>
    </div>
  );
}

export default App;
