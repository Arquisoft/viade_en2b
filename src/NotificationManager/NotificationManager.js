import { fetchDocument } from "tripledoc";
import { ldp } from "rdf-namespaces";
import Notification from 'Entities/Notification';
import { GetSpecificName, GetSpecificWebId } from 'data-access/UserData';

const $rdf = require("rdflib");
const ns = require('solid-namespace')($rdf);

const auth = require("solid-auth-client");
const FC = require("solid-file-client");
const fc = new FC(auth);

const request = require("request");



/**
 * Returns the current list of notifications.
 * Ex: "https://testingclrmrnd.inrupt.net/viade/inbox/"
 */
export async function getNotificationDocuments(inboxPath) {
    var inbox = inboxPath;
    var containerDoc = await fetchDocument(inbox);

  var containerDoc = await fetchDocument(inbox)
    .then()
    .catch((err) => {
      console.log("Error");
      return;
    });

  //if the document exists
  if (containerDoc) {
    var subject = containerDoc.getSubject(inbox);
    var containerURLS = subject.getAllRefs(ldp.contains);

                    //Notification url
                    const url = containerURLS[i];

                    var subject = doc.getSubject(url);

                    //From here get typeNotification && author && path
                    const summary = subject.getString(ns.as("summary"));

                    //Processing the summary information
                    let notification = processNotificationInfo(url, summary);
                    result.push(notification);

          //Processing the summary information

          let notification = await processNotificationInfo(
            url,
            summary,
            webIdAuthor
          );
          result.push(notification);
          deleteNotification(notification.urlNotification);
        }
        return result;
    }
    cache.setNotifications(result);

    // localStorage.setItem("notifications", JSON.stringify(result));
    return result;
  }
  return [];
}

//ROUTE_https://clrmrnd/inrupt.net/_https://clrmrnd.inrupt.net/viade/routes/Rusia.json_Sat Apr 25 2020 17:11:07 GMT+0200 (hora de verano de Europa central)
async function processNotificationInfo(url, summary) {
    let notification = new Notification();

    try {
        let info = summary.split("_");
        
        let type = info[0];
        switch (type) {
            case "ROUTE":

                //author
                let webId = info[1];
                const profile = webId + "profile/card#me";
                const webIdForName = await GetSpecificWebId(webId);
                const authorName = await GetSpecificName(profile);


                //path
                const routePath = info[2];
                //date
                const date = info[3];


                notification = new Notification(url, type, routePath, authorName, webIdForName, date);

                console.log('HABEMUS NOTIFICATION')
                console.log(notification);


                //Crea o modifica el archivo de sharedRoutes añadiendo la url
                addToSharedFolder(notification, "https://testingclrmrnd.inrupt.net/");
                return notification;
                

            case "COMMENT":
                break;

            default:
                console.log('NOTIFICATION NOT FROM THIS APP: VIADE_EN2B');
                break;


        }

        return notification;

    } catch (Error) {
        console.log("The notification could not be processed, it may be possible that is not a notification from this app.")
        return false;
    }
}

async function addToSharedFolder(notification, myWebId) {
  let path = myWebId + "/viade/shared/" + notification.authorWebId + ".jsonld";
  try {
    //checking if the path exists
    let exists = await fc
      .itemExists(path)
      .catch(Error)
      .then(console.log("ERROR"));

    if (!exists) {
      createFileShared(path, notification);
    } else {
      addRouteToFile(path, notification);
    }


}

async function addRouteToFile(path, notification) {
    //push id
    const file = await fc.readFile(path);
    let routeJson = JSON.parse(file);
    routeJson.routes.push({ "@id": notification.urlResource });
    //store
    fc.createFile(path, JSON.stringify(routeJson), "text/jsonld");
    
}

function createFileShared(path, notification) {
    //saveSharedFile
    const content = functionCreateSharedFileContent(notification);
    console.log(content);
    fc.createFile(path, content, "text/jsonld");
}

function functionCreateSharedFileContent(notification) {
    return JSON.stringify({
        "@context": {
            "@version": 1.1,
            "routes": {
                "@container": "@list",
                "@id": "viade:routes"
            },
            "viade": "http://arquisoft.github.io/viadeSpec/"
        },
        "routes": [
            {
                "@id": notification.urlResource

            }
        ]
    });
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
  var inbox = "";
  const lastElement = webIdFriend[webIdFriend.length - 1];
  if (lastElement === "/") {
    inbox = webIdFriend + "viade/inbox/";
  } else {
    inbox = webIdFriend + "/viade/inbox/";
  }

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

export async function deleteNotification(url) {
  if (url != null) {
    if (await fc.itemExists(url)) {
      try {
        fc.delete(url);
      } catch (error) {
        alert(error);
      }
    }
    console.log("You are trying to delete something that is null");
  }
}
