import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import addComment from '../../CommentsManager/AddComment'
import Comment from '../../Entities/Comment'

class MyForm extends Component {
  state = {message: ""}

create_UUID() {
    var dt = new Date().getTime();
    var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
    return uuid;
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const {message} = this.state

    //Create the comment.
    let author = JSON.parse(localStorage.getItem("session")).webId;
    let url = author.toString().substring(0, author.toString().length-16) + "/viade/comments/" + this.create_UUID();
    var date = new Date();
    var stringDate = date.toDateString() + ", " + date.getHours() + ":" + date.getMinutes()
    var comment = new Comment(url, message, author, stringDate);

    console.log(comment)
    addComment(url, message, () =>{})
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
