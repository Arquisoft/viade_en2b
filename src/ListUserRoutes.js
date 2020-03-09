


const auth = require('solid-auth-client')
const FC   = require('solid-file-client')
const fc   = new FC( auth )
async function loadUserRoutes(){
    let session = await auth.currentSession()
    if (!session) { session = await auth.login() }
    console.log(`Logged in as ${session.webId}.`)
    if( await fc.itemExists( session.webId+"/public/routes") ){
        console.log(session.webId+"/public/routes exists");
        try {
            let content = await fc.readFolder( session.webId+"/public/routes" )
            console.log(content)
        }
        catch(error) {
            console.log("The folder couldn't be read")
            console.log( error )         // A full error response
            console.log( error.status )  // Just the status code of the error
            console.log( error.message ) // Just the status code and statusText
        }


    }else{
        console.log("user has no routes directory")
    }
}

