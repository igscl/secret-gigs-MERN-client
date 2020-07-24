import React from 'react'
import {Link} from 'react-router-dom'
import {useGlobalState} from '../config/globalState'
import {deleteEvent} from '../services/gigServices' 



const Event = ({history, gig, showControls}) => {

    const { store, dispatch} = useGlobalState();
    const {gigs} = store

    // If we don't have a post, return null
    if (!gig) return null

    const linkStyles = {
        textDecoration: 'none',
        color: 'black' 
    }

    const buttonStyles = {
        margin: '.5em',
        fontSize: '1em'
    }

    const {name, date, generalLocation, specificLocation, capacity} = gig
    // const allowEditDelete = loggedInUser && loggedInUser === gig.username

    //handle the delete button 
    function handleDelete(event) {
        event.preventDefault()
        // deleteGig(gig._id)
        deleteEvent(gig._id).then(() => {
        const updatedGig = gigs.filter((gig) => gig._id !== event._id)
        dispatch({
            type: "deleteGig",
            data: updatedGig
        })
        history.push("/gigs")
    }).catch((error) => {
        console.log("error deleting event", error)
        })
    }

    //handle the edit button 
    function handleEdit(event) {
        event.preventDefault()
        history.push(`/gigs/edit/${gig._id}`)
    }


    return (
        <div>
            <Link style={linkStyles} to={`/gigs/${gig._id}`}>
                <h2>{name}</h2>
           
			<p>Date: {date}</p>
			<p>General Location: {generalLocation}</p>
            <p>Specific Location: {specificLocation}</p>
			<p>Capacity: {capacity}</p>
            {showControls &&  (
                <div>
                    <button style={buttonStyles} onClick={handleEdit}>Update</button>
                    <button style ={buttonStyles} onClick={handleDelete}>Delete</button>  
                    <button style ={buttonStyles}>Apply!</button>
                </div>
                )}
                 </Link>
        </div>
    )
}

export default Event
