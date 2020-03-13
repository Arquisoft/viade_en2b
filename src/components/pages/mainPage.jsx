import React from 'react';

import GenericButton from '../generic_components/GenericButton';

import BurgerMenu from 'components/generic_components/BurgerMenu';
import 'assets/css/GenericButton.css';
import 'assets/css/mainPage.css';
import MapContainer from 'components/map_components/MapContainer.js';
import {Link} from 'react-router-dom';

const MainPage = () => {
  return (
    <div className="App" id="outer-container">
      <BurgerMenu 
        pageWrapId="page-wrap"
        container="outer-container"
      />
      <main className="main" id="page-wrap">
        <GenericButton
          className="buttonGenBlue loginButton"
          message=<Link to="/login">LOGIN</Link>
        />
        <MapContainer/>  
      </main>
    </div>
  );
};

export default MainPage;
