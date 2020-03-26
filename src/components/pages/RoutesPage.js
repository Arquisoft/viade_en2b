import React from "react";
import "../../assets/css/routes.css";
import CustomLoader from 'components/generic_components/CustomLoader';
import BurgerMenu from '../generic_components/BurgerMenu';
//import RouteGateway from '../../data-access/gateways/RouteGateway'
import SearchBar from '../generic_components/SearchBar';
import CardLayout from '../generic_components/Card';

import { withRouter } from "react-router-dom";

//const gateway = new RouteGateway();

//var frutas = ["Route 1","Route 2","Route 3","Route 4"];

import * as cache from 'caches/routeCache/RouteCache'


class RoutesPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      routes: "",
      search: ''
    };
  }
  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20) });
  }
  componentDidMount() {
    cache.default.getRoutes(this.handleClick).then(rutas => {
      this.setState({ loading: false, routes: rutas });
    });
  }
    
  handleClick = () => {
    this.props.history.push("/login");
  }

  viewLoaded = routes => {
    /* function search(){
         var value = document.getElementById("myInput").value;
         routes = routes.filter(item=>
           item.name.search(value)<0
         );
       }
     */
    let filteredRoutes = routes.filter(ruta => {
      return ruta.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
    }
    );
    return (

      <div className="bodyRoutes" id="outer-container">
        <main>
          <BurgerMenu
            pageWrapId="page-wrap"
            container="outer-container"
          />
          <div className="App routes" id="page-wrap">
            <header className="bodyHeader"></header>
            <section className="sectionRoutes">

              <SearchBar value={this.state.search}
                action={this.updateSearch.bind(this)}
                list="listRoute"
              />
              <ul className="listRoute">
                {filteredRoutes.map((item, index) => {
                  return (
                    <li id={"route" + index} key={index} className="liRoute">
                      <div className="routeListElementContainter">
                        <CardLayout
                          header={item.name}
                          image="/images/daddy.png"
                          link="/"
                          className="linkRoute"
                          description="Well, it should be a description..."
                          action={e => { cache.default.setSelected(routes[index]) }}
                          iconName='send'
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
    //  loader.loadUserRoutesFiles();
    //   var nullableRutas = localStorage.getItem('rutas');
    //   if(nullableRutas!=null)
    //     rutas = JSON.parse(nullableRutas);
    return (
      <React.Fragment>
        {loading ? <CustomLoader /> : this.viewLoaded(this.state.routes)}
      </React.Fragment>
    );
  }
}

export default withRouter(RoutesPage);
