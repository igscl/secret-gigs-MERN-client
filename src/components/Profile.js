import React from 'react'
import { useGlobalState } from '../config/globalState'



function Profile(){
    const {store} = useGlobalState();
    const {loggedInUser} = store;

    return (
        <div>
            {loggedInUser && <header>{loggedInUser}</header>}
        </div>
    )
}
export default Profile 