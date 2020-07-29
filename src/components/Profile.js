import React, {useState, useEffect} from 'react'
import { useGlobalState } from '../config/globalState'
// import {setUserInSessionStorage} from '../services/authServices'
import api from '../config/api'
import Gig from './Gig'

function Profile() {

    
    const {store} = useGlobalState();
    const {loggedInUser} = store

    const [userEvents, setUserEvents]= useState([])

    useEffect(() => {
        api.get("/events/myevents").then((response) => {
            setUserEvents(response.data)
        })
    }, [])
    console.log(userEvents)

    // const {username, email, phoneNumber, eventsApplied} = user

    return (
        <div>
            {loggedInUser && <header>{loggedInUser}</header>}
            {userEvents && userEvents.map((event, index)=> (
            <Gig key={event._id} gig={event} showControls={false}/>)
            )}
            

        </div>
    )
}
export default Profile 