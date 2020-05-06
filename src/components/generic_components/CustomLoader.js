import React from "react";
import ReactLoading from "react-loading";
import "assets/css/CustomLoader.css";
export default class CustomLoader extends React.Component {
  render() {
    return (
      <div className="containerLoader">
        <ReactLoading type="spin" color="#509A50" className="loader" />
      </div>
    );
  }
}
