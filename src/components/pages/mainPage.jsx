import React from 'react';

import MainNavBar from '../generic_components/MainNavBar';
import logo from '../../logo.svg';


const MainPage = () => {
  return (
    <div className="App">
      <MainNavBar companyName="VIADE"/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
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
};

export default MainPage;