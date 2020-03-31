import React from 'react';

import GenericButton from '../generic_components/GenericButton';
import FloatingButton from '../generic_components/FloatingButton'
import BurgerMenu from 'components/generic_components/BurgerMenu';
import 'assets/css/GenericButton.css';
import 'assets/css/mainPage.css';
import MapContainer from 'components/map_components/MapContainer.js';
import {HashRouter as Router,Link} from 'react-router-dom';
import DropzonePage from './DropzonePage';
import * as cache from 'caches/routeCache/RouteCache';

class MainPage extends React.Component{
  state = {showZone: false}
  

  getZone = () =>{
     
      return(<DropzonePage showUpload={() => this.showZone()}/>);
  }
  showZone = () =>{
    if(cache.default.getSelected() != "") 
      this.setState({showZone: !this.state.showZone});
    else
      alert("No route selected")
  }
  render(){
  return (
    <div className="App" id="outer-container">
      <BurgerMenu 
        pageWrapId="page-wrap"
        container="outer-container"
      />
      <main className="main" id="page-wrap">
      <FloatingButton showUpload={() => this.showZone()}/>
      <div ref={node=> this.node = node}>
      {this.state.showZone ? this.getZone() : null}
      </div>
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
