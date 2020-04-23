export default class Comment{
    constructor(fileUrl,text,sender,date){
        this.jsonComment = {
            "fileUrl":routeUrl,
            "text":text,
            "author":sender,
            "dateCreated": date
        }
    }
}