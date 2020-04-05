export default class Friend{
    constructor(webId, name, profilePicture, webIdString) {
        this.webId=webId;
        this.name = name;
        this.profilePicture = profilePicture;
        this.webIdString = webIdString;
    }

    toString(){
        console.log("WEB_ID: "+this.webIdString+" NAME: "+this.name+" PROFILE_PICTURE: "+this.profilePicture);
    }
}