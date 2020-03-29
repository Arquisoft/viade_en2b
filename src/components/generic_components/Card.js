import React, {Component} from 'react'
import { Icon, Card, Image } from 'semantic-ui-react'
import {HashRouter as Router, Link} from "react-router-dom";

class CardLayout extends Component{
  render(){
      return(
        <div>
            <Card>
                <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/semantic-ui@2.4.1/dist/semantic.min.css'/>
                <Image src={this.props.image} size= "medium"/>
                <Card.Content>
                    <Card.Header>{this.props.header}</Card.Header>
                    <Card.Meta>
                        <span className='date'>{this.props.date}</span>
                    </Card.Meta>
                    <Card.Description>{this.props.description}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                <Router>
                    <Link className={this.props.classLink} 
                          to={this.props.link}
                          onClick={this.props.action}
                    >
                        <Icon name={this.props.iconName} />
                        {this.props.numberOfFriends}
                    </Link>
                </Router>
                </Card.Content>
            </Card>
        </div>
        );
    }
}

export default CardLayout;