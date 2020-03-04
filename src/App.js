import React, {Component} from 'react';

import './App.css';

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
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
