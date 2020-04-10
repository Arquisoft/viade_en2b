import React from "react";
import MyTab  from '../generic_components/MyTab';
import CustomLoader from 'components/generic_components/CustomLoader';
import * as cache from 'caches/routeCache/RouteCache'

import "../../assets/css/RouteDetails.css";

class RouteDetails extends React.Component {
    state = {
        loading: true,
        details: ""
    }

    
  componentWillMount(){
      document.addEventListener('mousedown',this.handleClick, false);
  }

  componentWillUnmount(){
    document.removeEventListener('mousedown', this.handleClick, false);
  }
  handleClick =(e)=>{
    if(this.node.contains(e.target)){
      return;
    }

    this.props.showUpload();
    
  }
    handleSession = () => {
        this.props.history.push('/login');
    }

  componentDidMount() {
    let detail = cache.default.getSelectedDetails();
    this.setState({ loading: false, details: detail });
  };

    viewLoaded = (detail) => {
        return(
            <div ref = {node => this.node = node} className = "routeDetails">
                <div className = "DetailsZone">
                    <h2>{detail.name}</h2>
                    <MyTab route = {detail}/>  
                </div>
            </div>
        );
    }
  render(){
    const {loading} = this.state;
    return(
      <React.Fragment>
        {loading ? <CustomLoader/> : this.viewLoaded(this.state.details)}
      </React.Fragment>    
      );
    }
}

export default RouteDetails;
