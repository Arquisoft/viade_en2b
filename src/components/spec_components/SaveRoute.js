import React, { Component } from "react";

import MultimediaViewer from "./MultimediaViewer";

import cache from "caches/fileCache/FileCache";
import GenericButton from "../generic_components/GenericButton";
import * as RealTimeRoute from "../../RouteManager/CreateRouteRealTime";
import "../../assets/css/SaveRoute.css";
class SaveRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameRoute: "",
      description: "",
      files: [],
    };
    //this.fileInputRef = React.createRef();
  }
  descriptionToRoute(description) {
    this.setState({ description: description.target.value });
  }
  nameToRute(name) {
    this.setState({ nameRoute: name.target.value });
    console.log(this.state.nameRoute);
  }
  saveRouteToPod() {
    if (this.state.nameRoute !== "" && RealTimeRoute.default.getRouteIsOver()) {
      //RealTimeRoute.default.setNameAndUpload(this.state.nameRoute);
      //Change setNameAndUpload
      RealTimeRoute.default.setNameAndUpload(this.state.nameRoute, this.state.description);

      this.props.onFinish();
    }
  }
  render() {
    return (
      <React.Fragment>
        <label for="textInput">Route Name</label>
        <input
          ref={this.fileInputRef}
          className="textInput"
          type="text"
          onChange={this.nameToRute.bind(this)}
        />
        <div className="textareaDiv">
          <label for="textareaInput">Route description</label>
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
