import React, {Component} from 'react';

import './App.css';
import {HashRouter as Router, Route} from "react-router-dom";
import MainPage from './components/pages/mainPage';
import LoginPage from './components/pages/login';

import RoutesPage from './components/pages/routes';
class App extends Component {
  render(){
    // document.documentElement.setAttribute('data-theme', 'dark');
    
    return <Router>
        <Route path="/" component={MainPage}/>
        {/* <Route exact path="/login" component={Login}/> */}
        <Route path="/viade_en2b/login" component={LoginPage}/>
        <Route path="/viade_en2b/routes" component={RoutesPage}/>
    </Router>

  }
}




export default App;


