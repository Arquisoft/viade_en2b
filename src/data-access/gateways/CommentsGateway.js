import AddComment from "../../CommentsManager/AddComment"
import CreateCommentsFile from "../../CommentsManager/CreateCommentsFile"
import LoadRouteComments from "../../CommentsManager/GetComments"

export async function createCommentsFile(routeName,callback){
        let commentFileCreator = new CreateCommentsFile();
        let fileUrl = await commentFileCreator.createCommentsFile(routeName,callback);
        return fileUrl;


}
export async function getCommentsForRoute(commentsUrl,callback){
        let loader = new LoadRouteComments();
        let comments = await loader.loadComments(commentsUrl,callback);
        return comments;

}



export async function postCommentInRoute(routeComUrl,comment,callback){
        let loader = new LoadRouteComments();
        let commentsJson = await loader.loadCommentsJson(routeComUrl,callback);
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+', '+time;
        comment.dateCreated=dateTime;
        console.log(comment.dateCreated);
        commentsJson.comments.push(comment);
        let postComment = new AddComment();
        let posted = await postComment.addComment(routeComUrl,commentsJson,callback);
        if(posted){
                console.log("New comment was posted succesfully")

        }else{
                console.log("The comment wasn't posted");
        }





}
