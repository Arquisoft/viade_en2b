import React from "react";
import { Tab } from 'semantic-ui-react'
import MyCommentInfiniteScroll  from '../generic_components/InfiniteScrollComment';
import MyImageInfiniteScroll  from '../generic_components/InfiniteScrollImage';
import MyVideoInfiniteScroll  from '../generic_components/InfiniteScrollVideo';

import * as cache from '../../caches/fileCache/FileCache'

let comentarios = [];
let images = [];
let videos = [];

const panes = [
  { menuItem: 'Comentarios', pane: {
      key: "tabComentarios",
      content: (
        <div className = "routeComments" id ="scrollableCommentDiv" style={{overflow:"scroll", height:400}}>
            <MyCommentInfiniteScroll content = {comentarios} scrollParent = "scrollableCommentDiv"/>
        </div>
      ),
  } },
  { menuItem: "Imagenes", pane: {
      key: "tabImagenes",
      content: (
        <div className = "routeImages" id ="scrollableImageDiv" style={{overflow:"scroll", height:400}}>
            <MyImageInfiniteScroll content = {images} scrollParent = "scrollableImageDiv"/>
        </div>
      ),
  }  },
  { menuItem: 'Videos', pane: {
      key: "tabVideos",
      content: (
        <div className = "routeVideos" id ="scrollableVideoDiv" style={{overflow:"scroll", height:400}}>
            <MyVideoInfiniteScroll content = {videos} scrollParent = "scrollableVideoDiv"/>
        </div>
      ),
  }  }
]


class MyTab extends React.Component {
render(){
    images.length = 0;
    videos.length = 0;
    comentarios.length = 0;

    let multimedia = [];
    multimedia = cache.default.getFilePathsForRoute(this.props.route);
    multimedia.forEach(element => {
        if(element.contentType === "image/png")
            images.push(element);
        else if(element.contentType === "video/mp4")
            videos.push(element);
    });

    return(
        <div className = "MyTabDiv">
            <link rel='stylesheet' href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css"/>
            <Tab panes = {panes} renderActiveOnly={false}/>
        </div>
    )
}

}

export default MyTab;