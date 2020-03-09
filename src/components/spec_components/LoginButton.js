import React, {Component} from 'react';
import '../../assets/css/GenericButton.css';
import GenericButton from '../generic_components/GenericButton';
import PropTypes from 'prop-types';
import Login from '../login/Login';

class LoginButton extends Component {
    handleClick(e){
            e.preventDefault();
            var sr = document.getElementById("inputLogin").value;
            console.log(sr);
            //Desde este sitio se hace la llamada de login
            
    }
    
    render () {
        return (
            <button onClick={(e)=> this.handleClick(e)} className={this.props.className}>
                {this.props.message}
            </button>
        );
    }
  
}

LoginButton.propTypes = {
    onClick: PropTypes.func
};

export default LoginButton;