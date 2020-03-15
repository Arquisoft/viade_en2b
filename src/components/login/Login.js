import React from 'react'
import { LoggedIn, LoggedOut} from '@solid/react';
import { GetUserName, GetUserFriends, GetNumberOfFriends} from '../../data-access/UserData';
import List from '../generic_components/List';

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
                
                <List src={GetUserFriends()}/>
                
            </LoggedIn>
            
        </div>
    )
}

async function popup(auth) {
    let session = await auth.currentSession();
    let popupUri = 'https://solid.community/common/popup.html';
    if (!session)
        session = await auth.popupLogin({ popupUri });
    
    alert(`Logged in as`);
    
}


export default Login
