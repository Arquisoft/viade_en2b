import React, {Component} from 'react';

import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import * as RealTimeRoute from "../../RouteManager/CreateRouteRealTime";
import 'assets/css/FloatingMenu.css'

class FloatingButton extends Component {
state = {
    recording:false
}
startRecording(){
    this.setState({recording:!this.state.recording});
    RealTimeRoute.default.main()
}
finishRecording(){
    this.setState({recording:!this.state.recording});
    RealTimeRoute.default.stop();
}
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

    <Action className="actionButton"  text="Take Photo"  onClick={this.props.showUpload}><i className="fa fa-camera fafab"></i></Action>
    {
        this.state.recording ? <Action className="actionButton" text="Stop" onClick={() => this.finishRecording()}><i className="fa fas fa-stop"></i></Action>
        :<Action className="actionButton" text="Record" onClick={() => this.startRecording()}><i className="fa fa-circle"></i></Action>
    }
    
    
    

</Fab>
    );
}
}
export default FloatingButton;
