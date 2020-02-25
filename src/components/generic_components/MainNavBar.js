import React, { Component } from 'react';

//I used bootstrap just not to leave a white nav bar on this commit :)
class MainNavBar extends Component{
	render() {
		return (
		  	<nav class="navbar navbar-inverse">
		  	<div class="container-fluid">
			  
			  	<div class="navbar-header">
				  <a class="navbar-brand" href="">{this.props.companyName}</a>
			  	</div>

			  <ul class="nav navbar-nav">				  

			  </ul>
		  	</div>
		  	</nav>
		);
	  }

	//  exchanger(){ Case of NOT possible
	//	$("#img-thumbnail").text('Don`t Click me' );
	//  }
}


export default MainNavBar;