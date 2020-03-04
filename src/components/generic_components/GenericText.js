import React, {Component} from 'react';
import '../../assets/css/GenericText.css';


class GenericText extends Component {
 render(){
  return (
      <p className={this.props.className} name={this.props.name}>
       {this.props.message}
        
      </p>
  );
 }
}

export default GenericText;
