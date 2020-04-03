import React from 'react'
import BurgerMenu from '../generic_components/BurgerMenu';
import CardLayout from '../generic_components/Card';

import "../../assets/css/FriendList.css";


class FriendsPage extends React.Component {
  render(){

    let friends = [{
      image: 'images/roberto.png',
      name: "Alejandro",
      date: "Joined some day",
      description: "Testing the props and all stuff",
      link: "/login",
      numberOfFriends: "0"
    }, {
      image: 'images/roberto.png',
      name: "Alejandro",
      date: "Joined some day",
      description: "Testing the props and all stuff",
      link: "/login", 
      numberOfFriends: "0"
    }, {
      image: 'images/roberto.png',
      name: "Alejandro",
      date: "Joined some day",
      description: "Testing the props and all stuff",
      link: "/login",
      numberOfFriends: "0"
    }, {
      image: 'images/roberto.png',
      name: "Alejandro",
      date: "Joined some day",
      description: "Testing the props and all stuff",
      link: "/login",
      numberOfFriends: "0"
    }, {
      image: 'images/roberto.png',
      name: "Alejandro",
      date: "Joined some day",
      description: "Testing the props and all stuff",
      link: "/login",
      numberOfFriends: "0"
    } , {
      image: 'images/roberto.png',
      name: "Alejandro",
      date: "Joined some day",
      description: "Testing the props and all stuff",
      link: "/login",
      numberOfFriends: "0"
    }, {
      image: 'images/roberto.png',
      name: "Alejandro",
      date: "Joined some day",
      description: "Testing the props and all stuff",
      link: "/login",
      numberOfFriends: "0"
    }, {
      image: 'images/roberto.png',
      name: "Alejandro",
      date: "Joined some day",
      description: "Testing the props and all stuff",
      link: "/login",
      numberOfFriends: "0"
    }, {
      image: 'images/roberto.png',
      name: "Alejandro",
      date: "Joined some day",
      description: "Testing the props and all stuff",
      link: "/login", 
      numberOfFriends: "0"
    }, {
      image: 'images/roberto.png',
      name: "Alejandro",
      date: "Joined some day",
      description: "Testing the props and all stuff",
      link: "/login", 
      numberOfFriends: "0"
    }]

    return (
        <div className="bodyFriends" id="outer-container">
      <main>
          <BurgerMenu 
          pageWrapId="page-wrap"
          container="outer-container"
          />
        <div className="App routes" id="page-wrap">
        <section className="sectionFriends">
        <ul className = "friendContainer">
         {friends.map((item, index)=>{
                return (
                  <li id={"route"+index} key={index} className = "liCard">
                    <CardLayout
                    image = {item.image}
                    header = {item.name}
                    date = {item.date}
                    description = {item.description}
                    link = {item.link}
                    numberOfFriends = {item.numberOfFriends}
                    iconName='user'
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
}

export default FriendsPage;
