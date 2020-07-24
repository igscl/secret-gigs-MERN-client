import React from 'react'
import {Link} from 'react-router-dom'
import {useGlobalState} from '../config/globalState'


const Gig = ({history, gig, showControls}) => {

    const {dispatch} = useGlobalState();

    // If we don't have a post, return null
    if (!gig) return null

    const linkStyles = {
        textDecoration: 'none',
        color: 'black' 
    }

    //handle the delete button 
    function handleDelete(event) {
        event.preventDefault()
        // deleteGig(gig._id)
        dispatch({
            type: "deleteGig",
            data: gig._id
        })
        history.push("/gigs")
    }

    //handle the edit button 
    function handleEdit(event) {
        event.preventDefault()
        history.push(`/gigs/edit/${gig._id}`)
    }

    const {name, date, generalLocation, specificLocation, capacity} = gig

    return (
        <div>
            <Link style={linkStyles} to={`/gigs/${gig._id}`}>
                <h2>{name}</h2>
            </Link>
			<p>Date: {date.toLocaleString()}</p>
			<p>General Location: {generalLocation}</p>
            <p>Specific Location: {specificLocation}</p>
			<p>Capacity: {capacity}</p>
            {showControls && (
                <div>
                    <button onClick={handleEdit}>Update</button>
                    <button onClick={handleDelete}>Delete</button>  
                    <button>Apply!</button>
                </div>
                )}
        </div>
    )
}

export default Gig
