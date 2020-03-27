import React, { Component } from 'react';
import Dropzone from '../spec_components/Dropzone';
import '../../assets/css/DropzonePage.css'

class DropzonePage extends Component {
  render() {
    return (
      <div className="dropzonePage">
        <div className="Card">
          <Dropzone onFilesAdded={console.log} />
        </div>
      </div>
    )
  }
}

export default DropzonePage