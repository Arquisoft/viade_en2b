import React from 'react';
import { LoggedIn, LoggedOut } from '@solid/react';
import cache from '../../caches/routeCache/RouteCache'
import * as friendCache from 'caches/friendCache/FriendCache';
import { ShareWith } from 'ShareManager/ShareRoute';
import { getNotifications } from 'NotificationManager/NotificationManager';
import { retrieveSharedRoutes, listAllURLShared, sharedRoutesList } from 'ShareManager/RetrieveRoute';

import data from "@solid/query-ldflex";
import BurgerMenu from "../generic_components/BurgerMenu";
import * as userprofile from "../../data-access/UserData";

import "assets/css/Login.css";

const $rdf = require("rdflib");
const auth = require("solid-auth-client");

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image:
        "https://www.lepetitjuriste.fr/wp-content/uploads/2019/02/default_F.png",
      name: "",
    };
  }

  componentDidMount() {
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
        this.setState({ name: "Guest" });
      }
      this.setState({ name: "Welcome, " + name });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.image !== this.state.image) {
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
        }
        this.setState({ name: name });
      });
    }
  }

  async popup(e, auth) {
    e.preventDefault();
    let session = await auth.currentSession();
    let popupUri = "https://solid.community/common/popup.html";
    if (!session) session = await auth.popupLogin({ popupUri });
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

  async logout(e, auth) {
    e.preventDefault();
    await auth.logout();
    this.getProfileImage().then((foto) => {
      console.log(foto);
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
    cache.clear();
    friendCache.default.clear();
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

  viewImageLoaded = () => { };
  render() {
    const { image } = this.state;

    return (
      <div className=".bodyContainer" id="outer-container">
        <BurgerMenu pageWrapId="page-wrap" container="outer-container" />
        <div className="container-login100" id="page-wrap">
          <div className="wrap-login100">
            <div className="login100-pic js-tilt" data-tilt>
              <img src={image} alt="IMG" />
            </div>
            <form className="login100-form validate-form">
              <span className="login100-form-title">Pod Login</span>
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
                <p>{this.state.name}</p>

                <button
                  className="login100-form-btn"
                  onClick={(e) => this.logout(e, auth)}
                >
                  Log out
                </button>
              </LoggedIn>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
