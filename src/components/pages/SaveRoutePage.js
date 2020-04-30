import React, { Component } from "react";
import SaveRoute from "../spec_components/SaveRoute";
import BurgerMenu from "../generic_components/BurgerMenu";
import * as cache from "caches/routeCache/RouteCache";
import { useHistory } from "react-router-dom";
import MapContainer from "components/map_components/MapContainer.js";
import "../../assets/css/SaveRoutePage.css";
import "assets/css/SaveRoutePage.css";
const SaveRoutePage = () => {
  //  this.props.showUpload();

  let history = useHistory();
  function toDo(params) {
    //EJEMPLO DE FUNCIÓN PARA PASARLE AL onUpload
    history.push("/routes");
    console.log(params);
    cache.default.setReload(true);
  }
  function emptyTrigger() {
    //Function To Trigger
  }
  return (
    <React.Fragment>
      <BurgerMenu pageWrapId="page-wrap" container="outer-container" />

      <div className="savePage" id="page-wrap">
        <div className="cardsave">
          <SaveRoute onFinish={toDo} />
          <div
            className="mapContainer"
            style={{ position: "relative", width: "40vw", height: "40vh" }}
          >
            <MapContainer />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SaveRoutePage;
