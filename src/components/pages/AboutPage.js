import React from "react";
import "assets/css/About.css";
import CustomLoader from 'components/generic_components/CustomLoader';
import BurgerMenu from 'components/generic_components/BurgerMenu';
import CardLayout from 'components/generic_components/Card';

class AboutPage extends React.Component {
  
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
      image: 'images/developers/andres.png',
      name: "Andrés",
      meta: "Back-end",
      description: "Andrés pretty much carried the team through the early parts of thinking about implementing SOLID. He's the one that focused the most on following the specifications we had to, and reprimanded us when we were straying from the righteous path. Also, he had the idea for the logo. It's a good logo.",
      link: "mailto:UO264345@uniovi.es",
      numberOfFriends: ""
    }, {
      image: 'images/developers/fernando.jpg',
      name: "Fernando",
      meta: "UI & UX designer",
      description: "Fernando has programmed in 15+ different programming languages. He has yet to make something useful. In the repo, he's somehow deleted more than 25,000 lines of code, and added around 12,000. At least the app's pretty, he thinks.",
      link: "mailto:UO266754@uniovi.es",
      numberOfFriends: ""
    }, {
      image: 'images/developers/guillermo.png',
      name: "Guillermo",
      meta: "Page and view designer",
      description: "Guille started learning react like a champ from day zero. He's got the better understanding of the mess that is working with react. If you don't know why your view isn't updating, he's probably your guy.",
      link: "mailto:UO264207@uniovi.es",
      numberOfFriends: ""
    }, {
      image: 'images/developers/miguel.png',
      name: "Miguel",
      meta: "Back-end",
      description: "Fueling himself with caffeine, Miguel has tried (and succeded) to crack the hardest problems we faced on the back-end. Mainly, to get it working. At least sometimes. He's responsible for the upcoming feature of recording real-time routes. That's dedication.",
      link: "mailto:UO258629@uniovi.es",
      numberOfFriends: ""
    }, {
      image: 'images/developers/violeta.png',
      name: "Violeta",
      meta: "Back-end",
      description: "Violeta is the quietest member of the group, but she does the work she's got like anybody else. Mainly, this work has been route listing and some testing that you don't get to see. Maybe she's too busy thinking about the code to talk. Or could it be puppies?",
      link: "mailto:UO258454@uniovi.es",
      numberOfFriends: ""
    }, {
      image: 'images/developers/clara.png',
      name: "Clara",
      meta: "Back-end",
      description: "Clara is the one to thank for when you're logging in, sharing your routes or commenting on other people's shared routes. Basically, thank her if you have any friends using this app with you.",
      link: "mailto:UO264958@uniovi.es",
      numberOfFriends: ""
    }, {
      image: 'images/developers/alejandro.png',
      name: "Alejandro",
      meta: "User interaction",
      description: "He may seem jovial at first, but be sure to not touch Alex's buttons. Or do, if you want to use ViaDe. He's somehow responsible for most of them. The expanding, floating button, the hamburguer menu... Great, now I'm hungry.",
      link: "mailto:UO264255@uniovi.es",
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
                       externalLink = {item.link}
                       externalIconName='mail'
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

export default AboutPage;
