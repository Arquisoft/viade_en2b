import React, {useState} from "react";


import GenericButton from "../generic_components/GenericButton";
import FloatingButton from "../generic_components/FloatingButton";
import BurgerMenu from "components/generic_components/BurgerMenu";
import "assets/css/GenericButton.css";
import "assets/css/MainPage.css";
import MapContainer from "components/map_components/MapContainer.js";
import { HashRouter as Router, Link } from "react-router-dom";
import DropzonePage from './DropzonePage';


import * as routecache from "caches/routeCache/RouteCache";
import * as cache from "caches/friendCache/FriendCache";

const MainPage = () => {
  cache.default.loadFriends();

  const [showDropzone, setShowDropzone] = useState(false);

  const getZone = () => {
    return <DropzonePage showUpload={() => showZone()} />;
  };

  const showZone = () => {
    if (routecache.default.getSelected() !== "") 
      setShowDropzone(!showDropzone);
    //this.setState({showZone: !this.state.showZone});
    else alert("No route selected");
  };

  return (
    <div className="App" id="outer-container">
      <BurgerMenu pageWrapId="page-wrap" container="outer-container" />
      <main className="main" id="page-wrap">
        <FloatingButton showUpload={() => showZone()} />
        <div >
          { showDropzone ? getZone() : null}
        </div>
        <Router>
          <Link to="/login">
            <GenericButton
              className="buttonGeneric loginButton"
              message="LOG IN"
            />
          </Link>
        </Router>
        <MapContainer />
      </main>
    </div>
  );
};

export default MainPage;
