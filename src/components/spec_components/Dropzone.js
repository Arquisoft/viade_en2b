import React, { Component } from 'react';
import '../../assets/css/Dropzone.css'
import MultimediaViewer from './MultimediaViewer';
class Dropzone extends Component {
  constructor(props) {
    super(props);
    this.state = { hightlight: false, 
                   files: []};
    this.fileInputRef = React.createRef();
    
    this.openFileDialog = this.openFileDialog.bind(this);
    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

    

  openFileDialog() {
    if (this.props.disabled) return;
    this.fileInputRef.current.click();
  }

  onFilesAdded(evt) {
    if (this.props.disabled) return;
    const files = evt.target.files;
    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files);
      this.props.onFilesAdded(array);
      console.log("FILE ADDED BY CLICKING");
      this.setState({files: array});
    }
  }

  onDragOver(evt) {
    evt.preventDefault();

    if (this.props.disabled) return;

     this.setState({highlight: true});
  }

  onDragLeave() {
     this.setState({highlight: false});
  }

  onDrop(event) {
    event.preventDefault();

    if (this.props.disabled) return;

    const files = event.dataTransfer.files;
    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files);
      this.props.onFilesAdded(array);
      console.log("FILE ADDED BY DROPPING");
       this.setState({files: array});
    }
    this.setState({highlight: false});
  }

  fileListToArray(list) {
    const array = [];
    for (var i = 0; i < list.length; i++) {
      array.push(list.item(i));
    }
    return array;
  }

  render() {
    return (
      <React.Fragment>
      <div
        className={`Dropzone ${this.state.hightlight ? 'Highlight' : ''}`}
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
        onClick={this.openFileDialog}
        style={{ cursor: this.props.disabled ? 'default' : 'pointer' }}
      >
        <input
          ref={this.fileInputRef}
          className="FileInput"
          type="file"
          multiple
          onChange={this.onFilesAdded}
        />
        <img
          alt="upload"
          className="Icon"
          src="baseline-cloud_upload-24px.svg"
        />
        <span>Upload Files</span>
      </div>
      <MultimediaViewer files={this.state.files}/>
      </React.Fragment>
    )
  }
}

export default Dropzone;