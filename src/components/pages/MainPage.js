import React from 'react';

import GenericButton from '../generic_components/GenericButton';
import FloatingButton from '../generic_components/FloatingButton'
import BurgerMenu from 'components/generic_components/BurgerMenu';
import 'assets/css/GenericButton.css';
import 'assets/css/MainPage.css';
import MapContainer from 'components/map_components/MapContainer.js';
import {HashRouter as Router,Link} from 'react-router-dom';


class MainPage extends React.Component{
  render(){
  return (
    <div className="App" id="outer-container">
      <BurgerMenu 
        pageWrapId="page-wrap"
        container="outer-container"
      />
      <main className="main" id="page-wrap">
      <FloatingButton/>
      <Router>
        <Link to="/login">
          <GenericButton
            className="buttonGeneric loginButton"
            message="LOG IN"
          />
        </Link>
      </Router>
        <MapContainer/>  
      </main>
    </div>
  );
}
}

export default MainPage;
