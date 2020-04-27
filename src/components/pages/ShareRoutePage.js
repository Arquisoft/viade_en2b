import React from "react";
import BurgerMenu from "../generic_components/BurgerMenu";
import CardLayout from "../generic_components/Card";
import * as cache from "caches/friendCache/FriendCache";
import * as routecache from "caches/routeCache/RouteCache";
import { ShareWith } from "ShareManager/ShareRoute";
import "../../assets/css/FriendList.css";

var friends = [];
const auth = require("solid-auth-client");
var session = "";

const ShareRoutePage = () => {
  friends = cache.default.getFriends();
  session = JSON.parse(localStorage.getItem("session"));
  return (
    <div className="bodyFriends" id="outer-container">
      <main>
        <BurgerMenu pageWrapId="page-wrap" container="outer-container" />
        <div className="App friends" id="page-wrap">
          <section className="sectionFriends">
            <ul className="friendContainer">
              {friends.map((item, index) => {
                return (
                  <li id={"friend" + index} key={index} className="liCard">
                    <CardLayout
                      image={item.profilePicture}
                      header={item.name}
                      description={item.webIdString}
                      externalLink={item.webIdString}
                      externalIconName="user"
                      numberOfFriends={item.numberOfFriends}
                      detailsClassName="linkRoute"
                      detailsLink="/routes"
                      detailsAction={(e) => {
                        e.preventDefault();
                        ShareWith(
                          routecache.default.getSelectedToShare(),
                          item.webIdString,
                          session.webId
                        );
                      }}
                      detailsIconName="info"
                    />
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ShareRoutePage;
