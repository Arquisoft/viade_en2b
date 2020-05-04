import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import * as gateway from '../../data-access/gateways/CommentsGateway'
import Comment from '../../Entities/Comment'
import * as cache from 'caches/routeCache/RouteCache'


class MyForm extends Component {
  state = {message: ""}

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const {message} = this.state

    //Create the comment.
    let author = JSON.parse(localStorage.getItem("session")).webId;
    let url = cache.default.getSelectedDetails().commentsUrl;
    var comment = new Comment(url, message, author, "");

    gateway.postCommentInRoute(url, comment, () =>{})
    //Reset the text area
    this.setState({message: ''});
  }

  render() {
    const {message} = this.state

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.TextArea
              placeholder='Type your message here!'
              name='message'
              value={message}
              onChange={this.handleChange}
            />
            <Form.Button content='Submit' />
          </Form.Group>
        </Form>
      </div>
    )
  }
}

export default MyForm;
