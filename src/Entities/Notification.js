export default class Notification{
    constructor(urlNotification, typeNotification, urlResource, authorName, authorWebId, date) {

        this.urlNotification = urlNotification;
        this.typeNotification = typeNotification;

        this.urlResource = urlResource;

        this.authorName = authorName;
        this.authorWebId = authorWebId;

        this.date = date;

        if (typeNotification == "ROUTE"){
            this.message = authorName + " has shared a route with you.";
        }
    }
}