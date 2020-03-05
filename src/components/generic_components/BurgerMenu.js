import React, {Component} from 'react';
import { push as Menu } from 'react-burger-menu';
import {Link} from "react-router-dom";

import '../../assets/css/BurgerMenu.css'

class BurgerMenu extends Component {
  showSettings (event) {
    event.preventDefault();
  }

  render () {
    // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
    return (
    
      <Menu pageWrapId={ this.props.pageWrapId } outerContainerId={ this.props.container }>
        <Link id="home" className="menu-item link" to="/">Home</Link>
        <Link id="add-route" className="menu-item" to="/">Add route</Link>
        <Link id="list-friends" className="menu-item" to="/">List Friends</Link>
        <Link id="about" className="menu-item" to="/about">About</Link>
        <Link id="contact" className="menu-item" to="/">Contact</Link>
        <Link onClick={ this.showSettings } className="menu-item--small" to="/">Settings</Link>
      </Menu>
    );
  }
}



export default BurgerMenu;
