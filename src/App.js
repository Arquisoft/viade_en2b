import React, {Component} from 'react';
import GenericButton from './components/generic_components/GenericButton';
import MainNavBar from './components/generic_components/MainNavBar';
import logo from './logo.svg';
import './App.css';
import auth from 'solid-auth-client';

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




async function getWebId(user) {
  console.log("Entra");
  /* 1. Check if we've already got the user's WebID and access to their Pod: */
  let session = await auth.currentSession();
  if (session) {
    return session.webId;
  }

  /* 2. User has not logged in; ask for their Identity Provider: */
  // Implement `getIdentityProvider` to get a string with the user's Identity Provider (e.g.
  // `https://inrupt.net` or `https://solid.community`) using a method of your choice.
  const identityProvider = user;

  /* 3. Initiate the login process - this will redirect the user to their Identity Provider: */
  auth.login(identityProvider);
  console.log("DONE locoooooo");
}