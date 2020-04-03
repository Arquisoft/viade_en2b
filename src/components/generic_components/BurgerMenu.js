import React, {Component} from 'react';
import { slide as Menu } from 'react-burger-menu';

import {HashRouter as Router, Link} from "react-router-dom";
import 'assets/css/BurgerMenu.css'

import ThemeSwitch from './ThemeSwitch.js';

class BurgerMenu extends Component {
  showSettings (event) {
    event.preventDefault();
  }
  
  render () {
    return (
      <Menu disableAutoFocus className="bm-menu"  pageWrapId={ this.props.pageWrapId } outerContainerId={ this.props.container }>
        <nav className="bm-item-list">
        <h2 className="bm-item" tabIndex="0"><i className="fa fa-fw fa-inbox fa-2x"></i>
          <span>ViAde</span>
        </h2>
        <Router>
            <Link id="home" className="menu-item" to="/">
              <i className="fa fa-fw fas fa-home"></i>
              <span>Home</span>
            </Link>
           
            <Link id="add-route" className="menu-item" to="/">
              <i className="fa fa-fw far fa-map"></i>
              <span>Add route</span>
            </Link>
          
            <Link id="list-routes" className="menu-item" to="/routes">
              <i className="fa fa-fw far fa-list-alt"></i>
              <span>List Routes</span>
            </Link>
          
            <Link id="list-friends" className="menu-item" to="/friends-list">
              <i className="fa fa-fw fas fa-users"></i>
              <span>List Friends</span>
            </Link>
           
            <Link id="about" className="menu-item" to="/about">
              <i className="fa fa-fw fas fa-info-circle"></i>
              <span>About</span>
            </Link>
           
            <Link id="contact" className="menu-item" to="/">
              <i className="fa fa-fw fas far fa-address-card"></i>
              <span>Contact</span>
            </Link>
            
            <Link id="settings" className="menu-item" to="/">
              <i className="fa fa-fw fas fa-cog"></i>
              <span>Settings</span>
            </Link>
            
            <ThemeSwitch/>
            
          </Router>
        </nav>
      </Menu>
    );
  }
}



export default BurgerMenu;
