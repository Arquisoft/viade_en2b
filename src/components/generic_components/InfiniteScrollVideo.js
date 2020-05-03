import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";


class MyVideoInfiniteScroll extends React.Component {
  state = {
    items: this.props.content.slice(0,20),
    array_index: 20,
    hasMore: true
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
          loader={<h4>Estoy cargando moreno</h4>}
          endMessage = {
            <p style={{textAlign: 'center'}}>
                <b>Yay! You have seen it all</b>
            </p>
          }
          scrollableTarget= {this.props.scrollParent}

        >
          {this.state.items.map((i, index) => (
            <div key={index}>
              <video width="320" height="240" controls>
                <source src={i.filePath} type="video/mp4"/>
                Your browser does not support the video tag.
              </video> 
                <span>
                  Published: {i.dateAttached.toDateString()}, {i.dateAttached.getHours()}:{i.dateAttached.getMinutes()}
                </span>     
            </div>
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}

export default MyVideoInfiniteScroll;