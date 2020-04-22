import React from "react";
import BurgerMenu from "../generic_components/BurgerMenu";
import CardLayout from "../generic_components/Card";
import CustomLoader from "components/generic_components/CustomLoader";
import * as cache from "caches/friendGroupCache/FriendGroupCache";
import friendmanager from "FriendGroupManager/FriendGroupManager";
import "../../assets/css/FriendList.css";

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
    });
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
            <section className="sectionFriends">
              <h1>{groups[0].name}</h1>
              <ul className="friendContainer">
                {groups.map((item, index) => {
                  return (
                    <li id={"group" + index} key={index} className="liCard">
                      {item.users[index].name}, {item.users[index].url}
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
