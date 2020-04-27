
import RouteCache from "../caches/routeCache/RouteCache"

export default class DeleteUserRoute{
    /**
     * Deletes a route by name
     * Returns true if the route was found and deleted
     * Returns false if it does not exist.
     * 
     * @param {*} routeName 
     */
    async deleteRouteByName(routeName) {
        const auth = require('solid-auth-client')
        const FC = require('solid-file-client')
        const fc = new FC(auth)

        //to delete
        routeName = routeName + ".json";

        let session = await auth.currentSession();
        let popupUri = 'https://solid.community/common/popup.html';
        if (!session || session.webId === undefined || session.webId === null)
            session = await auth.popupLogin({popupUri});
   
        let routesFolder = session.webId.substring(0, session.webId.length - 16) + //"/public/Routes/";
                            "/viade/routes/";
        
        if (await fc.itemExists(routesFolder)) {
            try {

                let content = await fc.readFolder(routesFolder);                
                let files = content.files;

                for (let i = 0; i < files.length; i++) {
                    let urlRoute = files[i].url;
                   
                    
                    //Getting the name to erase it
                    let aux = urlRoute.split('/');
                    let nameRoutes = aux[aux.length-1];
                    
                    //Check if the route retrieved has the same name than the one we're looking for
                    if(routeName === nameRoutes){
                        //DELETING FROM POD
                        fc.delete(urlRoute);
                        //DELETING FROM CACHE
                       // this.deleteRouteFromStorage(routeName);
                        return true;
                    }                                                  
                }
                return false;

            } catch (error) {
                console.log("The folder couldn't be read")
                console.log(error)         // A full error response
                console.log(error.status)  // Just the status code of the error
                console.log(error.message) // Just the status code and statusText
            }

        } else {
            console.log("user has no routes directory")
        }

    }

    /**
     * Deletes a route by the URL
     * @param {} urlProvided 
     */
    async deleteRouteByUrl(urlProvided) {
        const auth = require('solid-auth-client')
        const FC = require('solid-file-client')
        const fc = new FC(auth)

        
        let session = await auth.currentSession();
        let popupUri = 'https://solid.community/common/popup.html';
        if (!session || session.webId === undefined || session.webId === null)
            session = await auth.popupLogin({popupUri});
   
        let routesFolder = session.webId.substring(0, session.webId.length - 16) + "/public/Routes/";

        
        if (await fc.itemExists(routesFolder)) {
         
            try {

                let content = await fc.readFolder(routesFolder);                
                let files = content.files;

                for (let i = 0; i < files.length; i++) {
                    let urlFromPod = files[i].url;
                                       
                    //Check if the url retrieved is the same than the one we're looking for
                    if(urlProvided === urlFromPod){
                        fc.delete(urlFromPod);
                        //deleteRouteFromStorage();
                        return true;
                    }                                                  
                }
                return false;

            } catch (error) {
                console.log("The folder couldn't be read")
                console.log(error)         // A full error response
                console.log(error.status)  // Just the status code of the error
                console.log(error.message) // Just the status code and statusText
            }

        } else {
            console.log("user has no routes directory")
        }

    }

    /**
     * Auxiliar method that calls to the delete on the RouteChache.js
     * @param {} routeName 
     */
    deleteRouteFromStorage(routeName){        
        let route = new RouteCache();//Should be changed to RouteCache.getInstance();      
        route.deleteRouteByName(routeName);
    }
}





