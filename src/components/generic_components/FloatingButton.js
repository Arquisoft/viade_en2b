import React, {Component, useState} from 'react';
import {useHistory, Redirect} from "react-router-dom";
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import * as RealTimeRoute from "../../RouteManager/CreateRouteRealTime";

import { ToastContainer, toast, Bounce } from "react-toastify";

import 'assets/css/FloatingMenu.css'

const FloatingButton = (props) => {

let history = useHistory();
const [recording,setRecording] = useState(false); 
const startRecording = ()=>{
<<<<<<< HEAD
    toast.warning("Route recording started", {
=======
    toast.warning("Recording route...", {
>>>>>>> 3545e370971467599c122c3426bc39e7ecace2f6
        draggable: true,
        position: toast.POSITION.TOP_CENTER
      });
    
    setRecording(true);
    RealTimeRoute.default.main()
}
 const  finishRecording = ()=>{
<<<<<<< HEAD
     toast.warning("Route recording stopped", {
=======
     toast.warning("Recording stopped", {
>>>>>>> 3545e370971467599c122c3426bc39e7ecace2f6
        draggable: true,
        position: toast.POSITION.TOP_CENTER
      });
    
    setRecording(false);
    RealTimeRoute.default.stop();
    //props.showSaveRoute();
    history.push('/saveroute')

    
    
    
}

   
    return (
        <Fab  className="mainButton"
        event={'click'}
        icon={<i className ="fa fa-plus fafab"></i>}
        >
    <Action className="actionButton" text="Add route"><i className="fa fa-map-pin fafab"></i></Action>

    <Action className="actionButton"  text="Take Photo"  onClick={props.showUpload}><i className="fa fa-camera fafab"></i></Action>
    {
        recording ? <Action className="actionButton" text="Stop" onClick={() => finishRecording()}><i className="fa fas fa-stop"></i></Action>
        :<Action className="actionButton" text="Record" onClick={() => startRecording()}><i className="fa fa-circle"></i></Action>
    }
    
    
    

</Fab>
    );

}
export default FloatingButton;
