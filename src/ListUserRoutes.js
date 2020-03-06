const auth = require('solid-auth-client')
const FC   = require('solid-file-client')
const fc   = new FC(  auth)

async function getRoutes(){
   //let session = await auth.currentSession()
    //if (!session) { session = await auth.login() }
    //console.log(`Logged in as ${session.webId}.`)
    if( await fc.itemExists( "https://violetaruizm.inrupt.net/Public/Routes" ) ){
        let content = await fc.readFile( "https://violetaruizm.inrupt.net/Public/Routes")
       console.log("Routes directory exists");
        console.log(content);
    }

}

getRoutes();