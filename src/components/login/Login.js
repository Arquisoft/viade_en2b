import React from "react";

import { LoggedIn, LoggedOut } from "@solid/react";
import cache from "../../caches/routeCache/RouteCache";
import * as friendCache from "caches/friendCache/FriendCache";
import data from "@solid/query-ldflex";

import * as userprofile from "../../data-access/UserData";

const $rdf = require("rdflib");
const auth = require("solid-auth-client");

function logout(e, auth) {
  e.preventDefault();
  auth.logout();
  cache.clear();
  friendCache.default.clear();
}

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      name: "",
    };
  }
  componentDidMount() {
    this.getProfileImage().then((foto) => {
      this.setState({ image: foto });
    });
    this.getProfileName().then((name) => {
      this.setState({ name: name });
    });
  }

  componentDidUpdate() {
    this.getProfileImage().then((foto) => {
      this.setState({ image: foto });
    });
    this.getProfileName().then((name) => {
      this.setState({ name: name });
    });
  }

  async popup(e, auth) {
    e.preventDefault();
    let session = await auth.currentSession();
    let popupUri = "https://solid.community/common/popup.html";
    if (!session) session = await auth.popupLogin({ popupUri });
    this.getProfileImage().then((foto) => {
      this.setState({ image: foto });
    });
    this.getProfileName().then((name) => {
      this.setState({ name: name });
    });
    auth.fetch(session).then(console.log);
    alert(`Logged in as ${session.webId}`);
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

  viewImageLoaded = () => {};
  render() {
    const { image } = this.state;

    return (
      <div>
        <LoggedOut>
          <div className="wrap-input100">
            <input
              id="inputLogin"
              className="input100"
              list="providers"
              type="text"
              name="provider"
              placeholder="Provider"
            />
            <datalist id="providers">
              <option value="https://solid.community/" />
              <option value="https://inrupt.net/" />
            </datalist>
            <span className="focus-input100"></span>
          </div>
          <button
            className="login100-form-btn"
            onClick={(e) => this.popup(e, auth)}
          >
            Log In
          </button>
        </LoggedOut>
        <LoggedIn>
          <img src={this.state.image} />
          <p>{this.state.name}</p>
          <button
            className="login100-form-btn"
            onClick={(e) => logout(e, auth)}
          >
            Log out
          </button>
        </LoggedIn>
      </div>
    );
  }
}

export default Login;
