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
        let comments = await loader.getComments(commentsUrl,callback);
        return comments;

}



export async function postCommentInRoute(routeComUrl,comment,callback){
        let loader = new LoadRouteComments();
        let comments = await loader.loadCommentsJson(commentsUrl,callback);
        comments.push(comment);
        let postComment = new AddComment();
        await postComment.addComment(routeComUrl,comments,callback);





}