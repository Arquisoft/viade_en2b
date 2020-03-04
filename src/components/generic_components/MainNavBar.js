import React, { Component } from 'react';
import '../../assets/css/MainNavBar.css';
import GenericButton from './GenericButton';

import { Link} from "react-router-dom";

//I used bootstrap just not to leave a white nav bar on this commit :)
class MainNavBar extends Component{
	render() {
		return (
		  	<nav class="navbar navbar-inverse">
		  	<div class="container-fluid">
			  	<div class="navbar-header">
                    <button type ="button" class="navbar-toggle" data-toggle="collapse"
				     data-target="#myNavbar">
				        <span>| | |</span>
			        </button>
                    <div class="brandContainer">
				        <a class="navbar-brand" href="https://github.com/Arquisoft/viade_en2b">
                            <span>{this.props.companyName}</span>
                        </a>
                    </div>
			  	</div>
                <div class ="collapse navbar-collapse" id="myNavbar">
			        <ul class ="nav navbar-nav navbar-right">	  
                       <GenericButton 
                        className="buttonGenBlue"
                        name="buttomNavLogin"
                        message=<Link to="/login" className="link">LOG IN</Link>
                        />
			        </ul>
                </div>
		  	</div>
		  	</nav>
		);
	  }

	
}


export default MainNavBar;