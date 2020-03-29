import React from "react";
import "assets/css/About.css";
import CustomLoader from 'components/generic_components/CustomLoader';
import BurgerMenu from 'components/generic_components/BurgerMenu';
import SearchBar from 'components/generic_components/SearchBar';


class RoutesPage extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      loading: true,
    };
  }
  
  componentDidMount() {
      this.setState({ loading: false });
  }
  
  viewLoaded() {
    return(
    <div className="bodyAbout" id="outer-container">
      <main>
          <BurgerMenu 
          pageWrapId="page-wrap"
          container="outer-container"
          />
        <div className="App about" id="page-wrap">
          <header className="bodyHeader"></header>
          <section className="sectionViade">
            <h2>ViaDe</h2>
            <p>Do you walk? Run? Bike? With ViaDe, you'll be able to create, manage, and share routes you take with your friends! Login credentials and data retrieval is done using Solid, an industry-leading technology backed by the creator of the World Wide Web himself, Tim Berners-Lee.</p>
            <p>En2B is a group of Computer Engineering students from Asturias, Spain. We're really excited to bring the world our web application, made with lots of effort and love.</p>
          
            <div className="divMembers">
              <ul className="listMembers">
                <li className="memberCard">
                  <h3 className="name">Fernando</h3>
                  <img src="images/daddy.png" alt="Fernando's face"/>
                  <p>Fernando is the one writing this page. Thank you Fernando!</p>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </main>
    </div>
    );
  }

  viewCharge = ()=>{
    return(
      <div className="bodyAbout" id="outer-container">
        <CustomLoader/>
      </div>
    );
  }

  render()
  {
    const {loading} = this.state;

    return ( 
      <React.Fragment>
        {loading ? <CustomLoader/> : this.viewLoaded()}
      </React.Fragment>
    );
  }
}

export default RoutesPage;
