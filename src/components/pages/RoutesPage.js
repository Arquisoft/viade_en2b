import React from "react";
import "assets/css/Routes.css";
import CustomLoader from 'components/generic_components/CustomLoader';
import BurgerMenu from '../generic_components/BurgerMenu';
import SearchBar from '../generic_components/SearchBar';
import CardLayout from '../generic_components/Card';

import cache from 'caches/routeCache/RouteCache';


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
    cache.getRoutes(this.handleSession).then(rutas => {
      this.setState({ loading: false, routes: rutas });
    });
  }
    
  handleSession = () => {
    this.props.history.push('/login');
  }

  viewLoaded = routes => {
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
                          action={e => { cache.setSelected(routes[index]) }}
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
    return (
      <React.Fragment>
        {loading ? <CustomLoader /> : this.viewLoaded(this.state.routes)}
      </React.Fragment>
    );
  }
}

export default RoutesPage;
