//From the user inbox, retrieve all the notifications (marked as 'read'-> más adelante)
//Add the URL to a file located in /viade/shared/globalSharedWithMe.js
import { fetchDocument } from "tripledoc"
import { ldp } from "rdf-namespaces"

//MARK AS READ NOTIFICATION METHOD
export async function getNotifications(){  
  console.log(getNotificationDocuments());
}



export async function getNotificationDocuments () {
    var inbox =  "https://testingclrmrnd.inrupt.net/viade/inbox/2a1e6fe0-7ca4-11ea-b984-edbaa4d4ab97.ttl";
    console.log(inbox);
    var containerDoc = await fetchDocument(inbox);

    console.log(containerDoc);

    
  }


  