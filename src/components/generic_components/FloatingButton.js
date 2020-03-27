import React, {Component} from 'react';

import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';

import 'assets/css/FloatingMenu.css'

class FloatingButton extends Component {
render () {
    return (
        <Fab  className="mainButton"
  mainButtonStyles={this.props.mainButtonStyles}
  actionButtonStyles={this.props.actionButtonStyles}
  position={this.props.position}
  event={'click'}
  icon={<i className ="fa fa-plus fafab"></i>}
>
    <Action className="actionButton" text="Add route"><i className="fa fa-map-pin fafab"></i></Action>

    <Action className="actionButton" text="Take Photo"><i className="fa fa-camera fafab"></i></Action>

    <Action className="actionButton" text="Record"><i className="fa fa-circle"></i></Action>

</Fab>
    );
}
}
export default FloatingButton;
