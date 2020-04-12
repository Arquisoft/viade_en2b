import React from "react";
import "assets/css/Routes.css";
import CustomLoader from "components/generic_components/CustomLoader";
import BurgerMenu from "../generic_components/BurgerMenu";
import SearchBar from "../generic_components/SearchBar";
import CardLayout from "../generic_components/Card";
import RouteDetails from "./RouteDetails";

import * as cache from "caches/routeCache/RouteCache";


class RoutesPage extends React.Component {

  constructor(props) {
    super(props);
  this.state = {
    loading: true,
    routes: "",
    search: "",
    showDetails: false
  };
  }
  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20) });
  }
  componentDidMount() {
    cache.default.getRoutes(this.handleSession).then(rutas => {
      this.setState({ loading: false, routes: rutas });
    });
    cache.default.setReload(false);
  }

  viewDetails(route){
    cache.default.setSelectedDetails(route);
    this.setState({
      showDetails: true
    })
  }

  getDetailsZone(){
    return <RouteDetails showUpload = {() => {this.setState({
      showDetails: !this.state.showDetails
    })
    }}/>
  }

    
  handleSession = () => {
    this.props.history.push("/login");
  }


  viewLoaded = routes => {
      let filteredRoutes = routes.filter(ruta => {
        return ruta.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
      }
    );
    return (

      <div className="bodyRoutes" id="outer-container">
                  {this.state.showDetails ? this.getDetailsZone(): null}

      <main>
          <BurgerMenu 
          pageWrapId="page-wrap"
          container="outer-container"
          />
        <div className="App routes" id="page-wrap">
          <header className="bodyHeader"></header>
          <section className="sectionRoutes">
            
            <SearchBar  value={this.state.search} 
                        action={this.updateSearch.bind(this)}
                        list="listRoute"
            />
            <ul className="listRoute">            
              {filteredRoutes.map((item, index)=>{
                return (
                  <li id={"route"+index} key={index} className="liCard">
                    <div className="routeListElementContainter">
                      <CardLayout
                        header={item.name}
                        image="images/daddy.png"
                        link = "/"
                        className="linkRoute"

                        description="Well, there should be a description..."
                        action={e=>{cache.default.setSelected(routes[index])}}
                        iconName="map"
                        detailsClassName="linkRoute"
                        detailsLink="/routes"

                        detailsAction={e=>{this.viewDetails(routes[index])}}
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
  }
  viewCharge = () => {
    return (
      <div className="bodyRoutes" id="outer-container">
        <CustomLoader />
      </div>
    );
  }
  render() {
    const { loading } = this.state;
    return (
      <React.Fragment>
        {loading ? <CustomLoader /> : this.viewLoaded(this.state.routes)}
      </React.Fragment>
    );
  }
}

export default RoutesPage;
