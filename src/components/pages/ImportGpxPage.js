import React, { useState, useReducer } from "react";

import GenericButton from "../generic_components/GenericButton";
import FloatingButton from "../generic_components/FloatingButton";
import BurgerMenu from "components/generic_components/BurgerMenu";
import "assets/css/GenericButton.css";

import { HashRouter as Router, Link } from "react-router-dom";

import Dropzone from "../spec_components/Dropzone";

import '../../assets/css/ImportGpxPage.css';
import '../../assets/css/DropzonePage.css';
import { ToastContainer, toast, Zoom, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import cache from "caches/fileCache/FileCache";
class ImportGpxPage extends React.Component {
  render() {
    function toDo(params) { //EJEMPLO DE FUNCIÓN PARA PASARLE AL onUpload
      //cache.uploadFiles([...params]); 
      
      console.log(params);

    }
    function emptyTrigger(){
      //Function To Trigger
    }
    return (
      <div className="wrapper">
       <BurgerMenu pageWrapId="wrapper" container="gpxPage"/>
      <div ref={node => this.node = node } className="gpxPage">
        
       
        <div className="GpxZone">
          <Dropzone hideUpload={this.props.showUpload} onUpload={toDo} onFilesAdded={emptyTrigger} /> 
        </div>
    
      </div>
      </div>
    )
  }
}

export default ImportGpxPage;
