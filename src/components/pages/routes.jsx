import React from "react";

import "../../assets/css/routes.css";
import Route from "../../Entities/BasicRoute"


import BurgerMenu from '../generic_components/BurgerMenu';
const auth = require('solid-auth-client')
const FC   = require('solid-file-client')
const fc   = new FC( auth )
async function loadUserRoutes(){

    let session = await auth.currentSession();
    let popupUri = 'https://solid.community/common/popup.html';
    if (!session || session.webId===undefined || session.webId===null)
        session = await auth.popupLogin({ popupUri });
    alert('Logged in as '+session.webId);
    let routesFolder =  session.webId.substring(0,session.webId.length-16)+"/public/Routes/";

    if( await fc.itemExists(routesFolder) ){
        console.log(routesFolder+" exists");
        try {
            let content = await fc.readFolder( routesFolder );

            let files = content.files;

            for(let i=0;i<files.length;i++){
                let fileContent = await fc.readFile(files[i].url);
                console.log(fileContent);

            }



        }
        catch(error) {
            console.log("The folder couldn't be read")
            console.log( error )         // A full error response
            console.log( error.status )  // Just the status code of the error
            console.log( error.message ) // Just the status code and statusText
        }


    }else{
        console.log("user has no routes directory")
    }

}
loadUserRoutes();
const RoutesPage = () => {
  var frutas = ['Route 1','Route 2']

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
