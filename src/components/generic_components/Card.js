import React, {Component} from 'react'
import { Icon, Card, Image } from 'semantic-ui-react'

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
                <a href={this.props.link}>
                    <Icon name='user' />
                    {this.props.numberOfFriends}
                </a>
                </Card.Content>
            </Card>
        </div>
        );
    }
}

export default CardLayout;