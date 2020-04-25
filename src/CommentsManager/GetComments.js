import Comment from "../Entities/Comment";


export default class LoadRouteComments {

    async loadComments(route, callback) {
        let comments = [];
       if(route.commentsUrl!==null && route.commentsUrl!==undefined && route.commentsUrl!==""){
           comments = this.parseJsonToEntity(await this.loadCommentsJson(route.commentsUrl,callback));

       }
       return comments;


    }


    async loadCommentsJson(route,callback){
        const auth = require('solid-auth-client');
        const FC = require('solid-file-client');
        const fc = new FC(auth);

        let session = await auth.currentSession();

        if (!session || session.webId === undefined || session.webId === null) {
            callback();
        }
        try {
            if (await fc.itemExists(commentsUrl)) {
                //console.log(routesFolder + " exists");
                try {
                    let content = await fc.readFile(commentsUrl);
                    let json = JSON.parse(content);
                    return json;
                } catch
                    (error1) {
                    console.log("Comment couldn't be parsed");

                }
            }
        } catch (error) {
            console.log("Comments couldn't be loaded");
           return '';
        }

    }

    parseJsonToEntity(comments){
        let commentsArray = [];
        for (let i = 0; comments.length; i++) {
            let newComment = new Comment(commentsUrl, comments[i].text, comments[i].author, comments[i].dateCreated);
            commentsArray.push(newComment);
        }

        return commentsArray;

    }


}