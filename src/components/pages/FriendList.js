import React from 'react'
import BurgerMenu from '../generic_components/BurgerMenu';
import CardLayout from '../generic_components/Card';
import * as cache from 'caches/friendCache/FriendCache';

import "../../assets/css/FriendList.css";

var friends = [];

const FriendsPage = () => {

  friends = cache.default.getFriends();

      return (
          <div className="bodyFriends" id="outer-container">
        <main>
            <BurgerMenu 
            pageWrapId="page-wrap"
            container="outer-container"
            />
          <div className="App friends" id="page-wrap">
          <section className="sectionFriends"> 
          <ul className = "friendContainer">
          {friends.map((item, index)=>{
                  return (
                    <li id={"friend"+index} key={index} className = "liCard">
                      <CardLayout
                      image = {item.profilePicture}
                      header = {item.name}
                      description = {item.webIdString}
                      externalLink = {item.webIdString}
                      externalIconName='user'
                      numberOfFriends={item.numberOfFriends}
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
}

export default FriendsPage;
