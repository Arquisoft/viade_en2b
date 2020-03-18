import React from 'react';

export const Friend = props => {
    const { friend } = props;
    return (
        <li key={friend.webId}><img width="100px" src={friend.image} alt="Friend"/><a href={friend.name}> {friend.name}</a></li>
    );
}