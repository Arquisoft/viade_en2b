import React, {Component} from 'react';
import ConfigCache from 'caches/ConfigCache.js'
import 'assets/css/ThemeSwitch.css'

function toggleTheme()
{
  ConfigCache.switchTheme()
  if(ConfigCache.dark)
    document.documentElement.setAttribute('data-theme', 'dark');
  else
    document.documentElement.setAttribute('data-theme', '');
  
}

class ThemeSwitch extends Component {
  render()
  {
    return (
      <div id="lightmode" className="menu-item">
        <span className="toggle">Dark mode</span>
        <label className="switch">
          <input className="theme-switch"
            type="checkbox"
            onClick={toggleTheme}
          />
          <span className="slider round"></span>
        </label>
      </div>
    );
  }
}

export default ThemeSwitch;
