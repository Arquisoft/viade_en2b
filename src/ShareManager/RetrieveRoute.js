//From the user inbox, retrieve all the notifications (marked as 'read'-> más adelante)
//Add the URL to a file located in /viade/shared/globalSharedWithMe.js
import { fetchDocument } from "tripledoc"
import { ldp } from "rdf-namespaces"

//MARK AS READ NOTIFICATION METHOD
export async function getNotifications(inboxPath){ 
  let notification = [];
  notification = await getNotificationDocuments(inboxPath);

  console.log(notification);
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
      var containerSub = containerDoc.getSubject(inbox);
      var containerItemUrls = containerSub.getAllRefs(ldp.contains);
      var result = []
      for (var i = 0; i < containerItemUrls.length; i++) {
        try {
          var doc = await fetchDocument(containerItemUrls[i])
          if (doc) {
            result = [...result, doc]
          }
        } catch (e) {
        }
      }
      return result
    }
    return [];

    
  }


  