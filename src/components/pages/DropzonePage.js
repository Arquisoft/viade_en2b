import React, { Component } from "react";
import Dropzone from "../spec_components/Dropzone";
import "../../assets/css/DropzonePage.css";
import cache from "caches/fileCache/FileCache";
import routeCache from "caches/routeCache/RouteCache";
import { ToastContainer, toast, Bounce } from "react-toastify";

class DropzonePage extends Component {
  componentWillMount() {
    document.addEventListener("mousedown", this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick, false);
  }
  handleClick = (e) => {
    if (this.node.contains(e.target)) {
      return;
    }
    this.props.showUpload();
  };
  render() {
    function toDo(params) {
      //EJEMPLO DE FUNCIÓN PARA PASARLE AL onUpload
      cache.uploadFiles([...params]);
      
      routeCache.setReload(true);
    }
    function emptyTrigger() {
      //Function To Trigger
    }
    return (
      <div ref={(node) => (this.node = node)} className="dropzonePage">
        <header className="CardHeader"></header>
        <div className="CardZone">
          <Dropzone
            hideUpload={this.props.showUpload}
            onUpload={toDo}
            onFilesAdded={emptyTrigger}
          />
          {
            //CON PASAR EL NOMBRE DE LA FUNCIÓN A onUpload YA DEBERÍA DE FUNCIONAR;
            //NO QUITAR EL EMPTY TRIGGER
          }
        </div>
      </div>
    );
  }
}

export default DropzonePage;
