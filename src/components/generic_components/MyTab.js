import React from "react";
import { Tab } from "semantic-ui-react";
import MyCommentInfiniteScroll from "../generic_components/InfiniteScrollComment";
import MyImageInfiniteScroll from "../generic_components/InfiniteScrollImage";
import MyVideoInfiniteScroll from "../generic_components/InfiniteScrollVideo";
import * as gateway from "../../data-access/gateways/CommentsGateway";
import * as cache from "../../caches/fileCache/FileCache";

let images = [];
let videos = [];

class MyTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comentarios: [],
    };
  }

  panes = () => {
    return [
      {
        menuItem: "Comentarios",
        pane: {
          key: "tabComentarios",
          content: (
            <div
              className="routeComments"
              id="scrollableCommentDiv"
              style={{ overflow: "scroll", height: 400 }}
            >
              <MyCommentInfiniteScroll
                content={this.state.comentarios}
                scrollParent="scrollableCommentDiv"
              />
            </div>
          ),
        },
      },
      {
        menuItem: "Imagenes",
        pane: {
          key: "tabImagenes",
          content: (
            <div
              className="routeImages"
              id="scrollableImageDiv"
              style={{ overflow: "scroll", height: 400 }}
            >
              <MyImageInfiniteScroll
                content={images}
                scrollParent="scrollableImageDiv"
              />
            </div>
          ),
        },
      },
      {
        menuItem: "Videos",
        pane: {
          key: "tabVideos",
          content: (
            <div
              className="routeVideos"
              id="scrollableVideoDiv"
              style={{ overflow: "scroll", height: 400 }}
            >
              <MyVideoInfiniteScroll
                content={videos}
                scrollParent="scrollableVideoDiv"
              />
            </div>
          ),
        },
      },
    ];
  };

  componentDidMount() {
    gateway
      .getCommentsForRoute(this.props.route.commentsUrl, () => {})
      .then((comments) => {
        this.setState({
          comentarios: comments,
        });
      });
  }

  render() {
    images.length = 0;
    videos.length = 0;

    let multimedia = [];

    multimedia = cache.default.getFilePathsForRoute(this.props.route);
    multimedia.forEach((element) => {
      if (element.contentType.includes("image")) {
        images.push(element);
      } else if (element.contentType.includes("video")) {
        videos.push(element);
      }
    });
    return (
      <div className="MyTabDiv">
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css"
        />
        <Tab panes={this.panes()} renderActiveOnly={false} />
      </div>
    );
  }
}

export default MyTab;
