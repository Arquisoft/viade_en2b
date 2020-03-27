
import React, { Component } from 'react';

import 'assets/css/Multiviewer.css';
class MultimediaViewer extends Component {
  
  getIcon(element){
      var extension = element.type;
      if(extension.includes("jpg") 
        || extension.includes("jpeg")
        || extension.includes("png") )
        return (<i className="fa fas fa-camera-retro"></i>);
      else
        return (<i className="fa far fa-map"></i>);
  }
  render() {
     
    return (
        <ul className="listMedia">
            {this.props.files.map((item,index)=>{
            return(

                    <li className="mediaElement" key={index}>
                         {this.getIcon(item)}{item.name}
                        
                    </li>);
            })
        }
      </ul>
    )
  }
}

export default MultimediaViewer;

