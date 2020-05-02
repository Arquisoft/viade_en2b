import Comment from "../Entities/Comment";


export default {

    async loadComments(route, callback) {
        let comments = [];
        if(route!==null && route!==undefined && route!==""){
           let commentsJson = await this.loadCommentsJson(route,callback);
           console.log("Json comments file:" +JSON.stringify(commentsJson));
           console.log(commentsJson.comments);
           comments = this.parseJsonToEntity(route, commentsJson.comments);

       }
       return comments;


    },

  async loadCommentsJson(route, callback) {
    const auth = require("solid-auth-client");
    const FC = require("solid-file-client");
    const fc = new FC(auth);

    let session = await auth.currentSession();

        let session = await auth.currentSession();
        if (!session || session.webId === undefined || session.webId === null) {
            callback();
        }

        try {
          let content = await fc.readFile(route);
          let json = JSON.parse(content);
          return json;
        } catch (error1) {
          console.log("Comment couldn't be parsed");
        }

    },

    parseJsonToEntity(commentsUrl,comments){
        let commentsArray = [];
        //console.log(comments.length);
        for (let i = 0; i< comments.length; i++) {

    for (let i = 0; i < comments.length; i++) {
      let newComment = new Comment(
        commentsUrl,
        comments[i].text,
        comments[i].author,
        comments[i].dateCreated
      );
      commentsArray.push(newComment);
    }

    return commentsArray;
  }
}
