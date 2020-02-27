import React, {Component} from 'react';
import '../../assets/css/GenericButton.css';
import {Link} from "react-router-dom";

class GenericButton extends Component {
 render(){
  return (
      <button className={this.props.className} name={this.props.name}>
       {this.props.message}
        
      </button>
  );
 }
}

export default GenericButton;
