import React from "react";
import "assets/css/NotificationsPage.css";
import CustomLoader from "components/generic_components/CustomLoader";
import BurgerMenu from "../generic_components/BurgerMenu";
import { getNotificationDocuments } from "NotificationManager/NotificationManager";
class NotificationsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true, //now, in the future will be false
      routes: "",
      notifications: [],
    };
  }

  componentDidMount() {
    var session = JSON.parse(localStorage.getItem("session"));

    var webIdAuthor = session.webId.substring(0, session.webId.length - 16);
    var inbox = webIdAuthor + "/viade/inbox/";

    getNotificationDocuments(inbox, webIdAuthor).then((notifications) => {
      this.setState({ loading: false, notifications: notifications });
    });
  }

  viewLoaded = (notifications) => {
    /* function search(){
        var value = document.getElementById("myInput").value;
        routes = routes.filter(item=>
          item.name.search(value)<0
        );
      }
    */

    return (
      <div className="bodyRoutes" id="outer-container">
        <main>
          <BurgerMenu pageWrapId="page-wrap" container="outer-container" />
          <div className="App comments" id="page-wrap">
            <header className="bodyHeader"></header>
            <section className="sectionComments">
              <ul className="listComment">
                {notifications.map((item, index) => {
                  console.log(item);
                  return (
                    <li
                      id={"comment" + index}
                      key={index}
                      className="liComment"
                    >
                      <div className="sectionComment">
                        <div className="commentInfo">
                          <p className="header">
                            <i className="fa fas fa-bell"></i>
                            {item.authorName}
                          </p>
                          <p className="description">{item.message}</p>
                        </div>
                        <div className="delete">
                          <span>
                            <i className="fa fas fa-trash"></i>
                          </span>
                        </div>
                      </div>
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
  viewCharge = () => {
    return (
      <div className="bodyComments" id="outer-container">
        <CustomLoader />
      </div>
    );
  };
  render() {
    const { loading } = this.state;

    return (
      <React.Fragment>
        {loading ? <CustomLoader /> : this.viewLoaded(this.state.notifications)}
      </React.Fragment>
    );
  }
}

export default NotificationsPage;
