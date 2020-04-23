import Comment from "../Entities/Comment";


export default class LoadRouteComments {

    async loadComments(route, callback) {
        if (route.commentsUrl === null || route.commentsUrl === undefined || route.commentsUrl === "") {
            let createdUrl = await createCommentsFile(route.name, callback);
            if (createdUrl !== null && createdUrl !== undefined && createdUrl !== "") {
                route.commentsUrl = createdUrl;


            }
            return [];
        } else {
            let comments = await getComments(route.commentsUrl, callback);
            return comments;

        }


    }

    async getComments(commentsUrl, callback) {
        const auth = require('solid-auth-client')
        const FC = require('solid-file-client')
        const fc = new FC(auth)

        let session = await auth.currentSession();

        if (!session || session.webId === undefined || session.webId === null) {
            callback();
        }
        try {
            if (await fc.itemExists(commentsUrl)) {
                //console.log(routesFolder + " exists");
                try {
                    let content = await fc.readFile(commentsUrl);
                    let json = Json.parse(content);
                    let comments = json.comments;
                    let commentsArray = [];
                    for (let i = 0; comments.length; i++) {
                        let newComment = new Comment(commentsUrl, comments[i].text, comments[i].author, comments[i].dateCreated);
                        commentsArray.push(newComment);
                    }

                    return commentsArray;
                } catch
                    (error1) {
                    console.log("Comment couldn't be parsed");

                }
            }
        } catch (error) {
            console.log("Comments couldn't be loaded");
            return [];
        }

    }

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

            let url = session.webId.substring(0, session.webId.length - 16) + "/viade/comments/" + routeName;
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
            await fc.createFile(url, JSON.stringify(emptyCommentFile), "application/json+ld");
            return url;


        } catch (error) {
            console.log("The route couldn't be updated")
            console.log(error)         // A full error response
            console.log(error.status)  // Just the status code of the error
            console.log(error.message) // Just the status code and statusText
            return "";
        }

        return "";

    }


}