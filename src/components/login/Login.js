import React from 'react'
import { LoggedIn, LoggedOut } from '@solid/react';
import { GetUserName, GetUserFriends, GetNumberOfFriends, GetUserWebId, GetUserFriendsData } from '../../data-access/UserData';
import List from '../generic_components/List';



function Login() {
    const auth = require('solid-auth-client');
    function logout(e, auth) {
        e.preventDefault();
        auth.logout();
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
                <button onClick={(e) => logout(e, auth)}>Log out</button>
                <List src={GetUserFriendsData()}></List>
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


export default Login
