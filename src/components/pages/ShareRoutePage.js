import React from "react";
import BurgerMenu from "../generic_components/BurgerMenu";
import CardLayout from "../generic_components/Card";
import * as cache from "caches/friendCache/FriendCache";
import * as groupcache from "caches/friendGroupCache/FriendGroupCache";
import * as routecache from "caches/routeCache/RouteCache";
import { ShareWith } from "ShareManager/ShareRoute";
import { toast } from "react-toastify";
import "../../assets/css/FriendList.css";
import "assets/css/ShareRoutePage.css";
var friends = [];
var groups = [];
const auth = require("solid-auth-client");
var session = "";
function shareWithGroup(group) {
  group.users.map((friend) => {
    console.log(friend);
    ShareWith(
      routecache.default.getSelectedToShare(),
      friend.url,
      session.webId
    );
  });
}
const ShareRoutePage = () => {
  friends = cache.default.getFriends();
  groups = groupcache.default.getLoadedGroups();
  console.log(groups);
  session = JSON.parse(localStorage.getItem("session"));
  return (
    <div className="bodyFriends" id="outer-container">
      <main>
        <BurgerMenu pageWrapId="page-wrap" container="outer-container" />
        <div className="App friends" id="page-wrap">
          <section>
            <div className="loginButton">
              <div className="dropdown shareList">
                <h1>>Share with friends</h1>
                <div className="dropdown-content shareContent">
                  <ul className="sectionFriends">
                    {friends.map((item, index) => {
                      return (
                        <li
                          id={"friend" + index}
                          key={index}
                          className="liCard"
                        >
                          <CardLayout
                            image={item.profilePicture}
                            header={item.name}
                            description={item.webIdString}
                            numberOfFriends={item.numberOfFriends}
                            shareIconName="share"
                            shareAction={(e) => {
                              e.preventDefault();
                              toast.info(
                                "Route successfully shared with " + item.name,
                                {
                                  draggable: true,
                                  position: toast.POSITION.TOP_CENTER,
                                }
                              );
                              ShareWith(
                                routecache.default.getSelectedToShare(),
                                item.webIdString,
                                session.webId
                              );
                            }}
                          />
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>

            <div className="loginButton">
              <div className="dropdown shareList">
                <h1>>Share with Groups of friends</h1>
                <div className="dropdown-content shareContent">
                  <ul className="sectionFriends">
                    {groups.map((item, index) => {
                      console.log(item);
                      return (
                        <li
                          id={"friend" + index}
                          key={index}
                          className="liCard"
                        >
                          <CardLayout
                            image={"images/userPictureUndefined.png"}
                            header={item.name}
                            description={"Group of Friends"}
                            shareIconName="share"
                            shareAction={(e) => {
                              e.preventDefault();
                              toast.info(
                                "Route successfully shared with " + item.name,
                                {
                                  draggable: true,
                                  position: toast.POSITION.TOP_CENTER,
                                }
                              );
                              shareWithGroup(item);
                            }}
                          />
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ShareRoutePage;
