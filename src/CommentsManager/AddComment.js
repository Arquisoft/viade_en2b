export default class addComment{

    async addComment(comment,callback){
        // createFile( fileURL, content, 'application/json', options )
        const auth = require('solid-auth-client')
        const FC = require('solid-file-client')
        const fc = new FC(auth)

        let session = await auth.currentSession();

        if (!session || session.webId === undefined || session.webId === null){
            callback();
            return false;}

        try {

            await fc.createFile(comment,JSON.stringify(comment.jsonComment),"application/json");
            return true;


        } catch (error) {
            console.log("The route couldn't be updated")
            console.log(error)         // A full error response
            console.log(error.status)  // Just the status code of the error
            console.log(error.message) // Just the status code and statusText
            return false;
        }

    }
}