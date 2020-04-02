import React, {Component} from 'react';
import '../../assets/css/GenericInput.css';


class GenericButton extends Component {

 render(){
  return (
      <input
          ref={this.props.ref}
          className="FileInput"
          type={this.props.type}
          multiple
          onChange={this.props.onChange}
        />
      
  );
 }
}

export default GenericButton;


