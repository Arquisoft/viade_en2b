export default class Comment{
    constructor(fileUrl,text,sender,date){
        this.jsonComment = {
            "fileUrl":fileUrl,
            "text":text,
            "author":sender,
            "dateCreated": date
        }
    }
}