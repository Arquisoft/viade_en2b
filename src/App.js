import React, {Component, Fragment} from 'react';

import {HashRouter as Router, Route,Switch} from "react-router-dom";
import MainPage from './components/pages/MainPage';
import LoginPage from './components/pages/LoginPage';
import FriendsPage from './components/pages/FriendList';
import DropzonePage from './components/pages/DropzonePage';
import RoutesPage from './components/pages/RoutesPage';
import AboutPage from './components/pages/AboutPage';
import NotificationsPage from './components/pages/NotificationsPage';
import './App.css';

class App extends Component {
  render(){
    // document.documentElement.setAttribute('data-theme', 'dark');
    
    return <Router>
    <Fragment>
      <Switch>
        <Route exact path="/" component={MainPage}/>
        {/* <Route exact path="/login" component={Login}/> */}
        <Route exact path="/login" component={LoginPage}/>
        <Route exact path="/routes" component={RoutesPage}/>
        <Route exact path="/friends-list" component={FriendsPage}/>
        <Route exact path="/upload" component={DropzonePage}/>
        <Route exact path="/about" component={AboutPage}/>
        <Route exact path="/notifications" component={NotificationsPage}/>
      </Switch>
    </Fragment>
    </Router>

  }
}




export default App;
