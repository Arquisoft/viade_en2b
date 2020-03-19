import React, {Component} from 'react';
import '../../assets/css/GenericButton.css';


class GenericButton extends Component {

 render(){
  return (
      <button className={this.props.className} name={this.props.name} onClick={this.props.onClick}>
       {this.props.message}
        
      </button>
  );
 }
}

export default GenericButton;
