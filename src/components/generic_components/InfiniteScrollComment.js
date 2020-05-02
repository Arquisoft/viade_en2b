import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {Comment} from 'semantic-ui-react';
import '../../assets/css/commentsContainer.css';
import MyForm  from '../generic_components/MyForm';


class MyCommentInfiniteScroll extends React.Component {
  state = {
    items: this.props.content.slice(0,20),
    array_index: 20,
    hasMore: true,
  };

  fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      this.setState({
        items: this.state.items.concat(this.props.content.slice(this.state.array_index, this.state.array_index+20)),
        array_index: this.state.array_index+20,
      });
    }, 1000);
    if(this.props.content.length<=this.state.array_index){
        this.setState({
            hasMore:false
        });
    }
    console.log(this.state.array_index)
  };

  render() {
    
    return (
      <div>
        <InfiniteScroll
          dataLength={this.state.items.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={<h4>Loading...</h4>}
          endMessage = {
            <p style={{textAlign: 'center'}}>
                <b>Yay! You have seen it all</b>
            </p>
          }
          scrollableTarget= {this.props.scrollParent}
        >
        <Comment.Group>
          <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css'/>
          {this.state.items.map((i, index) => (
            <div className="commentsContainer" key={index}>
                 <Comment>
                  <Comment.Avatar src = {i.avatar} />
                  <Comment.Content>
                    <Comment.Author as = 'span'>{i.author}</Comment.Author>
                    <Comment.Metadata>
                      <div>{i.date}</div>
                    </Comment.Metadata>
                    <Comment.Text>{i.comment}</Comment.Text>
                  </Comment.Content>
             </Comment>
            </div>
          ))}
          </Comment.Group>
        </InfiniteScroll>
        <MyForm/>
      </div>
    );
  }
}

export default MyCommentInfiniteScroll;