import React from "react";
import "assets/css/NotificationsPage.css";
import CustomLoader from 'components/generic_components/CustomLoader';
import BurgerMenu from '../generic_components/BurgerMenu';


class NotificationsPage extends React.Component {

  constructor(props){
    super(props);
  
  this.state = {
    loading: false, //now, in the future will be false
    routes: "",
    comments:  [{
      title: "Perhaps...",
      text: "This is a comment, maybe, may, well..."
  }]
  };
}
  comments = [{
      title: "Perhaps...",
      text: "This is a comment, maybe, may, well..."
  },{
      title:"Well",
      text: "This is another comment"
  }];
  
 // componentDidMount() {
    //cache.default.getRoutes().then(rutas => {
   //   this.setState({ loading: false, comments: rutas });
   // });
        
 // }

  viewLoaded = comments =>{
   /* function search(){
        var value = document.getElementById("myInput").value;
        routes = routes.filter(item=>
          item.name.search(value)<0
        );
      }
    */

    return(
      
      <div className="bodyRoutes" id="outer-container">
      <main>
          <BurgerMenu 
          pageWrapId="page-wrap"
          container="outer-container"
          />
        <div className="App comments" id="page-wrap">
          <header className="bodyHeader"></header>
          <section className="sectionComments">
            <ul className="listComment">
              {comments.map((item, index)=>{
                return (
                  <li id={"comment"+index} key={index} className="liComment">
                    <div className="sectionComment">
                        <div className="commentInfo">
                            <p className="header"><i className="fa fas fa-bell"></i>{ item.title}</p>
                            <p className="description">{item.text}</p>
                        </div>
                        <div className="delete">
                            <span><i className="fa fas fa-trash"></i></span>
                        </div>
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
  viewCharge = ()=>{
    return(
      <div className="bodyComments" id="outer-container">
        <CustomLoader/>
       </div>
    );
  }
  render(){
    //const {loading} = this.state;

    return ( 
      <React.Fragment>
        {//loading ? <CustomLoader/> : this.viewLoaded(this.state.comments)
        }
        {this.viewLoaded(this.comments)}
      </React.Fragment>
  );
}
}

export default NotificationsPage;
