import React, { Component } from 'react';
import SaveRoute from '../spec_components/SaveRoute';
import BurgerMenu from '../generic_components/BurgerMenu';
import * as cache from "caches/routeCache/RouteCache";


import "assets/css/SaveRoutePage.css";
class SaveRoutePage extends Component {
 
  

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

  //  this.props.showUpload();
    
  }
  render() {

    function pipo(params) { //EJEMPLO DE FUNCIÓN PARA PASARLE AL onUpload
      console.log(params);
    }
    function emptyTrigger(){
      //Function To Trigger
    }
    return (
      
      <React.Fragment>
            {console.table(cache.default.getSelectedToUpload())}
        <BurgerMenu pageWrapId="page-wrap" container="outer-container"/>
      <div ref={node => this.node = node } className="savePage" id="page-wrap">
      

        <div className="cardsave">
          <SaveRoute hideUpload={this.props.showUpload} onUpload={pipo} onFilesAdded={emptyTrigger} /> 
          <div className="mapContainer">
           
          </div>
        </div>
        
      </div>
      </React.Fragment>
    )
  }
}

export default SaveRoutePage;