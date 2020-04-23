import { fetchDocument } from "tripledoc";
import { ldp, schema } from "rdf-namespaces";
import { message } from "rdf-namespaces/dist/wf";
import { url } from "rdf-namespaces/dist/cal";


const $rdf = require("rdflib");
const ns = require("solid-namespace")();


const request = require("request");

/**
 * Listing the notifications urls
 * @param {*} inboxPath 
 */
export async function getNotifications(inboxPath) {
    let notificationDocuments = [];
    let urls = [];


    urls = await getNotificationURLS(inboxPath);
    notificationDocuments = await getNotificationDocuments(inboxPath);

    console.log(notificationDocuments);

    let not2 = processSharedRoutes(notificationDocuments, urls);

    console.log("NOTIFICATIONS RETRIEVED");
    console.log(not2);
}

/**
 * Returns the current list of notifications.
 * Ex: "https://testingclrmrnd.inrupt.net/viade/inbox/"
 */
export async function getNotificationDocuments(inboxPath) {
    var inbox = inboxPath;
    var containerDoc = await fetchDocument(inbox);

    //if the document exists
    if (containerDoc) {
        var subject = containerDoc.getSubject(inbox);
        var containerURLS = subject.getAllRefs(ldp.contains);

        var result = [];
        for (var i = 0; i < containerURLS.length; i++) {
            try {
                //FETCH DE LA NOTIFICACIÓN
                console.log(containerURLS[i]);
                
                var doc = await fetchDocument(containerURLS[i]);

                if (doc) {
                    result = [...result, doc];

                }
            } catch (e) {
                console.log("Error");
            }
        }
        return result;
    }
    return [];
}

/**
 * Returns the current list of notifications.
 * Ex: "https://testingclrmrnd.inrupt.net/viade/inbox/"
 */
export async function getNotificationURLS(inboxPath) {
    var inbox = inboxPath;
    var containerDoc = await fetchDocument(inbox);
    var result = [];

    //if the document exists
    if (containerDoc) {
        var subject = containerDoc.getSubject(inbox);
        
        var containerURLS = subject.getAllRefs(ldp.contains);
        for (var i = 0; i < containerURLS.length; i++) {
            try {
                
                //LISTANDO LAS URLS DE LAS NOTIFICACIONES
                result.push(containerURLS[i]);
            } catch (e) {
                console.log("Error");
            }
        }
        return result;
    }
    return [];
}

export async function processSharedRoutes(notificationDocuments, urls) {
    var result = [];

    if (notificationDocuments.length > 0) {
        for (let i = 0; i < notificationDocuments.length; i++) {

            let urlRoute = urls[i];
            //getting the subject by the notification title
            var message = notificationDocuments[i]
                .getSubject(urlRoute);
            const route = message.getString(ns.as("summary"));

            result.push(route);
        }
    }
    return result;
}

/**
* Method that allows to send a notification to a 
* friend.
* @param {} webIdFriend 
* @param {*} content 
*/
export async function postNotification(webIdFriend, content, uuid) {
    var inbox = webIdFriend + "/viade/inbox/";

    await request({
        method: "POST",
        uri: inbox,
        body: content,
        headers: {
            slug: uuid,
            "Content-Type": "text/turtle"
        }
    },
        function (error, response, content) {
            if (error) { 
                return false; 
            } else {
                return true;
            }
        })
}

export function createNotificationContent(type, title, webId, routePath, time, uuid) {
    return `@prefix terms: <http://purl.org/dc/terms#>.
          @prefix as: <https://www.w3.org/ns/activitystreams#> .
          @prefix schema: <http://schema.org/> .
          @prefix solid: <http://www.w3.org/ns/solid/terms#> .
          @prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
          @prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
          @prefix : <${webId + `viade/inbox/` + uuid + `.ttl`}>.
          <${webId + `viade/inbox/` + uuid + `.ttl`}> a as:${type} ;
          schema:license <https://creativecommons.org/licenses/by-sa/4.0/>;
          terms:title "${title}" ;
          as:summary "${routePath}" ;
          as:actor <${webId}> ;
          solid:read "false"^^xsd:boolean ;
          as:published "${ time}"^^xsd:dateTime .`
}


export function createNotificationJSONLD(webIdAuthor, routePath, webIdTo) {
    return JSON.stringify(

        {
            "@context": "https://www.w3.org/ns/activitystreams",
            "summary": "NEW ROUTE",
            "type": "RouteShared",

            "actor": {
                "type": "Person",
                "name": webIdAuthor
            },
            "object": {
                "type": "route",
                "name": routePath
            },
            "target": {
                "type": "Person",
                "name": webIdTo
            }

        }

    );
}

