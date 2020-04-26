import React from "react";
import BurgerMenu from "../generic_components/BurgerMenu";
import CardLayout from "../generic_components/Card";
import CustomLoader from "components/generic_components/CustomLoader";
import CustomListButton from "components/generic_components/CustomListButton";
import GenericButton from "components/generic_components/GenericButton";
import * as cache from "caches/friendGroupCache/FriendGroupCache";
import * as friendcache from "caches/friendCache/FriendCache";
import friendmanager from "FriendGroupManager/FriendGroupManager";
import { HashRouter as Router, Link } from "react-router-dom";
import "../../assets/css/CreateFriendGroupPage.css";
import data from "@solid/query-ldflex";

import { Image, List } from "semantic-ui-react";
var friends = [];
var friendsToGroup = [];
class CreateFriendGroupPage extends React.Component {
  constructor(props) {
    super(props);
    friends = friendcache.default.getFriends();
    this.state = {
      loading: false,
      friends: [],
      nameGroup: "",
    };
  }

  componentDidMount() {
    //this.setState({ loading: true, friends: friendcache.default.getFriends() });
  }
  manageFriendsToGroup(friendWebId) {
    var length = friendsToGroup.length;
    friendsToGroup = friendsToGroup.filter((item) => item.url !== friendWebId);
    if (friendsToGroup.length == length)
      friendsToGroup.push({ url: friendWebId });

    console.log(friendsToGroup);
  }
  getFriendsToGroup() {
    return friendsToGroup;
  }

  nameToGroup(name) {
    this.setState({ nameGroup: name.target.value });
    console.log(this.state.nameGroup);
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
                            <CustomListButton
                              className="itemelement"
                              message={item.name}
                              onClick={() => {
                                this.manageFriendsToGroup(
                                  friends[index].webIdString
                                );
                              }}
                            />
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </section>
                <section className="saveSection">
                  <label for="textInput">Group Name</label>
                  <br />
                  <input
                    className="textInput"
                    type="text"
                    onChange={this.nameToGroup.bind(this)}
                  />
                  <form>
                    <GenericButton
                      className="submitGroup"
                      message="Save Group"
                      onClick={() => {
                        friendmanager.creategroup(
                          this.getFriendsToGroup(),
                          this.state.nameGroup
                        );
                        window.location.reload();
                      }}
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
