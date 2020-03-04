import React, { Component } from 'react';
import '../../assets/css/MainNavBar.css';
import GenericButton from './GenericButton';

import {Link} from "react-router-dom";

//I used bootstrap just not to leave a white nav bar on this commit :)
class MainNavBar extends Component{
	render() {
		return (
		  	<nav className="navbar navbar-inverse">
		  	<div className="container-fluid">
			  	<div className="navbar-header">
                    <button type ="button" className="navbar-toggle" data-toggle="collapse"
				     data-target="#myNavbar">
				        <span>| | |</span>
			        </button>
                    <div className="brandContainer">
				        <a className="navbar-brand" href="https://github.com/Arquisoft/viade_en2b">
                            <span>{this.props.companyName}</span>
                        </a>
                    </div>
			  	</div>
                <div className ="collapse navbar-collapse" id="myNavbar">
			        <ul className ="nav navbar-nav navbar-right">	  
                   <form method="get" action="/login">
				       <GenericButton 
                        className="buttonGenBlue"
                        name="buttomNavLogin"
                        message="Log in"
                        />
						</form>
			        </ul>
                </div>
		  	</div>
		  	</nav>
		);
	  }

	
}


export default MainNavBar;