import React, { Component } from 'react';
import Dropzone from '../spec_components/Dropzone';
import '../../assets/css/DropzonePage.css';

class DropzonePage extends Component {
 
  

  componentWillMount(){
      document.addEventListener('mousedown',this.handleClick, false);
  }

  componentWillUnmount(){
    document.removeEventListener('mousedown', this.handleClick, false);
  }
  handleClick =(e)=>{
    if(this.node.contains(e.target)){
      return;
    }

    this.props.showUpload();
    
  }
  render() {

    function pipo(params) { //EJEMPLO DE FUNCIÓN PARA PASARLE AL onUpload
      console.log(params);
    }
    function emptyTrigger(){
      //Function To Trigger
    }
    return (
      <div ref={node => this.node = node } className="dropzonePage">
        <header className="CardHeader">
         
        </header>
        <div className="CardZone">
          <Dropzone hideUpload={this.props.showUpload} onUpload={pipo} onFilesAdded={emptyTrigger} /> 
          {
            //CON PASAR EL NOMBRE DE LA FUNCIÓN A onUpload YA DEBERÍA DE FUNCIONAR;
            //NO QUITAR EL EMPTY TRIGGER
          }
        </div>
        
      </div>
    )
  }
}

export default DropzonePage;