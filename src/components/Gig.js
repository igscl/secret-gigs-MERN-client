import React from 'react'
import {Link} from 'react-router-dom'


const Gig = ({history, gig, showControls, deleteGig}) => {

    // If we don't have a post, return null
    if (!gig) return null

    const linkStyles = {
        textDecoration: 'none',
        color: 'black' 
    }

    function handleDelete(event) {
        event.preventDefault()
        deleteGig(gig._id)
        history.push("/gigs")
    }

    function handleEdit(event) {
        event.preventDefault()
        history.push(`/gigs/edit/${gig._id}`)
    }

    const {name, date, generalLocation, capacity} = gig

    return (
        <div>
            <Link style={linkStyles} to={`/gigs/${gig._id}`}>
                <h2>{name}</h2>
            </Link>
			<p>Date: {date.toLocaleString()}</p>
			<p>General Location: {generalLocation}</p>
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
