import React, { Component } from 'react';
import '../../assets/css/MainNavBar.css';
import GenericButton from './GenericButton';

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
				        <a class="navbar-brand" href="">
                            <span>{this.props.companyName}</span>
                        </a>
                    </div>
			  	</div>
                <div class ="collapse navbar-collapse"id="myNavbar">
			        <ul class ="nav navbar-nav navbar-right">	  
                       <GenericButton 
                        className="buttonGenBlue"
                        name="buttomNavLogin"
                        message="Log In"
                        />
			        </ul>
                </div>
		  	</div>
		  	</nav>
		);
	  }

	//  exchanger(){ Case of NOT possible
	//	$("#img-thumbnail").text('Don`t Click me' );
	//  }
}


export default MainNavBar;