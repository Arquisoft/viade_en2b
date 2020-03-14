import React, {Component} from 'react';

// import auth from 'solid-auth-client';

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import MainPage from './components/pages/mainPage';
import LoginPage from './components/pages/login';

import RoutesPage from './components/pages/routes';
class App extends Component {
  render(){
    // document.documentElement.setAttribute('data-theme', 'dark');
    
    return <Router>
      <Switch>
        <Route exact path="/" component={MainPage}/>
        {/* <Route exact path="/login" component={Login}/> */}
        <Route exact path="/login" component={LoginPage}/>
        <Route exact path="/routes" component={RoutesPage}/>
      </Switch>
    </Router>

  }
}



export default App;




// async function getWebId(user) {
//   console.log("Entra");
//   /* 1. Check if we've already got the user's WebID and access to their Pod: */
//   let session = await auth.currentSession();
//   if (session) {
//     return session.webId;
//   }
// 
//   /* 2. User has not logged in; ask for their Identity Provider: */
//   // Implement `getIdentityProvider` to get a string with the user's Identity Provider (e.g.
//   // `https://inrupt.net` or `https://solid.community`) using a method of your choice.
//   const identityProvider = user;
// 
//   /* 3. Initiate the login process - this will redirect the user to their Identity Provider: */
//   auth.login(identityProvider);
//   console.log("DONE locoooooo");
// }
