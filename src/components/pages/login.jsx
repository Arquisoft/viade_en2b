import React from 'react';
import GenericButton from '../generic_components/GenericButton';
import BurgerMenu from '../generic_components/BurgerMenu';

import '../../assets/css/login.css'

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
					<img src="images/img-01.png" alt="IMG"/>
				</div>

				<form className="login100-form validate-form">
					<span className="login100-form-title">
						Pod Login
					</span>

					<div className="wrap-input100">
						<input className="input100" list="providers" type="text" name="provider" placeholder="Provider"/>
						<datalist id = "providers">
                            <option value="https://solid.community/"/>
                            <option value="https://inrupt.net/"/>
                        </datalist>
                        <span className="focus-input100"></span>
					</div>

					
					<div className="container-login100-form-btn">
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