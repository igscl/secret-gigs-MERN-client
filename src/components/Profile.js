import React from 'react'
import { useGlobalState } from '../config/globalState'
// import {setUserInSessionStorage} from '../services/authServices'



function Profile(){
    const {store} = useGlobalState();
    const {loggedInUser} = store

    return (
        <div>
            {loggedInUser && <header>{loggedInUser}</header>}
        </div>
    )
}
export default Profile 