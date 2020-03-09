const auth = require('solid-auth-client')
const FC   = require('solid-file-client')
const fc   = new FC( auth )
async function run(){
    let session = await auth.currentSession()
    if (!session) { session = await auth.login() }
    console.log(`Logged in as ${session.webId}.`)
    if( await fc.itemExists( session.webId+"/public/routes") ){

        // ... other file methods
        // ... and/or other auth methods
    }
}
run()