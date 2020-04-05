export default class updateRoute{

    //createFile( fileURL, content, contentType, options )
 update(route){

     let updatedPod = this.updatePod(route);
     if(updatedPod){
         this.updateCache(route);
     }


    }

    async updatePod(route){

       // createFile( fileURL, content, 'application/json', options )
        const auth = require('solid-auth-client')
        const FC = require('solid-file-client')
        const fc = new FC(auth)

        let session = await auth.currentSession();
        let popupUri = 'https://solid.community/common/popup.html';
        if (!session || session.webId === undefined || session.webId === null) session = await auth.popupLogin({popupUri});

        try {
             await fc.createFile(route.url,route.jsonFormat,"application/json");
             return true;


            } catch (error) {
                console.log("The route couldn't be updated")
                console.log(error)         // A full error response
                console.log(error.status)  // Just the status code of the error
                console.log(error.message) // Just the status code and statusText
                return false;
            }


        }






    async updateCache(route){

    }

}