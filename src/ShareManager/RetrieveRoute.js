//From the user inbox, retrieve all the notifications (marked as 'read'-> más adelante)
//Add the URL to a file located in /viade/shared/globalSharedWithMe.js
import { fetchDocument } from "tripledoc";
import { ldp, schema} from "rdf-namespaces";
//import {as} from "solid-namespace";

const $rdf = require('rdflib'); 
const ns = require('solid-namespace')($rdf);

//GET ALL NOTIFICATIONS
export async function getNotifications(inboxPath){ 
  let notificationDocuments = [];
  notificationDocuments = await getNotificationDocuments(inboxPath);
  let not2 = processSharedRoutes(notificationDocuments);

  console.log(notificationDocuments);
  console.log(not2);
}


/**
 * Returns the current list of notifications.
 * Ex: "https://testingclrmrnd.inrupt.net/viade/inbox/"
 */
export async function getNotificationDocuments (inboxPath) {
    var inbox =  inboxPath;
    var containerDoc = await fetchDocument(inbox);

    //if the document exists
    if (containerDoc) {
      var subject = containerDoc.getSubject(inbox);
      var containerURLS = subject.getAllRefs(ldp.contains);
     
      var result = []
      for (var i = 0; i < containerURLS.length; i++) {
        try {
          //FETCH DE LA NOTIFICACIÓN
          var doc = await fetchDocument(containerURLS[i]);

          if (doc) {
            
            result = [...result, doc];
            console.log('RESULT');
            console.log(doc);
          }
        } catch (e) {
        }
      }
      return result
    }
    return [];

    
  }




  export async function processSharedRoutes (notificationDocuments) {
    var result = []
     
      if (notificationDocuments.length > 0) {
        for (let i = 0; i < notificationDocuments.length; i++) {
          var message = notificationDocuments[i].getSubject("");
          console.log(message);

          const route = message.getString(schema.license);
          console.log(route);          

        }
      
    }
    return result
  }

  