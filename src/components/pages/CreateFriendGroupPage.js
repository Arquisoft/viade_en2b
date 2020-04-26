import React from "react";
import BurgerMenu from "../generic_components/BurgerMenu";
import CardLayout from "../generic_components/Card";
import CustomLoader from "components/generic_components/CustomLoader";
import GenericButton from "components/generic_components/GenericButton";
import * as cache from "caches/friendGroupCache/FriendGroupCache";
import * as friendcache from "caches/friendCache/FriendCache";
import friendmanager from "FriendGroupManager/FriendGroupManager";
import { HashRouter as Router, Link } from "react-router-dom";
import "../../assets/css/CreateFriendGroupPage.css";
import data from "@solid/query-ldflex";

import { Image, List } from "semantic-ui-react";
var friends = [];
class CreateFriendGroupPage extends React.Component {
  constructor(props) {
    super(props);
    friends = friendcache.default.getFriends();
    this.state = {
      loading: false,
      friends: [],
    };
  }

  componentDidMount() {
    //this.setState({ loading: true, friends: friendcache.default.getFriends() });
  }

  viewLoaded = (friends) => {
    return (
      <div className="bodyFriends" id="outer-container">
        <main>
          <BurgerMenu pageWrapId="page-wrap" container="outer-container" />

          <div className="App friends" id="page-wrap">
            <div className="backList">
              <Router>
                <Link to="/groups">List Groups</Link>
              </Router>
            </div>
            <section className="sectionFriends">
              <h1 className="headerGroup">Create a Group of Friends</h1>
              <div className="createGroup">
                <section className="selectMembersSection">
                  <label>Select Members</label>
                  <ul className="listgroups">
                    {friends.map((item, index) => {
                      return (
                        <li id={"group" + index} key={index} className="liCard">
                          <div className="itemgroup">
                            <button
                              className="itemelement"
                              onClick={() => {
                                alert(index);
                              }}
                            >
                              {item.name}
                            </button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </section>
                <section className="saveSection">
                  <label for="textInput">Group Name</label>
                  <br />
                  <input className="textInput" type="text" />
                  <form>
                    <GenericButton
                      className="submitRoute"
                      message="Save Group"
                    />
                  </form>
                </section>
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  };
  render() {
    return <React.Fragment>{this.viewLoaded(friends)}</React.Fragment>;
  }
}
export default CreateFriendGroupPage;
