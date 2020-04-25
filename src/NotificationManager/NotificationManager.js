import { fetchDocument } from "tripledoc";
import { ldp } from "rdf-namespaces";
import Notification from 'Entities/Notification';
import {GetSpecificName} from 'data-access/UserData';

const $rdf = require("rdflib");
const ns = require('solid-namespace')($rdf);



const request = require("request");

/**
 * Listing the notifications urls
 * @param {*} inboxPath 
 */
export async function getNotifications(inboxPath) {
    let notificationDocuments = [];
    notificationDocuments = await getNotificationDocuments(inboxPath);

    console.log("NOTIFICATIONS RETRIEVED");
    console.log(notificationDocuments);

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
                    
                    //Notification url
                    const url = containerURLS[i];

                    var subject = doc.getSubject(url);

                    //From here get typeNotification && author && path
                    const summary = subject.getString(ns.as("summary"));

                    //Processing the summary information
                    let notification = processNotificationInfo(url, summary);
                    result.push(notification);

                }
            } catch (e) {
                console.log("Error");
            }
        }
        return result;
    }
    return [];
}

//ROUTE_https://clrmrnd/inrupt.net/_https://clrmrnd.inrupt.net/viade/routes/Rusia.json_Sat Apr 25 2020 17:11:07 GMT+0200 (hora de verano de Europa central)
async function processNotificationInfo(url, summary){
    let notification = new Notification();

    try{
        let info = summary.split("_");
        console.log(info);

        let type = info[0];
        switch(type){
            case "ROUTE":

                //author
                let webId = info[1];
                const profile = webId + "profile/card#me";     
                const authorName = await GetSpecificName("https://clrmrnd.inrupt.net/profile/card#me");
                
                
                //path
                const routePath = info[2];
                //date
                const date = info[3];


                notification = new Notification(url, type, routePath, authorName, webId, date);

                console.log('HABEMUS NOTIFICATION')
                console.log(notification);


                //Crea o modifica el archivo de sharedRoutes añadiendo la url
                addToSharedFolder(notification);

                break;

            case "COMMENT":
                break;

            default:
                console.log('NOTIFICATION NOT FROM THIS APP: VIADE_EN2B');
                break;

            
        }

        return notification;

    } catch(Error){
        console.log("The notification could not be processed, it may be possible that is not a notification from this app.")
        return false;
    }
}

function addToSharedFolder(notification){

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

export function createNotificationSummary(webIdAuthor, routePath, webIdTo, date) { 

    return "ROUTE" + "_" + webIdAuthor + "_" + routePath + "_" + date;
}

export function createNotificationSummaryJSON(webIdAuthor, routePath, webIdTo, date) {
    return JSON.stringify(

        {
            "@context": "https://www.w3.org/ns/activitystreams",
            "summary": "ROUTE",
            "type": "RouteType",

            "actor": {
                "type": "Person",
                "name": webIdAuthor
            },

            "object": {
                "type": "Resource",
                "name": routePath
            },

            "target": {
                "type": "Person",
                "name": webIdTo
            },

            "published": {
                "type": "Date",
                "name": date
            }

        }

    );
}

