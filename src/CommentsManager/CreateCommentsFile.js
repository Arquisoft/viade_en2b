export default class CreateCommentsFile{


    async createCommentsFile(routeName, callback) {
        // createFile( fileURL, content, 'application/json', options )
        const auth = require('solid-auth-client')
        const FC = require('solid-file-client')
        const fc = new FC(auth)

        let session = await auth.currentSession();

        if (!session || session.webId === undefined || session.webId === null) {
            callback();
        }

        try {

            let url = session.webId.substring(0, session.webId.length - 16) + "/viade/comments/" + routeName+"Comments";
            let emptyCommentFile = {
                "@context": {
                    "@version": 1.1,
                    "comments": {
                        "@container": "@list",
                        "@id": "viade:comments"
                    },
                    "comment": {
                        "@id": "viade:comment",
                        "@type": "@id"
                    },
                    "author": {"@id": "schema:author", "@type": "@id"},
                    "dateCreated": {
                        "@id": "viade:dateCreated",
                        "@type": "xsd:date"
                    },
                    "text": {
                        "@id": "viade:text",
                        "@type": "xsd:string"
                    },
                    "viade": "http://arquisoft.github.io/viadeSpec/",
                    "xsd": "http://www.w3.org/2001/XMLSchema#"
                },
                "comments": []

            };
            console.log("new file "+JSON.stringify(emptyCommentFile));
            console.log(url+".jsonld");
            await fc.createFile(url+".jsonld", JSON.stringify(emptyCommentFile), "text/plain");
            return url;


        } catch (error) {
            console.log("The comments file couldn't be created")
            console.log(error)         // A full error response
            console.log(error.status)  // Just the status code of the error
            console.log(error.message) // Just the status code and statusText
            return "";
        }

        return "";

    }


}