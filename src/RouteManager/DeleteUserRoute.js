import Route from "../Entities/BasicRoute"

export default class DeleteUserRoute{
    /**
     * Deletes a route by name
     * Returns true if the route was found and deleted it
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
   
        let routesFolder = session.webId.substring(0, session.webId.length - 16) + "/public/Routes/";
        
        if (await fc.itemExists(routesFolder)) {
            console.log(routesFolder + " exists");
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
                        fc.delete(urlRoute);
                        deleteRouteFromStorage();
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

    
    async deleteRouteByUrl(routeUrl) {
        const auth = require('solid-auth-client')
        const FC = require('solid-file-client')
        const fc = new FC(auth)

        //to delete
        

        let session = await auth.currentSession();
        let popupUri = 'https://solid.community/common/popup.html';
        if (!session || session.webId === undefined || session.webId === null)
            session = await auth.popupLogin({popupUri});
   
        let routesFolder = session.webId.substring(0, session.webId.length - 16) + "/public/Routes/";

        
        if (await fc.itemExists(routesFolder)) {
            console.log(routesFolder + " exists");
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
                        fc.delete(urlRoute);
                        deleteRouteFromStorage();
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

    deleteRouteFromStorage(route){
        //
    }


}





