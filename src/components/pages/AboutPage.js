import React from "react";
import "assets/css/About.css";
import CustomLoader from 'components/generic_components/CustomLoader';
import BurgerMenu from 'components/generic_components/BurgerMenu';
import CardLayout from 'components/generic_components/Card';


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
    let developers = [
    {
      image: 'http://localhost:3000/viade_en2b/images/developers/miguel.png',
      name: "Andrés",
      meta: "Position",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget porta est. Morbi egestas, dui nec gravida ornare, purus turpis rutrum tortor, quis sollicitudin neque diam ut erat. Duis vehicula consequat accumsan.",
      link: "",
      numberOfFriends: ""
    }, {
      image: 'http://localhost:3000/viade_en2b/images/developers/fernando.jpg',
      name: "Fernando",
      meta: "UI and UX",
      description: "Fernando has programmed in 15+ different programming languages. He has yet to make something useful.",
      link: "mailto:UO266754@uniovi.es",
      numberOfFriends: ""
    }, {
      image: 'http://localhost:3000/viade_en2b/images/developers/guillermo.png',
      name: "Guille",
      meta: "Position",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget porta est. Morbi egestas, dui nec gravida ornare, purus turpis rutrum tortor, quis sollicitudin neque diam ut erat. Duis vehicula consequat accumsan.",
      link: "mailto:",
      numberOfFriends: ""
    }, {
      image: 'http://localhost:3000/viade_en2b/images/developers/miguel.png',
      name: "Miguel",
      meta: "Position",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget porta est. Morbi egestas, dui nec gravida ornare, purus turpis rutrum tortor, quis sollicitudin neque diam ut erat. Duis vehicula consequat accumsan.",
      link: "mailto:",
      numberOfFriends: ""
    }, {
      image: 'http://localhost:3000/viade_en2b/images/developers/miguel.png',
      name: "Violeta",
      meta: "Position",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget porta est. Morbi egestas, dui nec gravida ornare, purus turpis rutrum tortor, quis sollicitudin neque diam ut erat. Duis vehicula consequat accumsan.",
      link: "mailto:",
      numberOfFriends: ""
    }, {
      image: 'http://localhost:3000/viade_en2b/images/developers/miguel.png',
      name: "Clara",
      meta: "Position",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget porta est. Morbi egestas, dui nec gravida ornare, purus turpis rutrum tortor, quis sollicitudin neque diam ut erat. Duis vehicula consequat accumsan.",
      link: "mailto:",
      numberOfFriends: ""
    }, {
      image: 'http://localhost:3000/viade_en2b/images/developers/miguel.png',
      name: "Alejandro",
      meta: "Position",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget porta est. Morbi egestas, dui nec gravida ornare, purus turpis rutrum tortor, quis sollicitudin neque diam ut erat. Duis vehicula consequat accumsan.",
      link: "mailto:",
      numberOfFriends: ""
    }, ];
    
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
          </section>
          <section className="sectionDevelopers">
            <ul className = "developerContainer">
            {developers.map((item, index)=>{
                   return (
                     <li id={"developer"+index} key={index} className = "liCard">
                       <CardLayout
                       image = {item.image}
                       header = {item.name}
                       date = {item.meta}
                       description = {item.description}
                       link = {item.link}
                       iconName='mail'
                       />
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
