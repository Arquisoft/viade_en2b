import React, { Component } from "react";
import "../../assets/css/GenericButton.css";

class CustomButtomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
    };
  }
  executeAction() {
    var method = this.props.onClick;
    method();
  }
  render() {
    const { selected } = this.state;
    return (
      <React.Fragment>
        <button
          className={this.props.className}
          name={this.props.name}
          onClick={() => {
            this.executeAction();
            this.setState({ selected: !this.state.selected });
          }}
        >
          {this.props.message}
        </button>
        {selected ? (
          <span
            className="spanselected fas fa fa-check"
            aria-hidden="true"
          ></span>
        ) : (
          <span className="spanselected fa fa-times" aria-hidden="true">
            {" "}
          </span>
        )}
      </React.Fragment>
    );
  }
}

export default CustomButtomList;
