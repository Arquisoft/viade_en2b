import React from "react";

import "../../assets/css/routes.css";

import MainNavBar from "../generic_components/MainNavBar"; //Hamburger Menu???
import BurgerMenu from '../generic_components/BurgerMenu';
const RoutesPage = () => {
  var frutas = ["Ruta1", "Ruta2", "Ruta3", "Ruta4"];

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
              {frutas.map((item, index) => {
                return (
                  <li key={index}>
                    <div className="routeListElementContainter">
                      <p>
                        {" "}
                        {item} nº {index + 1} in the list
                      </p>
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
};

export default RoutesPage;
