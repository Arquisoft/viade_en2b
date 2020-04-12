//From the user inbox, retrieve all the notifications (marked as 'read'-> más adelante)
//Add the URL to a file located in /viade/shared/globalSharedWithMe.js
import { fetchDocument } from "tripledoc"
import { ldp } from "rdf-namespaces"

//MARK AS READ NOTIFICATION METHOD
export async function getNotifications(){  
  console.log(getNotificationDocuments());
}



export async function getNotificationDocuments () {
    var inbox =  "https://testingclrmrnd.inrupt.net/viade/inbox/";
    console.log(inbox);
    var containerDoc = await fetchDocument(inbox);
    console.log(containerDoc);

    if (containerDoc) {
      console.log('IN');
      var containerSub = containerDoc.getSubject(inbox)
      var containerItemUrls = containerSub.getAllRefs(ldp.contains)
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
    return console.log('NO');

    
  }


  