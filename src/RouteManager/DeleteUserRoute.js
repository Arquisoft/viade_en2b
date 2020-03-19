import Route from "../Entities/BasicRoute"

export default class DeleteUserRoute{
    async delteRoute(routeName) {
        const auth = require('solid-auth-client')
        const FC = require('solid-file-client')
        const fc = new FC(auth)

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
                    let fileContent = await fc.readFile(files[i].url);
                    console.log(fileContent);
                    
                    //Check if the route retrieved has the same name than the one we're looking for
                    if(fileContent.contains(routeName)){
                        fc.delete(folder.files[i].url); 
                        return true;
                    }
                }


            } catch (error) {
                console.log("The folder couldn't be read")
                console.log(error)         // A full error response
                console.log(error.status)  // Just the status code of the error
                console.log(error.message) // Just the status code and statusText
            }


        } else {
            console.log("user has no routes directory")
        }

       let rou =  this.jsonToEntity(this.routesToJson(routes));
       localStorage.setItem('rutas', JSON.stringify(rou));
       return rou;

    }


    routesToJson(routes){
        let jsonRoutes = [];
        for (let i =0;i<routes.length;i++){
            try{
            let route = JSON.parse(routes[i]);
            jsonRoutes.push(route);}
            catch (e) {
                console.log("Route "+i+" couldn't be transformed to json because the format is wrong");

            }

        }

        return jsonRoutes;
    }

    jsonToEntity(routes){
        let entRoutes = [];
        console.log("Json to entity");
        for(let i = 0;i<routes.length;i++){
            try {
                console.log(routes[i]);
               let name = routes[i].name;
                let it =routes[i].itinerary;
                let route = new Route(name,it);
                entRoutes.push(route);
                console.log("Route "+route.name+" was created succesfully");

            }catch (e) {
                console.log("Route "+i+" couldn't be parsed because the format is wrong");
                console.log(e);

            }

        }

        return entRoutes;
    }

}





