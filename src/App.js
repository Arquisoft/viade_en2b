import React, { Component, Fragment } from "react";

import { HashRouter as Router, Route, Switch,useHistory } from "react-router-dom";
import MainPage from "./components/pages/MainPage";
import LoginPage from "./components/pages/LoginPage";
import FriendsPage from "./components/pages/FriendList";
import DropzonePage from "./components/pages/DropzonePage";
import RoutesPage from "./components/pages/RoutesPage";
import AboutPage from "./components/pages/AboutPage";
import NotificationsPage from "./components/pages/NotificationsPage";
import SaveRoutePage from "./components/pages/SaveRoutePage";
import ImportGpxPage from "./components/pages/ImportGpxPage";


import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import axios from "axios";
import * as cache from "caches/routeCache/RouteCache";


import "./App.css";

var lastRouteReceived = [];
  function notificationsRecieved() {
    if (cache.default.getSelected() != lastRouteReceived) {
      lastRouteReceived = cache.default.getSelected();
      toast.info("Route Selected", {
        draggable: true,
        position: toast.POSITION.TOP_CENTER
      });
    }
  }

class App extends Component {
  state = {
    render: 0
  }
  
  render() {
    setInterval(() => {
        notificationsRecieved()
      }, 2000)
    setTimeout(() => {
      if(this.state.render === 0)
        this.setState({
          render: 1
        })
    }, 5000);
    if(this.state.render > 0)
      return (
        <Fragment>
          <ToastContainer closeOnClick draggable={true} transition={Bounce} autoClose={2000} />
          <Router>
            <Fragment>
              <Switch>
                <Route exact path="/" component={MainPage} />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/routes" component={RoutesPage} />
                <Route exact path="/friends-list" component={FriendsPage} />
                <Route exact path="/upload" component={DropzonePage} />
                <Route exact path="/about" component={AboutPage} />
                <Route exact path="/notifications" component={NotificationsPage} />
                <Route exact path="/saveroute" component={SaveRoutePage}/>
                <Route exact path="/gpx" component={ImportGpxPage}/>
              </Switch>
            </Fragment>
          </Router>
        </Fragment>
      );
    else {
      return(
        <Fragment>
          <video id="viadegif" height="800" autoPlay muted>
            <source src="videos/ViaDe.mp4" type="video/mp4"/>
          </video>
        </Fragment>
      );
    }
  }
}

export default App;
