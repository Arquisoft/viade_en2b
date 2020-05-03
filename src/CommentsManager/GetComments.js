import Comment from "../Entities/Comment";

export default class LoadRouteComments {
  async loadComments(route, callback) {
    let comments = [];
    if (route) {
      let commentsJson = await this.loadCommentsJson(route, callback);

      if (commentsJson.comments) {
        comments = this.parseJsonToEntity(route, commentsJson.comments);
      }
    }
    return comments;
  }

  async loadCommentsJson(route, callback) {
    const auth = require("solid-auth-client");
    const FC = require("solid-file-client");
    const fc = new FC(auth);

    let session = await auth.currentSession();

    if (!session || session.webId === undefined || session.webId === null) {
      callback();
    }
    try {
      if (await fc.itemExists(route)) {
        //console.log(routesFolder + " exists");
        try {
          let content = await fc.readFile(route);
          let json = JSON.parse(content);
          return json;
        } catch (error1) {
          console.log("Comment couldn't be parsed");
        }
      }
    } catch (error) {
      console.log(error);
      console.log("Comments couldn't be loaded");
      return "";
    }
  }

  parseJsonToEntity(commentsUrl, comments) {
    let commentsArray = [];
    for (let i = 0; i < comments.length; i++) {
      let newComment = new Comment(
        commentsUrl,
        comments[i].jsonComment.text,
        comments[i].jsonComment.author,
        comments[i].dateCreated
      );
      commentsArray.push(newComment);
    }

    return commentsArray;
  }
}
