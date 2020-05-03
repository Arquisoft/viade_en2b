  import React, { Component } from "react";

import MultimediaViewer from "./MultimediaViewer";

import cache from "caches/fileCache/FileCache";
import GenericButton from "../generic_components/GenericButton";
import * as RealTimeRoute from "../../RouteManager/CreateRouteRealTime";


 class SaveRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameRoute: "",
      files: []
    };
    //this.fileInputRef = React.createRef();
  }

  nameToRute(name){
    this.setState({nameRoute: name.target.value});
    console.log(this.state.nameRoute)
  }
  saveRouteToPod(){
    if(this.state.nameRoute !== "" && RealTimeRoute.default.getRouteIsOver()){
      RealTimeRoute.default.setNameAndUpload(this.state.nameRoute);
      this.props.onFinish();
    }
  }
  render() {
    return (
      <React.Fragment>
        <label htmlFor="textInput">Route Name</label>
        <input
          ref={this.fileInputRef}
          className="textInput"
          type="text"
          onChange={this.nameToRute.bind(this)}
        />
        <div className="textareaDiv">
          <label htmlFor="textareaInput" id="routeDescriptionInput">Route description</label>
          <textarea
            rows="2"
            cols="25"
            className="textareaInput"
            onChange={this.descriptionToRoute.bind(this)}
          ></textarea>
        </div>
        <form>
          <GenericButton
            className="submitRoute"
            onClick={this.saveRouteToPod.bind(this)}
            message="Save Route"
          />
        </form>
      </React.Fragment>
    );
  }
}
export default SaveRoute;