import React, { Component } from "react";
import { Icon, Card, Image, Popup } from "semantic-ui-react";
import { HashRouter as Router, Link } from "react-router-dom";
import "assets/css/Card.css";

class CardLayout extends Component {
  render() {
    let linkHide = this.props.link === undefined;
    let externalHide = this.props.externalLink === undefined;
    let detailsHide = this.props.detailsLink === undefined;
    let shareHide = this.props.shareIconName === undefined;
    return (
      <div>
        <Card className="claim_Card">
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.1/dist/semantic.min.css"
          />
          <Image className="ui medium image" src={this.props.image} />
          <Card.Content>
            <Card.Header>{this.props.header}</Card.Header>
            <Card.Meta>
              <span className="date">{this.props.date}</span>
            </Card.Meta>
            <Card.Description>{this.props.description}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Router>
              <Link
                className={this.props.classLink}
                hidden={linkHide}
                to={this.props.link}
                onClick={this.props.action}
              >
                <Popup
                  trigger={<Icon name={this.props.iconName} />}
                  mouseEnterDelay={250}
                  content="Show route in map"
                  position="bottom center"
                />
              </Link>

              <a
                className={this.props.externalClassName}
                hidden={externalHide}
                target="_blank"
                rel="noopener noreferrer"
                href={this.props.externalLink}
                onClick={this.props.externalAction}
              >
                <Popup
                  trigger={<Icon name={this.props.externalIconName} />}
                  mouseEnterDelay={250}
                  content="Contact email"
                  position="bottom center"
                />
              </a>

              <Link
                className={this.props.detailsClassName}
                hidden={detailsHide}
                to={this.props.detailsLink}
                onClick={this.props.detailsAction}
              >
                <Popup
                  trigger={<Icon name={this.props.detailsIconName} />}
                  mouseEnterDelay={250}
                  content="Shows the messages and multimedia of the route"
                  position="bottom center"
                />
              </Link>
              <Link
                className="linkRoute"
                hidden={shareHide}
                to="/shareroute"
                onClick={this.props.shareAction}
              >
                <Popup
                  trigger={<Icon name={this.props.shareIconName} />}
                  mouseEnterDelay={250}
                  content="Share the route with with friends"
                  position="bottom center"
                />
              </Link>
            </Router>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default CardLayout;
