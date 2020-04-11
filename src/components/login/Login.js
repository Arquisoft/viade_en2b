import React from 'react';
import { LoggedIn, LoggedOut} from '@solid/react';
import cache from '../../caches/routeCache/RouteCache'
import * as friendCache from 'caches/friendCache/FriendCache';


function Login() {
    const auth = require('solid-auth-client');
    function logout(e, auth) {
        e.preventDefault();
        auth.logout();
        cache.clear();
        friendCache.default.clear();
    }

    return (
        <div>
            <LoggedOut>
                <div className="wrap-input100">
                    <input id="inputLogin" className="input100" list="providers" type="text" name="provider" placeholder="Provider" />
                    <datalist id="providers">
                        <option value="https://solid.community/" />
                        <option value="https://inrupt.net/" />
                    </datalist>
                    <span className="focus-input100"></span>
                </div>
                <button className="login100-form-btn" onClick={(e) => popup(e, auth)}>Log In</button>
            </LoggedOut>
            <LoggedIn>
                <button className="login100-form-btn" onClick={(e) => logout(e, auth)}>Log out</button>                
            </LoggedIn>

        </div>
    )
}

async function popup(e, auth) {
    e.preventDefault();
    let session = await auth.currentSession();
   let popupUri = 'https://solid.community/common/popup.html';
    if (!session)
        session = await auth.popupLogin({ popupUri });
    alert(`Logged in as ${session.webId}`);
}

export default Login;
