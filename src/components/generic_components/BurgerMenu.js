import React, {Component} from 'react';
import { slide as Menu } from 'react-burger-menu';


import '../../assets/css/BurgerMenu.css'

class BurgerMenu extends Component {
  showSettings (event) {
    event.preventDefault();
  }

  render () {
    // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
    return (
    
      <Menu  disableAutoFocus className="bm-menu"  pageWrapId={ this.props.pageWrapId } outerContainerId={ this.props.container }>
        <nav className="bm-item-list">
        <h2 className="bm-item" tabIndex="0"><i className="fa fa-fw fa-inbox fa-2x"></i>
          <span>ViAde</span>
        </h2>
            <a id="home" className="menu-item" href="/">
              <i className="fa fa-fw fas fa-home"></i>
              <span>Home</span>
            </a>
            <a id="add-route" className="menu-item" href="/">
              <i className="fa fa-fw far fa-map"></i>
              <span>Add route</span>
            </a>
            <a id="list-routes" className="menu-item" href="/routes">
              <i className="fa fa-fw far fa-list-alt"></i>
              <span>List Routes</span>
            </a>
            <a id="list-friends" className="menu-item" href="/">
              <i className="fa fa-fw fas fa-users"></i>
              <span>List Friends</span>
            </a>
            <a id="about" className="menu-item" href="https://github.com/Arquisoft/viade_en2b">
              <i className="fa fa-fw fas fa-info-circle"></i>
              <span>About</span>
            </a>
            <a id="contact" className="menu-item" href="/">
              <i className="fa fa-fw fas far fa-address-card"></i>
              <span>Contact</span>
            </a>
            <a onClick={ this.showSettings } className="menu-item--small" href="/">
              <i className="fa fa-fw fas fa-cog"></i>
              <span>Settings</span>
            </a>
        </nav>
      </Menu>
    );
  }
}



export default BurgerMenu;
