export default class AddComment{

    async addComment(url,comments,callback){
        // createFile( fileURL, content, 'application/json', options )
        const auth = require('solid-auth-client')
        const FC = require('solid-file-client')
        const fc = new FC(auth)

        let session = await auth.currentSession();

        if (!session || session.webId === undefined || session.webId === null){
            callback();
            return false;}

        try {

            //try catch
            console.log('WHEN ADDINGD THE COMMENT');
            console.log(url);
            
            await fc.createFile(url, JSON.stringify(comments), 'text/plain');

            return true;


        } catch (error) {
            console.log("Comments file for the route couldn't be created");
            console.log(error)         // A full error response
            console.log(error.status)  // Just the status code of the error
            console.log(error.message) // Just the status code and statusText
            return false;
        }

    }
}