import { setPermissionsTo, checkPermissions } from "util/PermissionManager";
import {
  createNotificationSummary,
  postNotification,
  createNotificationContent,
} from "NotificationManager/NotificationManager";
import { v4 as uuidv4 } from "uuid";
import RoutesLoader from 'RouteManager/ListUserRoutes';
import { loadSpecificUserRoutesFiles, getMediaAttachedToRoute } from 'RouteManager/ListSpecificUserRoutes';
/**
 * Function that allows a user to share a route with a friend.
 * Provides READ permissions to the friend over the route of the user autenticated,
 * and sends a notification to the inbox of the friend, containing the url of that
 * route.
 *
 * Example: ShareWith( "https://clrmrnd.inrupt.net/viade/routes/Rusia.json", "https://testingclrmrnd.inrupt.net/profile/card#me", "https://clrmrnd.inrupt.net/profile/card#me")
 *
 * @param {String} route path to the route the user wants to share.
 * @param {String} profileFriend represents profile card of the friend. 
 * @param {String} profileAuthor represents the profile card of the user autenticated.
 */
export async function ShareWith(route, profileFriend, profileAuthor) {
  //Sharing the route with the friend (it must be the profile of the friend).
  console.log("Route: " + route);
  console.log("Friend ID: " + profileFriend);
  console.log("Author ID: " + profileAuthor);

  let webIdAuthor = profileAuthor.substring(0, profileAuthor.length - 16);
  webIdAuthor = webIdAuthor + "/";


  let webIdFriend = profileFriend.substring(0, profileFriend.length - 16);
  webIdFriend = webIdFriend + "/";

  const routeAtt = route.split('/');
  const routeName = routeAtt[routeAtt.length - 1];
  console.log(routeName);

  const routeEntity = await loadSpecificUserRoutesFiles(route);



  //send notification to other user inbox
  const summary = createNotificationSummary(webIdAuthor, route, webIdFriend, new Date());
  const uuid = uuidv4();
  console.log(summary.toString());
  const contenido = createNotificationContent("Announce", "ROUTE", webIdFriend, summary.toString(), new Date(), uuid);


  //check friend has an inbox;

  //check if it's already shared (you have to check and set permissions to the /profile/card#me)
  const shared = await checkPermissions("READ", profileFriend, route);
  if (! shared) {

    //set permissions to read in the route
    setPermissionsTo("READ", route, profileFriend);



    //retrieving media of the route
    if (routeEntity != null) {
      if (routeEntity.files != null) {
        if (routeEntity.files[0] != null) {
          let media = routeEntity.files[0].files;

          if (media != "undefined" && media != null) {
            for (let i = 0; i < media.length; i++) {
              const element = media[i];
              setPermissionsTo("READ", element.filePath, profileFriend);
            }
          }
        }
      }
    }


    //send notification to other user inbox
    const summary = createNotificationSummary(
      webIdAuthor,
      route,
      webIdFriend,
      new Date()
    );
    const uuid = uuidv4();
    console.log(summary.toString());
    const contenido = createNotificationContent(
      "Announce",
      "ROUTE",
      webIdFriend,
      summary.toString(),
      new Date(),
      uuid
    );

    try {
      postNotification(webIdFriend, contenido, uuid).then().catch((error) => console.log('It seems that the other user has not an inbox with the proper specifications'));
      console.log("DONE");
      return true;
    } catch (e) {
      console.log("There was an error");
      return false;
    }
  } else {
    console.log("The route was already shared.");
    return false;
  }
}
