import React from "react";
import { Tab } from 'semantic-ui-react'
import MyInfiniteScroll  from '../generic_components/InfiniteScroll';


var comentarios = []

var images = []

var videos = []

const loadArrays = () => {
        for(let i = 0; i<100; i++){
            comentarios.push("Comentario " + i);
            images.push("Image " + i);
            videos.push("Video " + i);
    }
}

loadArrays();
const panes = [
  { menuItem: 'Comentarios', pane: {
      key: "tabComentarios",
      content: (
        <div className = "routeComments" id ="scrollableCommentDiv" style={{overflow:"scroll", height:400}}>
            <MyInfiniteScroll content = {comentarios} scrollParent = "scrollableCommentDiv"/>
        </div>
      ),
  } },
  { menuItem: "Imagenes", pane: {
      key: "tabImagenes",
      content: (
        <div className = "routeImages" id ="scrollableImageDiv" style={{overflow:"scroll", height:400}}>
            <MyInfiniteScroll content = {images} scrollParent = "scrollableImageDiv"/>
        </div>
      ),
  }  },
  { menuItem: 'Videos', pane: {
      key: "tabVideos",
      content: (
        <div className = "routeVideos" id ="scrollableVideoDiv" style={{overflow:"scroll", height:400}}>
            <MyInfiniteScroll content = {videos} scrollParent = "scrollableVideoDiv"/>
        </div>
      ),
  }  }
]

class MyTab extends React.Component{

render(){
    return(
        <div className = "MyTabDiv">
            <link rel='stylesheet' href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css"/>
            <Tab panes = {panes} renderActiveOnly={false}/>
        </div>
    )}
}

export default MyTab;