import React, { Component } from 'react';
import Dropzone from '../spec_components/Dropzone';
import '../../assets/css/DropzonePage.css'

class DropzonePage extends Component {
  render() {
    function pipo(params) { //EJEMPLO DE FUNCIÓN PARA PASARLE AL onUpload
      console.log(params);
    }
    function emptyTrigger(){
      //Function To Trigger
    }
    return (
      <div className="dropzonePage">
        <div className="CardZone">
          <Dropzone onUpload={pipo} onFilesAdded={emptyTrigger} /> 
          {
            //CON PASAR EL NOMBRE DE LA FUNCIÓN A onUpload YA DEBERÍA DE FUNCIONAR;
            //NO QUITAR EL EMPTY TRIGGER
          }
        </div>
        
      </div>
    )
  }
}

export default DropzonePage