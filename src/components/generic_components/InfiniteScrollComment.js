import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {Comment} from 'semantic-ui-react';
import '../../assets/css/commentsContainer.css';
import MyForm  from '../generic_components/MyForm';

class MyCommentInfiniteScroll extends React.Component {
  state = {
    items: this.props.content.slice(0, 20),
    array_index: 20,
    hasMore: true,
  };


  fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      this.setState({
        items: this.state.items.concat(
          this.props.content.slice(
            this.state.array_index,
            this.state.array_index + 20
          )
        ),
        array_index: this.state.array_index + 20,
      });
    }, 100);
    if (this.props.content.length <= this.state.array_index) {
      this.setState({
        hasMore: false,
      });
    }
  };
  
  viewLoaded = (items) => {
    return(
      <div>
        <InfiniteScroll
          dataLength={items.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          scrollableTarget={this.props.scrollParent}
        >
          <Comment.Group>
            <link
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css"
            />
            {items.map((i, index) => (
              <div className="commentsContainer" key={index}>
                <Comment>
                  <Comment.Content>
                    <Comment.Author as = 'span'>{ i.jsonComment.author.substring(8, i.jsonComment.author.length - 1)
                        .split('.')[0]}</Comment.Author>
                    <Comment.Metadata>
                      <div>{i.jsonComment.dateCreated}</div>
                    </Comment.Metadata>
                    <Comment.Text>{i.jsonComment.text}</Comment.Text>
                  </Comment.Content>
                </Comment>
              </div>
            ))}
          </Comment.Group>
        </InfiniteScroll>
        <MyForm/>
      </div>
    )
  }

  render() {
    return (
         <React.Fragment>
          {this.viewLoaded(this.props.content)}
        </React.Fragment>
    );
  }
}

export default MyCommentInfiniteScroll;
