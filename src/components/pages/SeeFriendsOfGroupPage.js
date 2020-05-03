import React from "react";
import BurgerMenu from "../generic_components/BurgerMenu";
import CardLayout from "../generic_components/Card";
import CustomLoader from "components/generic_components/CustomLoader";
import * as cache from "caches/friendGroupCache/FriendGroupCache";
import * as friendcache from "caches/friendCache/FriendCache";
import { HashRouter as Router, Link } from "react-router-dom";
import "../../assets/css/FriendListCache.css";
var friends = [];
class FriendGroupsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      group: { users: [{ name: "", url: "" }] },
      friends: [],
    };
  }

  componentDidMount() {
    friends = friendcache.default.getFriends();

    cache.default.getGroupSelected(this.handleSession).then((group) => {
      this.setState({ loading: false, group: group });
    });
  }

  handleSession = () => {
    this.props.history.push("/login");
  };

  viewLoaded = (group) => {
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
              <h1>List of Members of Group:</h1>
              <ul className="listgroups">
                {friends.map((item, index) => {
                  if (group.some((i) => i.url === item.webIdString)) {
                    return (
                      <li id={"group" + index} key={index} className="liCard">
                        <CardLayout
                          image={item.profilePicture}
                          header={item.name}
                          description={item.webIdString}
                          externalLink={item.webIdString}
                          externalIconName="user"
                          externalPopupContent="Go to profile"
                        />
                      </li>
                    );
                  }
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
        {loading ? <CustomLoader /> : this.viewLoaded(this.state.group)}
      </React.Fragment>
    );
  }
}
export default FriendGroupsPage;
