import React, {Component} from 'react';

import './App.css';

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import MainPage from './components/pages/mainPage';
import LoginPage from './components/pages/login';
import Login from './components/login/Login';

import RoutesPage from './components/pages/routes';
class App extends Component {
  render(){

    return <Router>
      <Switch>
        <Route exact path="/" component={MainPage}/>
        <Route exact path="/login" component={Login}/>
        {/* <Route exact path="/login" component={LoginPage}/> */}
        <Route exact path="/routes" component={RoutesPage}/>
      </Switch>
    </Router>
  }
}

export default App;
