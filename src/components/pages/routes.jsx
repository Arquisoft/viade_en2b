import React from 'react';

import '../../assets/css/routes.css';

import MainNavBar from '../generic_components/MainNavBar'; //Hamburger Menu???


const RoutesPage = () => {

  var frutas = ["Ruta1", "Ruta2","Ruta3","Ruta4"];
  
  return (
    <main>
    <div className="App">
      <MainNavBar companyName="VIADE"/>
      
        <header className="bodyHeader">
        </header>
        <body className="bodyRoutes">
            <form>
                <input />
            </form>
            <section className="sectionRoutes">
              <ul>
                  {
	                  frutas.map( (item, index) =>{
		                return(
			                  <li key={index}>
                          <div className="routeListElementContainter">
				                    <p> {item} nº {index+1} in the list</p>
                          </div>
			                  </li>
		                    )
	                  })
                 }
              </ul>     
            </section>
        </body> 
       </div>
     </main>
  );
};

export default RoutesPage;