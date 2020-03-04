import React from 'react';
import GenericButton from '../generic_components/GenericButton';
import MainNavBar from '../generic_components/MainNavBar';
import GenericText from '../generic_components/GenericText';
import logo from '../../logo.svg';
import '../../assets/css/login.css'
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom";

const LoginPage = () => {
  return (
    <div class=".bodyContainer">
		<div class="container-login100">
			<div class="wrap-login100">
				<div class="login100-pic js-tilt" data-tilt>
					<img src="images/img-01.png" alt="IMG"/>
				</div>

				<form class="login100-form validate-form">
					<span class="login100-form-title">
						Pod Login
					</span>

					<div class="wrap-input100">
						<input class="input100" list="providers" type="text" name="provider" placeholder="Provider"/>
						<datalist id = "providers">
                            <option value="https://solid.community/"/>
                            <option value="https://inrupt.net/"/>
                        </datalist>
                        <span class="focus-input100"></span>
					</div>

					
					<div class="container-login100-form-btn">
						<GenericButton className="login100-form-btn"
							        message="Login"
						/>
					</div>

				</form>
			</div>
		</div>
	</div>
    
  );
};
export default LoginPage;