import React from "react";
import BurgerMenu from "../generic_components/BurgerMenu";
import CardLayout from "../generic_components/Card";
import CustomLoader from "components/generic_components/CustomLoader";
import GenericButton from "components/generic_components/GenericButton";
import * as cache from "caches/friendGroupCache/FriendGroupCache";
import friendmanager from "FriendGroupManager/FriendGroupManager";
import { HashRouter as Router, Link } from "react-router-dom";
import "../../assets/css/FriendListCache.css";
import data from "@solid/query-ldflex";

var friends = [];
class FriendGroupsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      groups: [],
    };
  }

  componentDidMount() {
    cache.default.getGroups(this.handleSession).then((groups) => {
      this.setState({ loading: false, groups: groups });
      cache.default.setGroups(groups);
    });
  }

  async selectDetails(e, group) {
    var group_final = [];
    group.users.map((item, index) => {
      var friend = { name: "", url: "", photo: "" };
      friend.url = item.url;

      group_final.push(friend);

      console.log("Pathetic");
      console.table(friend);
    });

    cache.default.setGroupSelected(group_final);
  }

  handleSession = () => {
    this.props.history.push("/login");
  };

  viewLoaded = (groups) => {
    console.log(groups);
    return (
      <div className="bodyFriends" id="outer-container">
        <main>
          <BurgerMenu pageWrapId="page-wrap" container="outer-container" />
          <div className="App friends" id="page-wrap">
            <div className="backList">
              <Router>
                <Link to="/creategroup">Create Group</Link>
              </Router>
            </div>
            <section className="sectionFriends">
              <h1>List of Groups</h1>
              <ul className="listgroups">
                {groups.map((item, index) => {
                  return (
                    <li id={"group" + index} key={index} className="liCard">
                      <CardLayout
                        header={item.name}
                        image="https://www.pngitem.com/pimgs/m/4-49786_people-people-icon-png-file-transparent-png.png"
                        link="/groupdetails"
                        className="linkRoute"
                        action={(e) => {
                          this.selectDetails(e, groups[index]);
                        }}
                        iconName="map"
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
  render() {
    const { loading } = this.state;
    return (
      <React.Fragment>
        {loading ? <CustomLoader /> : this.viewLoaded(this.state.groups)}
      </React.Fragment>
    );
  }
}
export default FriendGroupsPage;
/*
<Router>
                        <Link
                          className="buttonGroup"
                          onClick={(e) => {
                            this.selectDetails(e, groups[index]);
                          }}
                          to="/groupdetails"
                        >
                          {item.name}
                        </Link>
                      </Router>
*/
