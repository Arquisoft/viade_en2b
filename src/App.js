import React, {Component, Fragment} from 'react';

import {HashRouter as Router, Route,Switch} from "react-router-dom";
import MainPage from './components/pages/MainPage';
import LoginPage from './components/pages/LoginPage';
import FriendsPage from './components/pages/FriendList';

import RoutesPage from './components/pages/RoutesPage';
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
      </Switch>
    </Fragment>
    </Router>

  }
}




export default App;
