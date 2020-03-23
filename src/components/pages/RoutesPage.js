import React from "react";
import "../../assets/css/routes.css";

import BurgerMenu from '../generic_components/BurgerMenu';
//import RouteGateway from '../../data-access/gateways/RouteGateway'


import {HashRouter as Router, Link} from "react-router-dom";
//const gateway = new RouteGateway();

//var frutas = ["Route 1","Route 2","Route 3","Route 4"];

import * as cache from 'caches/routeCache/RouteCache'


class RoutesPage extends React.Component {

  constructor(props){
    super(props);
  
  this.state = {
    loading: true,
    routes: ""
  };
}

  componentDidMount() {
    cache.default.getRoutes(this.state.routes).then(rutas => {
      this.setState({ loading: false, routes: rutas });
    });

  }
  viewLoaded = routes =>{
    return(
      <div className="bodyRoutes" id="outer-container">
      <main>
          <BurgerMenu 
          pageWrapId="page-wrap"
          container="outer-container"
          />
        <div className="App routes" id="page-wrap">
          <header className="bodyHeader"></header>

          <section className="sectionRoutes">
            <div className="active-purple-3 active-purple-4 mb-4">
              <input
                className="form-control"
                type="text"
                placeholder="Search"
                aria-label="Search"
              />
            </div>
            <ul>
              {console.log(routes)}
              {routes.map((item, index)=>{
                return (
                  <li id={"route"+index} key={index}>
                    <div className="routeListElementContainter">
                      <Router>
                        <Link className="linkRoute" to="/"
                        onClick={e=>{cache.default.getSelected(routes[index])}}
                        >
                          Ruta {item.name}
                        </Link>
                      </Router>
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
  render(){
    const {loading} = this.state;
  //  loader.loadUserRoutesFiles();
 //   var nullableRutas = localStorage.getItem('rutas');
 //   if(nullableRutas!=null)
 //     rutas = JSON.parse(nullableRutas);
    return ( 
      <React.Fragment>
        {loading ? "Loading..." : this.viewLoaded(this.state.routes)}
      </React.Fragment>
  );
}
}

export default RoutesPage;
