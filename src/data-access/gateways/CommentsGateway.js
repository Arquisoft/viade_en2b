

export default function getCommentsForRoute(commentsUrl,callback){

}

export default function postCommentInRoute(route,comment,callback){


        let comments = getCommentsForRoute(route,callaback);
        let addComment = new AddComment();
        //let comment = new Comment(foundRoute.url,comment.text,comment.sender);

        addComment.addComment(comment,callback);

}