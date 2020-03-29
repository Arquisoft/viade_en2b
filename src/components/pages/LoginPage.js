import React from 'react';
import BurgerMenu from '../generic_components/BurgerMenu';

import 'assets/css/Login.css'
import Login from '../login/Login';

const LoginPage = () => {
  return (
    <div className=".bodyContainer" id="outer-container">
	 <BurgerMenu 
        pageWrapId="page-wrap"
        container="outer-container"
      />
		<div className="container-login100" id="page-wrap">
			<div className="wrap-login100">
				<div className="login100-pic js-tilt" data-tilt>
					<img src="images/login-icon.png" alt="IMG"/>
				</div>

				<form className="login100-form validate-form">
					<span className="login100-form-title">
						Pod Login
					</span>
						<Login></Login>
				</form>

			</div>
		</div>
	</div>
    
  );
};
export default LoginPage;
