import React from "react";
import "../../assets/css/routes.css";

import BurgerMenu from '../generic_components/BurgerMenu';
import RouteGateway from '../../data-access/gateways/RouteGateway'
const gateway = new RouteGateway();



var frutas = ["Route 1","Route 2","Route 3","Route 4"];


import Route from '../../Entities/Route';

import {Link} from "react-router-dom";

import BurgerMenu from '../generic_components/BurgerMenu';
class RoutesPage extends React.Component {
  render(){

    var route = new Route('nombreRuta','itinerario');

    var routes = [];

    routes.push(route)

    var sd = localStorage.getItem('md');
    console.log(sd);


  var frutas = ["Ruta1", "Ruta2", "Ruta3", "Ruta4"];
  window.value  = 3;
  return (
    <body className="bodyRoutes" id="outer-container">
      <main>
          <BurgerMenu 
          pageWrapId="page-wrap"
          container="outer-container"
          />
        <div className="App routes" id="page-wrap">
          <header className="bodyHeader"></header>

          <section className="sectionRoutes">
            <div class="active-purple-3 active-purple-4 mb-4">
              <input
                class="form-control"
                type="text"
                placeholder="Search"
                aria-label="Search"
              />
            </div>
            <ul>
              {routes.map((item, index) => {
                return (
                  <li key={index}>
                    <div className="routeListElementContainter">
                      <Link className="linkRoute" to="/"
                       onClick={localStorage.setItem('route',JSON.stringify(item))
                      }>
                        {item.name} nº {index + 1} in the list
                      </Link>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </main>
    </body>
  );
}
}

export default RoutesPage;
