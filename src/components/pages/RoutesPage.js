import React from "react";
import "../../assets/css/routes.css";

import BurgerMenu from '../generic_components/BurgerMenu';
//import RouteGateway from '../../data-access/gateways/RouteGateway'


import {HashRouter as Router, Link} from "react-router-dom";
//const gateway = new RouteGateway();

import RoutesLoader from '../../RouteManager/ListUserRoutes'

//var frutas = ["Route 1","Route 2","Route 3","Route 4"];




class RoutesPage extends React.Component {

  render(){
    var loader = new RoutesLoader();
    var rutas;
    if(this.props.defaultRuta!=null)
      rutas=this.props.defaultRuta;
    else
      rutas = [];
    loader.loadUserRoutesFiles();
    var nullableRutas = localStorage.getItem('rutas');
    if(nullableRutas!=null)
      rutas = JSON.parse(nullableRutas);
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
            <div className="active-purple-3 active-purple-4 mb-4">
              <input
                className="form-control"
                type="text"
                placeholder="Search"
                aria-label="Search"
              />
            </div>
            <ul>
              {rutas.map((item, index)=>{
                return (
                  <li id={"route"+index} key={index}>
                    <div className="routeListElementContainter">
                      <Router>
                        <Link className="linkRoute" to="/"
                        onClick={e=>{localStorage.setItem('route',JSON.stringify(rutas[index]))}}
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
}

export default RoutesPage;
