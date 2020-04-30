import React from "react";
import "assets/css/Routes.css";
import CustomLoader from "components/generic_components/CustomLoader";
import BurgerMenu from "../generic_components/BurgerMenu";
import SearchBar from "../generic_components/SearchBar";
import CardLayout from "../generic_components/Card";
import RouteDetails from "./RouteDetails";
import { HashRouter as Router, Link } from "react-router-dom";
import { Icon, Card, Image, Popup } from "semantic-ui-react";
import * as cache from "caches/routeCache/RouteCache";
import { sharedRoutesList } from "ShareManager/RetrieveRoute";

class RoutesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      routes: "",
      sharedRoutes: "",
      search: "",
      showDetails: false,
    };
  }

  urls = [];
  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20) });
  }
  componentDidMount() {
    cache.default.getRoutes(this.handleSession).then((rutas) => {
      this.setState({ loading: true, routes: rutas });

      var session = JSON.parse(localStorage.getItem("session"));
      var path =
        session.webId.substring(0, session.webId.length - 16) +
        "/viade/shared/";

      sharedRoutesList(path).then((rutas) => {
        cache.default.getSharedRoutes().then((routes) => {
          /*var fullroutes = this.state.routes;
          console.table("FULLROUYTES");
          console.table(fullroutes);
          fullroutes = [...fullroutes, ...routes];
          console.table("FULLROUYTES");
          console.table(fullroutes);
*/
          this.setState({ loading: false, sharedRoutes: routes });
        });
      });
    });

    cache.default.setReload(false);
    this.urls = JSON.parse(localStorage.getItem("urls"));
    console.log(this.urls);
  }

  viewDetails(route) {
    cache.default.setSelectedDetails(route);
    this.setState({
      showDetails: true,
    });
  }

  getDetailsZone() {
    return (
      <RouteDetails
        showUpload={() => {
          this.setState({
            showDetails: !this.state.showDetails,
          });
        }}
      />
    );
  }

  handleSession = () => {
    this.props.history.push("/login");
  };

  viewLoaded = (routes, sharedRoutes) => {
    console.log("AQIOOOOOOOOO");
    console.table(routes);
    let filteredRoutes = routes.filter((ruta) => {
      console.log(ruta);
      return (
        ruta.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
      );
    });
    let filteredSharedRoutes = sharedRoutes.filter((ruta) => {
      console.log(ruta);
      return (
        ruta.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
      );
    });
    return (
      <div className="bodyRoutes" id="outer-container">
        {this.state.showDetails ? this.getDetailsZone() : null}

        <main>
          <BurgerMenu pageWrapId="page-wrap" container="outer-container" />
          <div className="App routes" id="page-wrap">
            <header className="bodyHeader"></header>
            <section className="sectionRoutes">
              <SearchBar
                value={this.state.search}
                action={this.updateSearch.bind(this)}
                list="listRoute"
              />
              <h1>My routes</h1>
              <ul className="listRoute">
                {filteredRoutes.map((item, index) => {
                  return (
                    <li id={"route" + index} key={index} className="liCard">
                      <div className="routeListElementContainter">
                        <CardLayout
                          header={item.name}
                          image="images/daddy.png"
                          link="/"
                          className="linkRoute"
                          description={item.description}
                          action={(e) => {
                            cache.default.setSelected(routes[index]);
                          }}
                          iconName="map"
                          detailsClassName="linkRoute"
                          detailsLink="/routes"
                          detailsAction={(e) => {
                            this.viewDetails(routes[index]);
                          }}
                          detailsIconName="info"
                          shareIconName="share"
                          shareAction={(e) => {
                            cache.default.setSelectedToShare(this.urls[index]);
                          }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
              <h1>Shared routes</h1>
              <ul className="listRoute">
                {filteredSharedRoutes.map((item, index) => {
                  return (
                    <li id={"route" + index} key={index} className="liCard">
                      <div className="routeListElementContainter">
                        <CardLayout
                          header={item.name}
                          image="images/daddy.png"
                          link="/"
                          className="linkRoute"
                          description={item.description}
                          action={(e) => {
                            cache.default.setSelected(routes[index]);
                          }}
                          iconName="map"
                          detailsClassName="linkRoute"
                          detailsLink="/routes"
                          detailsAction={(e) => {
                            this.viewDetails(routes[index]);
                          }}
                          detailsIconName="info"
                        />
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
      <div className="bodyRoutes" id="outer-container">
        <CustomLoader />
      </div>
    );
  };
  render() {
    const { loading } = this.state;
    return (
      <React.Fragment>
        {loading ? (
          <CustomLoader />
        ) : (
          this.viewLoaded(this.state.routes, this.state.sharedRoutes)
        )}
      </React.Fragment>
    );
  }
}

export default RoutesPage;
