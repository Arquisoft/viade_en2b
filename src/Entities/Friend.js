export default class Friend{
    constructor(webId, name, profilePicture) {
        this.webId=webId;
        this.name = name;
        this.profilePicture = profilePicture;
    }

    toString(){
        console.log("WEB_ID: "+this.webId+" NAME: "+this.name+" PROFILE_PICTURE: "+this.profilePicture);
    }
}