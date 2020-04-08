
import React, { Component } from 'react';

import 'assets/css/Multiviewer.css';
class MultimediaViewer extends Component {
  constructor(props){
    super(props);
    this.state = {
        files: []
    }
  }
  files = [];
  componentDidUpdate(){
    this.props.files.forEach((item)=>{
      this.state.files.push(item);
      this.files.push(item);
    });
  }
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
        <React.Fragment>
          <ul className="listMedia">
              {this.props.files.map((item,index)=>{
              return(
                <li className="mediaElement" key={index}>
                  {this.getIcon(item)}{item.name}          
                </li>);
                })
              }
          </ul>
          
        </React.Fragment>
      
    )
  }
}

export default MultimediaViewer;

