import React from 'react';

import MainNavBar from '../generic_components/MainNavBar';
import logo from '../../logo.svg';
import BurgerMenu from '../generic_components/BurgerMenu';


const MainPage = () => {
  return (
    <div className="App" id="outer-container">
      <MainNavBar companyName="VIADE"/>

      <BurgerMenu 
        pageWrapId="page-wrap"
        container="outer-container"
      />
      <main className="" id="page-wrap">
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