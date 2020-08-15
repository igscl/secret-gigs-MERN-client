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
            {/* {posts.map(post =>  (post.id < 2) && <Post key={post.id} title={post.title} />} */}
            {/* applicants.find(x => (x.username === "superuser" && x.accepted === false)) */}
            <p></p>
            <p className= "text-center m-5"> This is your Profile, you can see your applied gigs here. To apply to gigs click on the "GIGS" menu</p>
            {/* accepted events: */}
            {userEvents && userEvents.map((event, index)=> (
            (event.applicants.find(x => (x.username === loggedInUser && x.accepted === true))) && <Gig key={event._id} gig={event} showControls={false}/>)
            )}
            {/* non-accepted events */}
            {userEvents && userEvents.map((event, index)=> (
            (event.applicants.find(x => (x.username === loggedInUser && x.accepted === false))) && <Gig key={event._id} gig={event} showControls={false}/>)
            )}
            

        </div>
    )
}
export default Profile 