export default class Comment{
    constructor(routeUrl,text,sender){
        this.jsonComment = {
            "route":routeUrl,
            "comment":text,
            "postedBy":sender,
            "date": Date.now()
        }
    }
}