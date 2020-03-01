import React, {Component} from 'react';
import GenericButton from './components/generic_components/GenericButton';
import MainNavBar from './components/generic_components/MainNavBar';
import logo from './logo.svg';
import './App.css';

import {BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom";
import MainPage from './components/pages/mainPage';
import LoginPage from './components/pages/login';
class App extends Component {
  render(){

    return <Router>
      <Switch>
        <Route exact path="/" component={MainPage}/>
        <Route exact path="/login" component={LoginPage}/>
      </Switch>
    </Router>
  }
}

export default App;
