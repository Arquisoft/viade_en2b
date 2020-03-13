import React from 'react';

import GenericButton from '../generic_components/GenericButton';

import logo from '../../logo.svg';
import BurgerMenu from '../generic_components/BurgerMenu';
import FloatingButton from "../generic_components/FloatingButton"
import '../../assets/css/GenericButton.css';
import '../../assets/css/mainPage.css';
import {Link} from "react-router-dom";

const MainPage = () => {
  return (
    <div className="App" id="outer-container">
      <BurgerMenu 
        pageWrapId="page-wrap"
        container="outer-container"
      />
      <main className="main" id="page-wrap">
      <FloatingButton/>
        <GenericButton
          className="buttonGenBlue loginButton"
          message=<Link to="/login">LOGIN</Link>
        />
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
      </main>
    </div>
  );
};

export default MainPage;