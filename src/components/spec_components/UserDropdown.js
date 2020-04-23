import React, { Component } from "react";
import { Image } from "semantic-ui-react";
import data from "@solid/query-ldflex";
import { HashRouter as Router, Link } from "react-router-dom";

import "assets/css/UserDropdown.css";

class UserDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image:
        "https://www.lepetitjuriste.fr/wp-content/uploads/2019/02/default_F.png",
      name: "",
      clicked: false,
    };
  }

  componentDidMount() {
    this.setState({ clicked: false });
    this.getProfileImage().then((foto) => {
      if (foto == undefined) {
        this.setState({
          image:
            "https://www.lepetitjuriste.fr/wp-content/uploads/2019/02/default_F.png",
        });
      } else this.setState({ image: foto });
    });

    this.getProfileName().then((name) => {
      if (name == undefined) {
        this.setState({ name: "Welcome, Guest" });
      } else this.setState({ name: "Welcome, " + name });
    });
  }

  async getProfileImage() {
    try {
      const { user } = data;
      const userImage = await user.vcard_hasPhoto;
      return userImage.value;
    } catch (error) {
      //errorToaster(error.message, 'Error');
    }
  }

  async getProfileName() {
    try {
      const { user } = data;
      const userName = await user.name;
      return userName.value;
    } catch (error) {
      //errorToaster(error.message, 'Error');
    }
  }

  render() {
    const { clicked } = this.state;
    return (
      <div className="loginButton">
        <div className="dropdown">
          <img id="avataruser" src={this.state.image} />
          <span style={{ padding: "10px" }}>
            {this.state.name.split(" ")[1]}
          </span>
          <div className="dropdown-content">
            <Router>
              <Link className="linkUser" to="/login">
                Profile
              </Link>
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

export default UserDropdown;
