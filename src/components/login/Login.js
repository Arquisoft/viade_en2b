import React from 'react'
import { LoggedIn, LoggedOut} from '@solid/react';
import "../../ListUserRoutes.js"

function Login() {
    const auth = require('solid-auth-client');

    function logout(auth) {
        auth.logout();
    }

    return (
        <div>
            <LoggedOut>
                <button onClick={() => popup(auth)}>Log In</button>
            </LoggedOut>
            <LoggedIn>
                <button onClick={() => logout(auth)}>Log out</button>
            </LoggedIn>
        </div>
    )
}

async function popup(auth) {
    let session = await auth.currentSession();
    let popupUri = 'https://solid.community/common/popup.html';
    if (!session)
        session = await auth.popupLogin({ popupUri });
    alert(`Logged in as ${session.webId}`);

}

export default Login
