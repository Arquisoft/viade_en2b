import React, {Component} from 'react';

import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';

import '../../assets/css/FloatingMenu.css'

class FloatingButton extends Component {
render () {
    return (
        <Fab  className="mainButton"
  mainButtonStyles={this.props.mainButtonStyles}
  actionButtonStyles={this.props.actionButtonStyles}
  position={this.props.position}
  event={'click'}
>
    <Action className="actionButton" text="Add route" children={<i className="fa fa-fw fas fa-home"></i>}/>

    <Action className="actionButton" text="Record Route" children={<i className="fa fa-fw fas fa-home"></i>}/>

    <Action className="actionButton" text="Hola" children={<i className="fa fa-fw fas fa-home"></i>}/>

</Fab>
    );
}
}
export default FloatingButton;
