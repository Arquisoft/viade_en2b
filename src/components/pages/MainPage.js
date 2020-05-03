import React, { useState, useReducer } from "react";

import GenericButton from "../generic_components/GenericButton";
import FloatingButton from "../generic_components/FloatingButton";
import BurgerMenu from "components/generic_components/BurgerMenu";
import "assets/css/GenericButton.css";
import "assets/css/MainPage.css";
import MapContainer from "components/map_components/MapContainer.js";
import { HashRouter as Router, Link } from "react-router-dom";
import DropzonePage from "./DropzonePage";
import SaveRoutePage from "./SaveRoutePage";

import * as routecache from "caches/routeCache/RouteCache";
import * as cache from "caches/friendCache/FriendCache";

import { ToastContainer, toast, Zoom, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import UserDropdown from "../spec_components/UserDropdown";

const MainPage = () => {
  cache.default.loadFriends();

  const [showDropzone, setShowDropzone] = useState(false);

  const getZone = () => {
    return <DropzonePage showUpload={() => showZone()} />;
  };

  const showZone = () => {
    if (routecache.default.getSelected() !== "") {
      setShowDropzone(!showDropzone);
    } else
      toast.error("No Route Selected", {
        draggable: true,
        position: toast.POSITION.TOP_CENTER,
      });
  };

  return (
    <div className="App" id="outer-container">
      <BurgerMenu pageWrapId="page-wrap" container="outer-container" />
      <main className="main" id="page-wrap">
        <FloatingButton showUpload={() => showZone()} />
        <div>{showDropzone ? getZone() : null}</div>

        <MapContainer />
      </main>
      <UserDropdown />
    </div>
  );
};

export default MainPage;
